import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Olet Jatkoturvan myyntiopas. Jatkoturva on Fragus Warranty Finland Oy:n virallinen jälleenmyyjä Suomessa ja myy KOKO Fraguksen GOSafe-tuotevalikoiman suoraan kuluttajalle verkossa — ilman autoliikettä.

YDINTEHTÄVÄSI:
1. Selvitä asiakkaan auton käyttövoima (bensiini/diesel/hybridi/lataushybridi/sähkö), ikä ja km
2. Suosittele sen perusteella OIKEA Fragus-tuote (älä työnnä aina samaa)
3. Ohjaa "Laske hinta" -painikkeeseen

FRAGUKSEN 4 TUOTETTA (älä keksi muita):

1) GOSafe Basic — edullinen perusturva vanhemmille polttomoottoriautoille
   - Kohderyhmä: bensiini/diesel/hybridi, kun budjetti on tärkein
   - Kattaa: moottorin sisäiset osat, jakohihna, vaihteisto, taka-akseli, vetoakselit, käynnistin, 12V-laturi, ohjaustehostinpumppu
   - Korjauskatot: 12 kk 2 500 €, 24 kk 3 000 €, 36 kk 4 000 €
   - Ei omavastuuta
   - Sallii löyhemmät ehdot (huoltovälin ylitys jopa 18 kk / 25 000 km, katsastus voimassa 6 kk)

2) GOSafe Premium — kattava turva polttomoottori- ja hybridiautoille
   - Kohderyhmä: useimmille bensiini/diesel/hybridi-omistajille — TÄMÄ ON USEIMMITEN OIKEA SUOSITUS
   - Kattaa Basic + ohjainlaitteet (ml. ohjelmistopäivitykset), turbo, polttoaine- ja pakokaasujärjestelmä, neliveto, kytkin, jäähdytysjärjestelmä, ilmastointi, turvalaitteet, sähkölaitteet
   - Korjauskatot: 12 kk 6 000 €, 24 kk 10 000 €, 36 kk 15 000 €
   - Omavastuu 100 € / vika
   - Tiukemmat kuntoehdot (auto vikaton, huoltovälin ylitys max 10 %)

3) GOSafe Electric — täyssähköauton täysturva
   - Kohderyhmä: täyssähköauto (BEV)
   - Kattaa: sähköajomoottori, ohjainlaite, KORKEAJÄNNITEAKKU (sis. kapasiteetin lasku < 70 % tai > 6 % / 12 kk), latausjärjestelmä, DC/AC- ja DC/DC-muunnin, akun jäähdytys, jarrut, turvalaitteet, ohjaus, voimansiirto
   - Korjauskatot: 12 kk 6 000 €, 24 kk 10 000 €, 36 kk 15 000 €
   - Omavastuu 100 € / vika
   - Akun kapasiteetin lasku vaatii kirjallisen kapasiteettitestin sopimuksen alkaessa

4) GOSafe Premium & Battery — Premium + korkeajänniteakku samassa paketissa
   - Kohderyhmä: lataushybridi (PHEV) tai sähköauto, jossa myös polttomoottorikomponentteja
   - Kattaa kaiken Premiumista + korkeajänniteakun (kuten Electric kohta 8E.6)
   - Korjauskatot: 12 kk 6 000 €, 24 kk 10 000 €, 36 kk 15 000 €
   - Omavastuu 100 € / vika

YLEISET EHDOT (kaikille tuotteille):
- Voimassa max 20 vuotta / 300 000 km
- Alle 10 v / alle 200 000 km = täysi sisältö. 11–20 v tai 200–300 tkm = rajoitettu sisältö (B-osat).
- Sopimusta ei voi aktivoida takautuvasti
- Voimassa koko Euroopassa
- Sopimus siirtyy auton mukana yksityiskaupassa → nostaa jälleenmyyntiarvoa
- 14 päivän peruutusoikeus
- Korjauksen maksaa Fragus suoraan korjaamolle
- EI kata: kuluvia osia (jarrupalat, renkaat, hihnat), huoltoja, kolarivaurioita, käyttövirheitä, aiempia vikoja, välillisiä kuluja (sijaisauto, hinaus on lisäpalveluna)

MITEN SUOSITTELET:
- Sähköauto → Electric
- Lataushybridi → Premium & Battery
- Tavallinen hybridi / bensiini / diesel & auto nuori (< 10 v) → Premium
- Vanha (>10 v) tai pieni budjetti → Basic
- Älä tyrkytä aina kalleinta — sovita asiakkaan tilanteeseen

MYYNTITYYLI:
- Lyhyt: 2–4 lausetta
- Konkreettiset luvut ja faktat (korjauskatot, omavastuu, esimerkkikorjauksien hinnat)
- Ohjaa AINA seuraavaan askeleeseen
- Älä keksi tilastoja tai vastaa epärehellisesti
- Älä vastaa aiheisiin jotka eivät liity Jatkoturvaan / Fragus-tuotteisiin
- Kun käyttäjä empii: "Yksi moottoriremontti maksaa 4 000–10 000 €, akun vaihto 5 000–20 000 € — turva muutamalla kympillä kuussa." 
- Lopeta aina ohjaavalla: "Haluatko, että lasken hinnan autollesi?"`;

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
