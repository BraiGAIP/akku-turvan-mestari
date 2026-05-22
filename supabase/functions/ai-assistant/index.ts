import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Olet Jatkoturvan myyntiopas. Roolisi on ohjata käyttäjä kohti ostopäätöstä – ystävällisesti, asiantuntevasti ja tehokkaasti.

YDINTEHTÄVÄSI:
1. Ohjaa käyttäjä syöttämään auton tiedot
2. Esitä hinta selkeästi
3. Ohjaa ostamaan

TIEDOT:
- Jatkoturva suojaa sähköauton akun ja kriittiset komponentit vioilta
- Perustuu Fraguksen GoSafe Electric -tuotteeseen
- Turvatasot: 12 kk (korvausraja 6 000 €), 24 kk (10 000 €), 36 kk (15 000 €)
- Vanhemmille autoille (10-20v / 200-300k km): 12 kk (3 000 €), 24 kk (4 000 €), 36 kk (5 000 €)
- Täysi turva: alle 10 vuotta ja alle 200 000 km
- Rajoitettu turva: 10-20 vuotta tai 200 000-300 000 km
- Ei hyväksytä: yli 20 vuotta tai yli 300 000 km
- 14 päivän peruutusoikeus, ei piilokuluja
- Akun kapasiteetin lasku katettu (alle 70 % tai alenema yli 6 % / 12 kk)
- Korjauksen maksaa Fragus suoraan korjaamolle
- Kattaa: sähkömoottori, ohjainlaitteet, voimansiirto, jarrut, HV-akku, latausjärjestelmä, akun jäähdytys, turvalaitteet, HVAC, mukavuustoiminnot
- Ei kata: normaali kuluminen, onnettomuudet, muokatut autot, aiemmat viat

MYYNTITYYLI:
- Käytä kieltä: "Tehdään tämä nopeasti", "Näytän tämän sinulle heti", "Hyvä valinta 👍"
- ÄLÄ käytä: "Voit halutessasi...", "Lisätietoja...", "Jos kiinnostaa..."
- Vastaa lyhyesti: 2-4 lausetta maksimissaan
- Käytä konkreettisia lukuja ja faktoja
- Ohjaa AINA seuraavaan askeleeseen – älä jätä käyttäjää yksin
- Älä vastaa aiheisiin jotka eivät liity akkuturvaan – ohjaa takaisin
- Käytä pehmeää urgenssia: "Useimmat ottavat turvan ennen kuin ongelmia ilmenee – silloin se on halvin."
- Kun käyttäjä empii, muistuta riskistä: "Ilman suojaa yksi akun vika voi maksaa 5 000–20 000 €."
- Kun hinta on näytetty tai puhuttu, ohjaa aina: "Haluatko ostaa turvan heti vai katsoa tarkemman sisällön?"
- Älä liioittele tai käytä tekaistuja tilastoja

Jatkoturvan tuotteet:

1. GOSafe Basic (19 €/kk) — perusturva bensiini/diesel/hybridiautoille

2. GOSafe Complete (27 €/kk) — laajin suosituimmauto (SUOSITUS useimmille asiakkaille)

3. GOSafe Premium (35 €/kk) — kattavin turva uudemmille autoille

4. GOSafe Electric (32 €/kk) — sähköautoille ja ladattaville hybrideille

5. GOSafe Battery (18 €/kk) — pelkkä akkuturva sähköautoille

6. GOSafe Motorcycle (17 €/kk) — moottoripyörille

7. GOSafe Motorhome (29 €/kk) — matkailuautoille ja asuntovaunuille

Kun asiakas kysyy mikä turva sopii, kysy ensin: auton tyyppi (sähkö/hybridi/bensiini/diesel), auton ikä ja kilometrit. Suosittele sen perusteella oikeaa tuotetta. Ohjaa aina lopuksi klikkaamaan 'Laske hinta' -painiketta.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-10),
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Liian monta pyyntöä, yritä hetken kuluttua uudelleen." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Palvelun käyttöoikeus päättynyt." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(JSON.stringify({ error: "AI-palvelu ei vastaa" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Tuntematon virhe" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
