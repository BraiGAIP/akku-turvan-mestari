import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Olet AkkuTurvan myyntiavustaja. Vastaat suomeksi, lyhyesti ja myyntilähtöisesti.

TIEDOT:
- AkkuTurva suojaa sähköauton akun vioilta ja kapasiteetin laskulta
- Turvatasot: Perus (alk. 490€, 3v), Premium (alk. 790€, 5v), Laajennettu (alk. 1090€, 8v)
- 14 päivän peruutusoikeus, ei riskiä
- Akun vaihto ilman suojaa maksaa 5 000–20 000 €
- Yhteistyössä Fragus (Euroopan johtava)
- Yli 10 000 suojattua autoa
- Maksu kertamaksulla, Klarnalla tai Svea-rahoituksella

TYYLI:
- Vakuuttava mutta ystävällinen
- Korosta säästöjä ja turvallisuutta
- Käsittele epäröinti positiivisesti
- Ohjaa aina kohti ostoa
- Pidä vastaukset 2-4 lauseessa
- Käytä konkreettisia lukuja

ESIMERKKIVASTAUKSIA:
"Kannattaako?" → Korostetusti kyllä, kerro säästöstä
"Mitä kattaa?" → Listaa lyhyesti, suosittele Premiumia
"Miksi tarvitsen?" → Kerro riskeistä ilman suojaa`;

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
          ...messages.slice(-10), // Keep last 10 messages for context
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
