// ============================================================================
//  Jatkoturva — Fraguksen virallinen tuotevalikoima Suomessa
// ----------------------------------------------------------------------------
//  Tuotteet vastaavat Fragus Warranty Finland Oy:n virallisia sopimusehtoja
//  (Basic 9/2025, Electric 9/2025, Premium 4/2024, Premium & Battery 10/2025).
//  Korjauskatot ja omavastuut on poimittu suoraan ehdoista.
//
//  ⚠️  HINNAT (monthlyPrice / fullPrice) OVAT TÄLLÄ HETKELLÄ PLACEHOLDEREITA.
//      Vahvista Jatkoturvan lopulliset jälleenmyyntihinnat ennen julkaisua.
//      Muuta vain alla olevat luvut — muu logiikka käyttää näitä arvoja.
// ============================================================================

export interface Product {
  id: string;
  name: string;
  subtitle: string;          // Fragus-tuotenimi
  tagline: string;
  monthlyPrice: number;      // 36 kk sopimuksen kuukausihinta (alkaen)
  fullPrice: number;         // 36 kk sopimuksen kertahinta (alkaen)
  months: number;
  color: string;
  icon: string;
  coverageLevel: 1 | 2 | 3;
  vehicleTypes: string[];
  highlights: string[];
  repairCaps: {              // Fraguksen viralliset korjauskatot, €
    "12": number;
    "24": number;
    "36": number;
  };
  deductible: number;        // omavastuu / vika, €
  recommended: boolean;
}

export const products: Product[] = [
  {
    id: "gosafe-basic",
    name: "Jatkoturva Perusturva",
    subtitle: "Fragus GOSafe Basic",
    tagline: "Edullinen perussuoja vanhemmalle polttomoottoriautolle",
    monthlyPrice: 21,        // 36 kk Ryhmä A, sis. ALV 25,5 %
    fullPrice: 740,          // 294,78 × 2 × 1,255 ≈ 739,90 €, sis. ALV
    months: 36,
    color: "text-cyan-400",
    icon: "Shield",
    coverageLevel: 1,
    vehicleTypes: ["Bensiini", "Diesel", "Hybridi"],
    highlights: [
      "Moottorin sisäiset osat ja jakohihna",
      "Vaihteiston ja taka-akselin sisäosat",
      "Käynnistinmoottori ja laturi",
      "Ei omavastuuta",
    ],
    repairCaps: { "12": 2500, "24": 3000, "36": 4000 },
    deductible: 0,
    recommended: false,
  },
  {
    id: "gosafe-premium",
    name: "Jatkoturva Premium",
    subtitle: "Fragus GOSafe Premium",
    tagline: "Laaja kattavuus polttomoottori- ja hybridiautoille",
    monthlyPrice: 43,        // 36 kk Ryhmä A, sis. ALV 25,5 %
    fullPrice: 1523,         // 606,90 × 2 × 1,255 ≈ 1 523,32 €, sis. ALV
    months: 36,
    color: "text-violet-400",
    icon: "Crown",
    coverageLevel: 3,
    vehicleTypes: ["Bensiini", "Diesel", "Hybridi"],
    highlights: [
      "Moottori, vaihteisto, voimansiirto ja nelivedon osat",
      "Ohjainlaitteet ja ohjelmisto­päivitykset",
      "Turbo, polttoaine- ja pakokaasujärjestelmä",
      "Korjauskatto jopa 15 000 € / sopimuskausi",
    ],
    repairCaps: { "12": 6000, "24": 10000, "36": 15000 },
    deductible: 100,
    recommended: true,
  },
  {
    id: "gosafe-electric",
    name: "Jatkoturva Sähköturva",
    subtitle: "Fragus GOSafe Electric",
    tagline: "Täysturva sähköautolle — sisältää korkeajänniteakun",
    monthlyPrice: 49,        // 36 kk Ryhmä A, sis. ALV 25,5 %
    fullPrice: 1779,         // 708,90 × 2 × 1,255 ≈ 1 779,34 €, sis. ALV
    months: 36,
    color: "text-emerald-400",
    icon: "Zap",
    coverageLevel: 2,
    vehicleTypes: ["Sähkö"],
    highlights: [
      "Sähköajomoottori ja ohjainlaitteet",
      "Korkeajänniteakku ja kapasiteetin lasku",
      "Latausjärjestelmä, DC/DC- ja DC/AC-muuntimet",
      "Akun jäähdytys ja turvalaitteet",
    ],
    repairCaps: { "12": 6000, "24": 10000, "36": 15000 },
    deductible: 100,
    recommended: false,
  },
  {
    id: "gosafe-premium-battery",
    name: "Jatkoturva Akkuturva",
    subtitle: "Fragus GOSafe Premium & Battery",
    tagline: "Kattavin paketti lataushybridille ja yhdistelmäajoneuvoille",
    monthlyPrice: 35,        // TODO: vahvista hinta
    fullPrice: 1260,         // TODO: vahvista hinta
    months: 36,
    color: "text-amber-400",
    icon: "BadgeCheck",
    coverageLevel: 3,
    vehicleTypes: ["Lataushybridi", "Hybridi"],
    highlights: [
      "Kaikki Premium-turvan kattavuus",
      "Korkeajänniteakku ja kapasiteettiturva",
      "Sähkömoottorit ja invertterit",
      "Korjauskatto jopa 15 000 € / sopimuskausi",
    ],
    repairCaps: { "12": 6000, "24": 10000, "36": 15000 },
    deductible: 100,
    recommended: false,
  },
];

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);
