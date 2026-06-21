
# Jatkoturva-uudistus: kaikki tuotteet tasavertaisesti

## Mikä on pielessä nyt

Sivusto on rakennettu kuin Jatkoturva myisi vain **Akkuturvaa** (sähköauton akkuturva). Tämä on harhaanjohtavaa: Jatkoturva on Fraguksen jälleenmyyjä, ja Fraguksen oikea tuotevalikoima on neljä erillistä kunnossapitosopimusta. Lisäksi nykyinen `productData.ts` sisältää **fiktiivisiä tuotteita** joita Fragus ei myy:
- "GOSafe Complete" — ei olemassa
- "GOSafe Motorcycle" — ei olemassa
- "GOSafe Motorhome" — ei olemassa
- "GOSafe Battery" erillisenä tuotteena — ei olemassa (akku kuuluu Premium & Battery -pakettiin)

Hinnat (19/27/35/32/18/17/29 €/kk) on myös keksittyjä.

## Fraguksen todellinen tuotevalikoima (PDF-ehtojen mukaan)

| Tuote | Kohderyhmä | Sopimuskaudet | Korjauskatto (≤10v / ≤200tkm) | Omavastuu |
|---|---|---|---|---|
| **GOSafe Basic** | Vanhemmat / edulliset polttomoottori­autot | 12/24/36 kk | 2 500 / 3 000 / 4 000 € | 0 € |
| **GOSafe Premium** | Polttomoottori- ja hybridiautot (kattava) | 12/24/36 kk | 6 000 / 10 000 / 15 000 € | 100 € / vika |
| **GOSafe Electric** | Täyssähköautot (sis. korkeajänniteakku) | 12/24/36 kk | 6 000 / 10 000 / 15 000 € | 100 € / vika |
| **GOSafe Premium & Battery** | Lataushybridi / sähkö­ajoneuvo, jossa myös polttomoottori­komponentteja | 12/24/36 kk | 6 000 / 10 000 / 15 000 € | 100 € / vika |

Yhteistä kaikille: voimassa max 20 v / 300 000 km, ei takautuvaa aktivointia, sopimus siirtyy ajoneuvon mukana yksityiskaupassa, voimassa koko Euroopassa.

## Mitä rakennetaan

### 1. `src/data/productData.ts` — uudelleenkirjoitus
Korvaa 7 fiktiivistä tuotetta 4 oikealla tuotteella. Jokaiselle:
- Tarkat kattavuuskuvaukset suoraan Fraguksen ehdoista (kohta 8.x)
- Tarkat korjauskatot ja omavastuu ehtojen mukaan
- 12/24/36 kk hinnat **placeholder-arvoina** (käyttäjän vahvistettava todelliset jälleen­myynti­hinnat — merkitään koodiin selvästi)
- Ikä-/km-rajat (alle 10v/200tkm vs. 11–20v/200–300tkm sisältöerot)

### 2. Etusivun rakenne (`src/pages/Index.tsx` + sectionit)
- **HeroSection**: yleinen "Jatkoturva — Suomen helpoin tapa ostaa Fragus-kunnossapitosopimus verkosta". Ei enää akku-keskeinen otsikko.
- **PricingTiersSection**: näytä **kaikki 4 tuotetta** rinnakkain (grid 2×2 tai 4-sarake desktop), ei "suositeltua" oletuksena vaan käyttäjän tarpeen mukaan
- **CompetitiveAdvantageSection / CoverageSection / ComparisonTable**: muuta puhumaan Jatkoturvan koko valikoimasta, ei vain akusta
- **CostComparison / SavingsCalculator**: lisää 4 tuoteskenaariota (esim. polttomoottorin moottorivaurio, vaihteistovaurio, akun kapasiteetti, hybridin invertteri) jotta käyttäjä näkee säästön kaikissa tapauksissa
- **FAQSection**: lisää kysymyksiä eri tuotteista (mikä Basicin ja Premiumin ero, kenelle Electric, mikä on Premium & Battery)

### 3. Hinta­laskuri & checkout-flow
- **PriceCalculatorModal**: kysymyspuu suosittelee oikean tuotteen ajoneuvon käyttövoiman (bensiini/diesel/hybridi/lataushybridi/sähkö), iän ja km-määrän perusteella
- **QualificationFlow**: tarkistaa Fraguksen ehtojen mukaiset kelpoisuus­kriteerit (ikä <20v, km <300 000, huoltohistoria, ei vakuutus­lunastusta) ennen tarjouksen tekoa
- **PricingResult / StripeCheckout**: tukee kaikkia 4 tuotetta + 12/24/36 kk valintaa

### 4. AI-assistentti (`supabase/functions/ai-assistant/index.ts`)
- Päivitä system prompt: Jatkoturva myy 4 Fragus-tuotetta, ei pelkkää akkua
- Anna assistentille koko tuoteluettelo + korjauskatot, jotta se osaa suositella oikeaa tuotetta käyttäjän ajoneuvon mukaan

### 5. SEO (`src/data/seoData.ts`, `index.html`, `public/sitemap.xml`)
- Etusivun title/description: "Jatkoturva — Fragus-kunnossapitosopimukset verkosta" (ei vain "Akkuturva")
- Lisää tuotekohtaiset SEO-sivut: `/perusturva`, `/premium-turva`, `/sahkoturva`, `/premium-akkuturva` (tai pidä yksi sivu jossa kaikki esillä)
- Blogi-artikkelit jätetään ennalleen (ne käsittelevät yleisesti EV-aiheita, eivät vaadi muutosta)

### 6. Brändäys
- Säilytä nimi **Jatkoturva** (kuten domain `jatkoturva.fi`)
- Sana "Akkuturva" sallitaan vain Premium & Battery / Electric -tuotteiden yhteydessä, ei brändi­tasolla
- Visuaalinen ilme ja värit (cyan/kulta) säilyvät

## Tekniset yksityiskohdat

**Tiedostot joita muokataan:**
- `src/data/productData.ts` (uudelleenkirjoitus)
- `src/pages/Index.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/PricingTiersSection.tsx`
- `src/components/sections/CompetitiveAdvantageSection.tsx`
- `src/components/sections/CoverageSection.tsx`
- `src/components/sections/ComparisonTable.tsx`
- `src/components/sections/CostComparison.tsx`
- `src/components/sections/SavingsCalculator.tsx`
- `src/components/sections/FAQSection.tsx`
- `src/components/sections/Navbar.tsx` (jos akku-mainintoja)
- `src/components/PriceCalculatorModal.tsx`
- `src/components/QualificationFlow.tsx`
- `src/components/PricingResult.tsx`
- `src/components/AiAssistant.tsx` (UI-tekstit)
- `supabase/functions/ai-assistant/index.ts` (system prompt + tuotelista)
- `src/data/seoData.ts` (etusivun + tuotesivujen SEO)
- `index.html` (meta-tagit)
- `public/sitemap.xml`

**Mitä EI muuteta:**
- Maksu­integraatio (Stripe), tietokanta­skeema, admin-paneelit
- EV-malli­sivut (`/ev-mallit/*`) — niitä käytetään orgaaniseen SEO:n, ne voivat suositella Electric/Premium & Battery -tuotteita
- Olemassa olevat blogi­artikkelit

## Tarvitsen sinulta ennen aloittamista

**Tuotteiden todelliset jälleen­myynti­hinnat 12/24/36 kk:lle:**
- GOSafe Basic — ?  / ?  / ?  €
- GOSafe Premium — ?  / ?  / ?  €
- GOSafe Electric — ?  / ?  / ?  €
- GOSafe Premium & Battery — ?  / ?  / ?  €

Jos hinnat eivät ole vielä lyöty lukkoon, käytän placeholder-arvoja ja merkitsen `productData.ts`-tiedostoon `// TODO: vahvista hinnat` -kommentin. Hinnat on helppo vaihtaa myöhemmin yhdestä paikasta.

Hyväksytkö tämän suunnan, vai säädetäänkö jotain (esim. eri painotus tuotteiden välillä, tai eri sivu­rakenne kuten 4 erillistä tuotesivua)?
