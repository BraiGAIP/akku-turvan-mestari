import { evDatabase } from "./evDatabase";

export const getSlug = (brand: string, model: string) =>
  `${brand}-${model}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");

export const getAllEVSlugs = () =>
  evDatabase.map(ev => ({
    slug: getSlug(ev.brand, ev.model),
    brand: ev.brand,
    model: ev.model,
  }));

export const getEVBySlug = (slug: string) => {
  const entry = getAllEVSlugs().find(e => e.slug === slug);
  if (!entry) return null;
  return evDatabase.find(ev => ev.brand === entry.brand && ev.model === entry.model) || null;
};

export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  date: string;
  readTime: string;
  category: string;
  content: string; // markdown-like plain text
}

export const blogPosts: BlogPost[] = [
  {
    slug: "sahkoauton-akun-vaihto-hinta",
    title: "Paljonko sähköauton akun vaihto maksaa Suomessa 2026?",
    metaDescription: "Sähköauton akun vaihto maksaa 5 000–25 000 €. Lue kattava hintavertailu eri merkeille ja opi suojautumaan kustannuksilta.",
    date: "2026-03-15",
    readTime: "6 min",
    category: "Kustannukset",
    content: `Sähköauton akku on ajoneuvon kallein yksittäinen komponentti, ja sen vaihtaminen voi olla merkittävä taloudellinen riski.

## Akun vaihdon hinnat merkeittäin

| Merkki | Malli | Akun vaihtohinta |
|--------|-------|-----------------|
| Tesla | Model 3 | 10 000–14 000 € |
| Tesla | Model Y | 12 000–16 000 € |
| Volkswagen | ID.4 | 11 000–15 000 € |
| BMW | iX3 | 12 000–16 000 € |
| Hyundai | IONIQ 5 | 10 000–14 000 € |

## Miksi hinnat vaihtelevat?

Akun vaihtohintaan vaikuttavat akun kapasiteetti (kWh), auton ikä, saatavuus ja työkustannukset. Suomessa työkustannukset ovat keskimääräistä korkeammat.

## Miten suojautua?

Jatkoturva tarjoaa akkusuojan, joka kattaa akun viat ja kapasiteetin laskun. Premium-turva maksaa murto-osan akun vaihtohinnasta ja suojaa jopa 5 vuodeksi.

Turvan voi ostaa kertamaksulla tai kuukausierillä. 14 päivän peruutusoikeus takaa riskittömän kokeilun.`,
  },
  {
    slug: "sahkoauton-akun-kesto",
    title: "Kuinka kauan sähköauton akku kestää? Totuus käyttöiästä",
    metaDescription: "Sähköauton akun käyttöikä on 8–15 vuotta, mutta kapasiteetti laskee ajan myötä. Lue mitä se tarkoittaa sinulle.",
    date: "2026-02-28",
    readTime: "5 min",
    category: "Tekniikka",
    content: `Sähköautojen akkujen kestävyys on yksi yleisimmistä huolenaiheista. Totuus on monisyisempi kuin markkinointimateriaalit antavat ymmärtää.

## Akun elinkaari lukuina

Tyypillinen litiumioniakku säilyttää 80 % alkuperäisestä kapasiteetistaan noin 150 000–200 000 ajokilometrin tai 8–10 vuoden jälkeen. Tämän jälkeen kapasiteetin lasku kiihtyy.

## Mikä vaikuttaa akun kestoon?

- **Lämpötila**: Suomen kylmät talvet rasittavat akkua. Pakkasella akun kapasiteetti voi laskea 20–30 %.
- **Lataustavat**: Toistuva pikalataus kuluttaa akkua nopeammin.
- **Käyttötapa**: Aggressiivinen ajotapa ja syvät lataussyklit lyhentävät käyttöikää.

## Suojaudu kapasiteetin laskulta

Jatkoturvan Premium-turva kattaa kapasiteetin laskun alle 80 %:iin. Tämä tarkoittaa, että jos akkusi heikkenee odotettua nopeammin, korjaus- tai vaihtokulut katetaan sinulle.`,
  },
  {
    slug: "sahkoauto-riskit-suomessa",
    title: "Sähköauton riskit Suomessa – mitä jokaisen omistajan pitää tietää",
    metaDescription: "Sähköauton omistaminen Suomessa tuo erityishaasteita: pakkanen, akun kuluminen ja korkeat korjauskustannukset. Näin varaudut.",
    date: "2026-02-10",
    readTime: "7 min",
    category: "Oppaat",
    content: `Suomen olosuhteet asettavat sähköautoille erityisvaatimuksia. Pakkanen, pitkät etäisyydet ja talviolosuhteet vaikuttavat akun suorituskykyyn.

## Suurimmat riskit

### 1. Akun kapasiteetin lasku talvella
Pakkasella akun toimintakapasiteetti voi laskea 20–40 %. Tämä tarkoittaa lyhyempää toimintamatkaa ja useampia latauksia.

### 2. Odottamattomat akun viat
Akkumoduulien viat, BMS-järjestelmän ongelmat ja lämpötilanhallintajärjestelmän häiriöt voivat johtaa kalliisiin korjauksiin.

### 3. Korkeat korjauskustannukset
Suomessa sähköauton korjausten työkustannukset ovat Euroopan korkeimpia. Akun vaihto voi maksaa 5 000–25 000 €.

## Miten suojautua?

Jatkoturva on suunniteltu erityisesti Suomen olosuhteisiin. Turvasuunnitelma kattaa akun viat, kapasiteetin laskun ja jopa lämpötilanhallintajärjestelmän ongelmat.

Premium- ja Laajennettu-turvatasot sisältävät myös hinauspalvelun ja sijaisauton, mikä on erityisen tärkeää pitkien etäisyyksien Suomessa.`,
  },
  {
    slug: "sahkoauton-huolto-opas",
    title: "Sähköauton huolto-opas: Näin pidät akkusi kunnossa",
    metaDescription: "Sähköauton huolto eroaa polttomoottoriautosta. Opi akun hoitovinkit ja vältä kalliit korjaukset.",
    date: "2026-01-20",
    readTime: "5 min",
    category: "Huolto",
    content: `Sähköauton huolto on monin tavoin yksinkertaisempaa kuin polttomoottoriauton, mutta akun hoito vaatii erityishuomiota.

## Akun hoitovinkit

1. **Vältä äärilatauksia**: Pidä akun varaustaso 20–80 % välillä arkikäytössä
2. **Vähennä pikalatausta**: Käytä pikalatausta vain tarvittaessa
3. **Esilämmitys**: Lämmitä auto esilämmittimellä ennen ajoa talvella
4. **Säännölliset tarkastukset**: Huollata akun hallintajärjestelmä säännöllisesti

## Huoltokustannukset

Sähköauton vuosihuolto maksaa tyypillisesti 200–400 €, mikä on selvästi vähemmän kuin polttomoottoriauton. Akun vaihto on kuitenkin merkittävä kustannus.

## Miksi akkuturva kannattaa?

Vaikka hoitaisit akkuasi täydellisesti, valmistusvirheet ja odottamattomat viat ovat mahdollisia. Jatkoturva kattaa nämä riskit, joten voit ajaa huoletta.`,
  },
  {
    slug: "kannattaako-sahkoauto-2026",
    title: "Kannattaako sähköauto vuonna 2026? Laskelmat ja faktat",
    metaDescription: "Sähköauton kokonaiskustannukset, edut ja haitat vuonna 2026. Kattava vertailu polttomoottoriautoon.",
    date: "2026-01-05",
    readTime: "8 min",
    category: "Vertailu",
    content: `Sähköauton kannattavuus riippuu monista tekijöistä. Tässä artikkelissa käymme läpi todelliset kustannukset ja edut.

## Kustannusvertailu

| Kustannus | Sähköauto | Polttomoottori |
|-----------|-----------|----------------|
| Polttoaine/sähkö | 3–5 €/100 km | 8–12 €/100 km |
| Huolto/vuosi | 200–400 € | 600–1 200 € |
| Verotus | Edullisempi | Kalliimpi |
| Akun vaihto | 5 000–20 000 € | - |

## Sähköauton edut

- Alhaisemmat käyttökustannukset
- Vähemmän huoltoa
- Veroetuudet
- Ympäristöystävällisyys

## Suurin riski

Akun vaihto on sähköauton suurin taloudellinen riski. Ilman suojaa se voi tulla yllätyksenä ja maksaa tuhansia euroja.

## Suositus

Sähköauto kannattaa – mutta suojaa akku Jatkoturvalla. Näin eliminoit suurimman taloudellisen riskin ja nautit kaikista eduista huoletta.`,
  },
];

export const getBlogPost = (slug: string) => blogPosts.find(p => p.slug === slug);
