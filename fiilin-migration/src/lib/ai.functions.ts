import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-haiku-4-5-20251001";

type Plan = "free" | "plus" | "premium";

// Monthly usage caps
const PROFILE_CAPS: Record<Plan, number> = { free: 1, plus: 10, premium: 30 };
const OPENER_CAPS: Record<Plan, number> = { free: 0, plus: 0, premium: 50 };

async function resolvePlan(supabase: any, userId: string): Promise<Plan> {
  // Import lazily to avoid client-only helpers on server.
  const { data } = await supabase
    .from("subscriptions")
    .select("status, price_id, current_period_end, environment")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(5);
  if (!data || data.length === 0) return "free";
  const now = new Date();
  for (const sub of data) {
    const periodEnd = sub.current_period_end ? new Date(sub.current_period_end) : null;
    const active =
      (["active", "trialing", "past_due"].includes(sub.status) && (!periodEnd || periodEnd > now)) ||
      (sub.status === "canceled" && periodEnd && periodEnd > now);
    if (!active) continue;
    if (sub.price_id === "fiilin_premium_monthly") return "premium";
    if (sub.price_id === "fiilin_plus_monthly") return "plus";
  }
  return "free";
}

// Per-feature cooldown (sekuntteina) ja lyhyt tuntikohtainen burst-katto.
// Jaettu ai_usage-taulun kanssa: ei erillistä infraa.
const COOLDOWN_SEC: Record<"profile_helper" | "opener_helper", number> = {
  profile_helper: 20,
  opener_helper: 30,
};
const HOURLY_BURST: Record<"profile_helper" | "opener_helper", number> = {
  profile_helper: 8,
  opener_helper: 15,
};

async function checkCooldown(
  supabase: any,
  userId: string,
  feature: "profile_helper" | "opener_helper",
) {
  const cooldown = COOLDOWN_SEC[feature];
  const { data: last } = await supabase
    .from("ai_usage")
    .select("created_at")
    .eq("user_id", userId)
    .eq("feature", feature)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (last?.created_at) {
    const elapsed = (Date.now() - new Date(last.created_at).getTime()) / 1000;
    if (elapsed < cooldown) {
      const wait = Math.ceil(cooldown - elapsed);
      throw new Response(
        `Odota vielä ${wait} s ennen uutta pyyntöä.`,
        { status: 429, headers: { "Retry-After": String(wait) } },
      );
    }
  }
  const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count: hourCount } = await supabase
    .from("ai_usage")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("feature", feature)
    .gte("created_at", hourAgo);
  if ((hourCount ?? 0) >= HOURLY_BURST[feature]) {
    throw new Response(
      "Liian monta AI-pyyntöä lyhyessä ajassa. Yritä uudelleen tunnin päästä.",
      { status: 429, headers: { "Retry-After": "3600" } },
    );
  }
}

async function checkAndReserveUsage(
  supabase: any,
  userId: string,
  feature: "profile_helper" | "opener_helper",
  plan: Plan,
): Promise<{ used: number; limit: number }> {
  const limit = feature === "profile_helper" ? PROFILE_CAPS[plan] : OPENER_CAPS[plan];
  if (limit === 0) {
    throw new Response("Tämä AI-toiminto vaatii Premium-tilauksen.", { status: 403 });
  }
  await checkCooldown(supabase, userId, feature);
  const monthStart = new Date();
  monthStart.setUTCDate(1);
  monthStart.setUTCHours(0, 0, 0, 0);
  const { count } = await supabase
    .from("ai_usage")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("feature", feature)
    .gte("created_at", monthStart.toISOString());
  const used = count ?? 0;
  if (used >= limit) {
    throw new Response(
      `Kuukausiraja täynnä (${used}/${limit}). Päivitä ${plan === "free" ? "Plus- tai Premium-tilaukseen" : "Premium-tilaukseen"}.`,
      { status: 429 },
    );
  }
  return { used, limit };
}


async function logUsage(
  supabase: any,
  userId: string,
  feature: "profile_helper" | "opener_helper",
  metadata?: Record<string, unknown>,
) {
  await supabase.from("ai_usage").insert({ user_id: userId, feature, metadata: metadata ?? null });
}

async function callAI(apiKey: string, systemPrompt: string, userPrompt: string) {
  const res = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    }),
  });
  if (res.status === 429) throw new Response("AI on hetkellisesti ruuhkautunut. Yritä hetken päästä uudelleen.", { status: 429 });
  if (res.status === 402) throw new Response("AI-krediitit lopussa. Ota yhteyttä ylläpitoon.", { status: 402 });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Response(`AI-virhe: ${res.status} ${txt.slice(0, 200)}`, { status: 500 });
  }
  const json = await res.json();
  const content: string | undefined = json?.content?.[0]?.text;
  if (!content) throw new Response("AI ei palauttanut vastausta.", { status: 500 });
  return content;
}

const PROFILE_SYSTEM = `Olet suomalaisen deittisovellus FIILINin ystävällinen kirjoitusavustaja.
Tehtäväsi on parantaa käyttäjän oma profiiliteksti (bio) niin, että se kuulostaa selkeämmältä, lämpimämmältä ja aidommalta – mutta säilyttää käyttäjän oman äänen.

Ehdottomat säännöt:
- ÄLÄ keksi käyttäjästä asioita (harrastuksia, työtä, arvoja, elämäntilannetta) joita ei ole alkuperäisessä tekstissä.
- ÄLÄ tee liian myyvää, geneeristä tai epäaitoa deittiprofiilityyliä.
- ÄLÄ käytä klisheitä tyyliin "elämä on seikkailu" tai "etsin sielunkumppania".
- ÄLÄ lisää emojeita ellei alkuperäisessä ollut.
- Pidä pituus 60–350 merkin välillä.
- Kirjoita suomeksi, samalla sinuttelu-/teitittely- ja rekisteritasolla kuin alkuperäinen.
- Vastaa VAIN parannetulla tekstillä. Ei otsikkoa, ei selityksiä, ei lainausmerkkejä.`;

const STYLE_HINTS: Record<string, string> = {
  warm: "Tyyli: lämmin ja aito. Rauhallinen, kutsuva sävy.",
  playful: "Tyyli: rento ja kevyen humoristinen, mutta ei vitsailu-vetoinen.",
  serious: "Tyyli: selkeä ja hieman vakavampi, suhdehakuiselle sopiva.",
};

export const improveProfileBio = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        bio: z.string().trim().min(10, "Kirjoita ainakin 10 merkkiä ensin").max(1000),
        style: z.enum(["warm", "playful", "serious"]).optional(),
      })
      .parse(data),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Response("AI ei ole käytössä (ANTHROPIC_API_KEY puuttuu).", { status: 500 });

    const plan = await resolvePlan(supabase, userId);
    const usage = await checkAndReserveUsage(supabase, userId, "profile_helper", plan);

    // Free tier: return a single short "tip" instead of full rewrite
    if (plan === "free") {
      const tipPrompt = `Käyttäjän nykyinen bio:\n"""${data.bio}"""\n\nAnna YKSI konkreettinen, ystävällinen vinkki (max 200 merkkiä) miten hän voisi parantaa bioaan. Ei uudelleenkirjoitusta, vain vinkki suomeksi.`;
      const tip = await callAI(apiKey, PROFILE_SYSTEM, tipPrompt);
      await logUsage(supabase, userId, "profile_helper", { mode: "tip" });
      return { mode: "tip" as const, tip: tip.trim(), plan, usage: { used: usage.used + 1, limit: usage.limit } };
    }

    // Plus: single improved version. Premium: three styles.
    if (plan === "plus" || !data.style) {
      const prompt = `Käyttäjän nykyinen bio:\n"""${data.bio}"""\n\nParanna teksti sääntöjen mukaan.`;
      const improved = await callAI(apiKey, PROFILE_SYSTEM, prompt);
      await logUsage(supabase, userId, "profile_helper", { mode: "single" });
      return {
        mode: "single" as const,
        improved: improved.trim(),
        plan,
        usage: { used: usage.used + 1, limit: usage.limit },
      };
    }

    // Premium with a chosen style → generate all three styles in one call
    const prompt = `Käyttäjän nykyinen bio:\n"""${data.bio}"""\n\nKirjoita KOLME eri versiota parannetusta biosta, yksi kutakin tyyliä.
Palauta täsmälleen tässä muodossa (ei muuta):
[LAMPIN]
<lämmin ja aito versio>
[RENTO]
<rento ja humoristinen versio>
[SELKEA]
<selkeä ja vakavampi versio>`;
    const raw = await callAI(apiKey, PROFILE_SYSTEM, prompt);
    const pick = (tag: string) => {
      const re = new RegExp(`\\[${tag}\\]\\s*([\\s\\S]*?)(?=\\n\\[|$)`, "i");
      return raw.match(re)?.[1]?.trim() ?? "";
    };
    const variants = {
      warm: pick("LAMPIN"),
      playful: pick("RENTO"),
      serious: pick("SELKEA"),
    };
    await logUsage(supabase, userId, "profile_helper", { mode: "styles" });
    return { mode: "styles" as const, variants, plan, usage: { used: usage.used + 1, limit: usage.limit } };
  });

const OPENER_SYSTEM = `Olet suomalaisen deittisovellus FIILINin keskustelunavaus-avustaja.
Ehdota 3 lyhyttä, persoonallista ja kohteliasta viestin avausta joita käyttäjä voi lähettää matchille.

Ehdottomat säännöt:
- Käytä vain annettuja profiilitietoja. ÄLÄ keksi asioita joita ei mainittu.
- Enintään 2 lausetta / avaus.
- EI seksuaalisia, manipuloivia tai painostavia avauksia.
- EI geneerisiä avauksia kuten "Moi, mitä kuuluu?" tai "Hei kaunotar".
- Suomeksi, kohteliaasti sinutellen.
- Vastaa VAIN kolmella avauksella numeroidussa listassa:
1) <avaus>
2) <avaus>
3) <avaus>`;

export const suggestOpeners = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        partnerId: z.string().uuid(),
      })
      .parse(data),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Response("AI ei ole käytössä.", { status: 500 });

    const plan = await resolvePlan(supabase, userId);
    if (plan !== "premium") {
      throw new Response("AI-keskustelunavaajat ovat Premium-ominaisuus.", { status: 403 });
    }
    const usage = await checkAndReserveUsage(supabase, userId, "opener_helper", plan);

    // Fetch minimal partner info (respecting RLS via user-scoped supabase client)
    const [{ data: profile }, { data: interests }, { data: prompts }] = await Promise.all([
      supabase.from("profiles").select("display_name, bio, city").eq("id", data.partnerId).maybeSingle(),
      supabase.from("user_interests").select("interest_name").eq("profile_id", data.partnerId).limit(10),
      supabase.from("prompt_answers").select("question_text, answer_text").eq("profile_id", data.partnerId).limit(3),
    ]);
    if (!profile) throw new Response("Profiilia ei löytynyt.", { status: 404 });

    const parts: string[] = [];
    if (profile.display_name) parts.push(`Nimi: ${profile.display_name}`);
    if (profile.city) parts.push(`Kaupunki: ${profile.city}`);
    if (profile.bio) parts.push(`Bio: ${profile.bio}`);
    if (interests && interests.length > 0) parts.push(`Kiinnostukset: ${interests.map((i: any) => i.interest_name).join(", ")}`);
    if (prompts && prompts.length > 0) {
      for (const p of prompts as any[]) {
        if (p.question_text && p.answer_text) parts.push(`${p.question_text}: ${p.answer_text}`);
      }
    }
    if (parts.length === 0) {
      throw new Response("Profiilissa ei ole tarpeeksi tietoa avauksen luomiseen.", { status: 400 });
    }

    const userPrompt = `Matchin profiilitiedot:\n${parts.join("\n")}\n\nEhdota 3 avausviestiä.`;
    const raw = await callAI(apiKey, OPENER_SYSTEM, userPrompt);
    const openers = raw
      .split("\n")
      .map((l) => l.replace(/^\s*\d+\)?[.)]?\s*/, "").trim())
      .filter((l) => l.length > 0 && l.length < 400)
      .slice(0, 3);
    await logUsage(supabase, userId, "opener_helper", { partner_id: data.partnerId });
    return { openers, usage: { used: usage.used + 1, limit: usage.limit }, plan };
  });

export const getAiUsage = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const plan = await resolvePlan(supabase, userId);
    const monthStart = new Date();
    monthStart.setUTCDate(1);
    monthStart.setUTCHours(0, 0, 0, 0);
    const [{ count: profileUsed }, { count: openerUsed }] = await Promise.all([
      supabase
        .from("ai_usage")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("feature", "profile_helper")
        .gte("created_at", monthStart.toISOString()),
      supabase
        .from("ai_usage")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("feature", "opener_helper")
        .gte("created_at", monthStart.toISOString()),
    ]);
    return {
      plan,
      profile: { used: profileUsed ?? 0, limit: PROFILE_CAPS[plan] },
      opener: { used: openerUsed ?? 0, limit: OPENER_CAPS[plan] },
    };
  });
