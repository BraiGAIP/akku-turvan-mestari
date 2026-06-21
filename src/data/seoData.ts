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
  excerpt?: string;
  metaTitle?: string;
  date: string;
  readTime: string;
  category: string;
  content: string; // markdown-like plain text
}

export const blogPosts: BlogPost[] = [
  {
    slug: "auton-lisaturva-ilman-autoliiketta",
    title: "Auton lisäturva ilman autoliikettä — näin se onnistuu verkossa",
    excerpt: "Tiesitkö, että voit hankkia auton lisäturvan verkosta ilman autoliikettä? Jatkoturva myy kunnossapitosopimuksen kenelle tahansa — myös jo omistamaasi autoon.",
    category: "Lisäturva",
    date: "2026-05-20",
    readTime: "5 min",
    metaTitle: "Auton lisäturva ilman autoliikettä | Jatkoturva",
    metaDescription: "Tiesitkö, että voit hankkia auton lisäturvan verkosta ilman autoliikettä? Jatkoturva myy Jatkoturvan kunnossapitosopimuksen kenelle tahansa — myös jo omistamaasi autoon.",
    content: `
## Auton lisäturva ilman autoliikettä — näin se onnistuu verkossa

Suomessa auton lisäturva on perinteisesti ostettu autoliikkeestä auton oston yhteydessä. Myyjä esittelee paperipinon, tarjoaa turvapakettia ja lisäturva päätyy kauppakirjan liitteeksi — tai jää kokonaan ottamatta, koska päätöstä pitää tehdä kiireessä.

Mutta mitä jos haluaisit lisäturvan autoon, jonka ostat yksityiseltä? Tai autoon joka sinulla on jo? Tai tuontiautoon jota olet hankkimassa ulkomailta?

**Jatkoturvalta se onnistuu. Autoliikettä ei tarvita.**

## Miksi lisäturva on perinteisesti sidottu autoliikkeeseen?

Suomessa lähes kaikki lisäturvat myydään autoliikkeiden kautta. Syy on yksinkertainen: lisäturva on autoliikkeille erittäin kannattava lisämyynti. Marginaalit ovat korkeat ja myyntihetki on otollinen — asiakas on jo päättänyt ostaa auton eikä jaksa enää neuvotella.

Tämä tarkoittaa käytännössä sitä, että tavallinen suomalainen autoilija on jäänyt ilman vaihtoehtoja:

- Ostat auton yksityiseltä → ei lisäturvaa tarjolla

- Sinulla on jo auto ja tehdastakuu päättyi → lisäturvaa ei voi enää hankkia

- Tuot auton ulkomailta → suomalaiset autoliikkeet eivät myy turvaa siihen

- Olet jo ostanut auton mutta katunut ettei tullut hankittua lisäturvaa → myöhäistä

Tai niin on tähän asti ollut.

## Jatkoturva myy lisäturvan suoraan sinulle — ilman autoliikettä

Jatkoturva on Suomessa toimiva auton kunnossapitosopimusten tarjoaja.

Jatkoturvan kautta voit hankkia Jatkoturvan kunnossapitosopimuksen suoraan verkosta:

- **Autoon joka sinulla on jo alla** — ei tarvitse ostaa uutta autoa

- **Yksityiseltä ostettuun autoon** — kauppa ei tarvitse mennä autoliikkeen kautta

- **Tuontiautoon** — myös ulkomailta tuotaviin ajoneuvoihin

- **Autoon jonka tehdastakuu on jo päättynyt** — voit hankkia turvan myöhemminkin

Prosessi on yksinkertainen: syötä rekisterinumero, valitse sopimus, maksa — turva alkaa välittömästi. Koko prosessi vie alle 2 minuuttia.

## Kenelle Jatkoturva sopii erityisen hyvin?

**Yksityiseltä auton ostajat**

Yksityinen myyjä ei vastaa auton vioista samalla tavalla kuin autoliike. Lisäturva on yksityiskaupassa erityisen arvokas — se antaa ostajalle saman mielenrauhan kuin autoliikkeen takuu, ilman että kaupan tarvitsee mennä liikkeen kautta.

**Tuontiauton hankkijat**

Ulkomailta tuodut autot ovat usein edullisempia kuin vastaavat Suomessa myydyt. Mutta suomalaiset autoliikkeet eivät myy lisäturvaa niihin. Jatkoturvalta turvan saa — rekisterinumero riittää.

**Autoilijat joiden tehdastakuu on juuri päättynyt**

Tehdastakuun päättyminen on juuri se hetki kun auto alkaa olla omavastuuvaiheen ikäinen. Juuri silloin lisäturva on järkevin hankkia — ennen kuin ensimmäinen iso lasku tulee.

**Jo pitkään autoa omistaneet**

Ehkä et ajatellut lisäturvaa kun ostit auton. Nyt kun auto alkaa ikääntyä ja kilometrit kertyvät, turva alkaa kiinnostaa. Jatkoturvalta sen saa — autoliikkeeseen ei tarvitse mennä.

## Vertailu: autoliike vs. Jatkoturva

| Ominaisuus | Autoliike | Jatkoturva |

|---|---|---|

| Milloin voi ostaa | Auton oston yhteydessä | Milloin tahansa |

| Kenelle myydään | Liikkeen asiakkaille | Kenelle tahansa |

| Tuontiautot | Ei | Kyllä |

| Yksityiskauppa-autot | Ei | Kyllä |

| Verkossa ilman käyntiä | Harvoin | Aina |

| Omavastuuta | Usein | Ei |

| Sopimus siirrettävissä | Vaihtelee | Kyllä |

## Näin hankit lisäturvan verkossa

1. Mene osoitteeseen jatkoturva.fi

2. Syötä autosi rekisterinumero

3. Valitse sopiva turvataso

4. Maksa — turva alkaa heti

Et sitoudu ennen maksua. Voit myös maksaa kuukausittain alkaen 19 €/kk.

  `,
  },
  {
    slug: "lisaturva-tuontiautoon",
    title: "Tuontiauto Suomeen — muista lisäturva jonka muut eivät myy",
    excerpt: "Tuontiautoon on vaikea saada lisäturvaa Suomessa — autoliikkeet eivät myy sitä omille asiakkailleen. Jatkoturva myy Jatkoturvan sopimuksen myös tuontiauton omistajalle verkossa.",
    category: "Tuontiautot",
    date: "2026-05-10",
    readTime: "6 min",
    metaTitle: "Lisäturva tuontiautoon — näin se onnistuu | Jatkoturva",
    metaDescription: "Tuontiautoon on vaikea saada lisäturvaa Suomessa — autoliikkeet eivät myy sitä. Jatkoturva myy Jatkoturvan kunnossapitosopimuksen myös tuontiauton omistajalle verkossa.",
    content: `
## Tuontiauto Suomeen — muista lisäturva jonka muut eivät myy

Tuontiauto on yhä useamman suomalaisen valinta. Saksasta, Ruotsista tai Virosta tuotu auto voi olla tuhansia euroja halvempi kuin vastaava Suomessa myyty — samalla varusteella, samalla kunnolla, ilman suomalaisen autoliikkeen katetta.

Mutta tuontiautossa on yksi hankala puoli: **lisäturvaa on lähes mahdoton saada.**

Suomalaiset autoliikkeet myyvät lisäturvaa vain omiin autoihinsa. Jos auto ei ole kulkenut heidän myyntinsä kautta, he eivät myy turvaa siihen. Jatkoturva tekee tämän toisin.

## Miksi tuontiautoon on vaikea saada lisäturvaa?

Suomessa lisäturvamarkkina on rakentunut autoliikkeiden ympärille. Lisäturva on autoliikkeelle kannattava lisämyynti — ja siksi he myyvät sitä vain omille asiakkailleen, omiin autoihinsa.

Tuontiauton omistaja jää tämän systeemin ulkopuolelle. Vaikka auto olisi teknisesti täysin sama malli kuin suomalaisessa liikkeessä myyty, lisäturvaa ei myönnetä koska:

- Auto ei ole kulkenut kyseisen liikkeen myynnin kautta

- Liikkeellä ei ole auton huoltohistoriaa omassa järjestelmässään

- Lisäturva on sidottu kaupantekotapahtumaan, ei ajoneuvoon

Tuloksena: tuontiauton omistaja ajaa ilman turvaa, vaikka haluaisi maksaa siitä.

## Jatkoturva: lisäturva myös tuontiautoon

Jatkoturva on Suomessa toimiva auton kunnossapitosopimusten tarjoaja — emme ole sidottuja yksittäisen autoliikkeen myyntiketjuun.

Jatkoturvalta voit hankkia lisäturvan tuontiautoon näin:

1. Mene jatkoturva.fi

2. Syötä autosi suomalainen rekisterinumero

3. Näet heti sopimukset ja hinnat autosi tietoihin perustuen

4. Valitse ja maksa — turva alkaa välittömästi

Autoliikettä ei tarvita. Myyjää ei tarvita. Riittää että auto on sinun.

## Milloin tuontiauton omistajan kannattaa hankkia lisäturva?

**Heti rekisteröinnin jälkeen**

Paras hetki on heti kun auto on rekisteröity Suomeen. Tehdastakuu saattaa olla vielä voimassa tai juuri päättynyt — tässä kohdassa turvan hinta on alhaisimmillaan ja kattavuus laajimmillaan.

**Kun tehdastakuu päättyy**

Jos tuontiauto on jo muutaman vuoden ikäinen, tehdastakuu on todennäköisesti jo ohi. Juuri silloin kunnossapitosopimus on järkevintä hankkia — ennen kuin ensimmäinen kallis vikaantuminen tapahtuu.

## Mihin autoihin sopimus sopii?

Jatkoturvan sopimukset sopivat laajasti eri ajoneuvoihin:

- **Bensiini- ja dieselautot** — Perusturva, Täysturva tai Huippuajajan turva

- **Hybridit** — Täysturva tai Huippuajajan turva

- **Sähköautot** — Sähköturva tai Akkuturva

- **Moottoripyörät** — Moottoripyöräturva

- **Matkailuautot** — Matkailuautoturva

Ikäraja: enintään 20 vuotta vanha auto. Kilometriraja: enintään 300 000 km.

## Tuontiauton ostajan tarkistuslista

- ✅ Rekisteröi auto Suomeen — tarvitaan ennen sopimuksen tekemistä

- ✅ Tarkista onko tehdastakuu vielä voimassa — sopimus voidaan aktivoida sen jatkoksi

- ✅ Ota huoltohistoria talteen — helpottaa mahdollisia korvauskäsittelyjä

- ✅ Hanki lisäturva verkosta — jatkoturva.fi, rekisterinumero riittää

- ✅ Valitse sopiva turvataso — sähköautoille oma sopimus, polttomoottorit omansa

## Usein kysyttyä tuontiauton lisäturvasta

**Tarvitseenko minulla olla huoltokirja?**

Ei välttämättä. Rekisterinumero riittää sopimuksen tekemiseen. Huoltohistoria on hyvä olla tallessa mahdollisia korvaustilanteita varten.

**Onko sopimus voimassa myös ulkomailla?**

Kyllä. Jatkoturvan sopimus on voimassa koko Euroopassa.

**Voinko siirtää sopimuksen jos myyn auton?**

Kyllä. Sopimus seuraa ajoneuvoa ja voidaan siirtää uudelle omistajalle yksityiskaupassa. Tämä nostaa myös auton jälleenmyyntiarvoa.

## Hanki lisäturva tuontiautollesi nyt

Et tarvitse autoliikettä. Et tarvitse myyjää. Tarvitset vain rekisterinumeron ja 2 minuuttia.

Alkaen 19 €/kk — ei omavastuuta — turva alkaa heti.

  `,
  },
  {
    slug: "sahkoauton-akun-vaihto-hinta",
    title: "Paljonko sähköauton akun vaihto maksaa Suomessa 2026?",
    metaTitle: "Sähköauton akun vaihto hinta 2026 | Jatkoturva",
    excerpt: "Sähköauton akun vaihto maksaa 5 000–25 000 €. Lue kattava hintavertailu eri merkeille ja opi suojautumaan kustannuksilta.",
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
    metaTitle: "Kuinka kauan sähköauton akku kestää? | Jatkoturva",
    excerpt: "Sähköauton akun käyttöikä on 8–15 vuotta, mutta kapasiteetti laskee ajan myötä. Lue mitä se tarkoittaa sinulle ja miten suojaudut.",
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
    metaTitle: "Sähköauton riskit Suomessa 2026 | Jatkoturva",
    excerpt: "Suomen olosuhteet tuovat sähköautolle erityishaasteita — pakkanen, pitkät etäisyydet ja korkeat korjauskustannukset. Näin varaudut.",
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
    metaTitle: "Sähköauton huolto-opas — akun hoitovinkit | Jatkoturva",
    excerpt: "Sähköauton akun hoito ratkaisee kuinka kauan se kestää. Lue parhaat vinkit ja vältä kalliit korjaukset.",
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
    metaTitle: "Kannattaako sähköauto 2026? Laskelmat ja faktat | Jatkoturva",
    excerpt: "Sähköauton kokonaiskustannukset, edut ja haitat vuonna 2026. Rehellinen vertailu — mukaan lukien akun vaihdon riski.",
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
