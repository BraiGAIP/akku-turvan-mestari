export interface Product {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  fullPrice: number;
  months: number;
  color: string;
  icon: string;
  coverageLevel: 1 | 2 | 3;
  vehicleTypes: string[];
  highlights: string[];
  recommended: boolean;
}

export const products: Product[] = [
  {
    id: "gosafe-basic",
    name: "GOSafe Basic",
    tagline: "Luotettava perusturva jokapäiväiseen ajoon",
    monthlyPrice: 19,
    fullPrice: Math.round(19 * 36),
    months: 36,
    color: "text-cyan-400",
    icon: "Shield",
    coverageLevel: 1,
    vehicleTypes: ["Bensiini", "Diesel", "Hybridi"],
    highlights: [
      "Moottori- ja voimansiirtoviat",
      "Turbo- ja kompressoriviat",
      "Sähkö- ja elektronikkaviat",
      "24/7 tiepalvelu",
    ],
    recommended: false,
  },
  {
    id: "gosafe-complete",
    name: "GOSafe Complete",
    tagline: "Kattavin suoja kaikille polttomoottoriautoille",
    monthlyPrice: 27,
    fullPrice: Math.round(27 * 36),
    months: 36,
    color: "text-amber-400",
    icon: "BadgeCheck",
    coverageLevel: 2,
    vehicleTypes: ["Bensiini", "Diesel", "Hybridi"],
    highlights: [
      "Kaikki GOSafe Basicin edut",
      "Ilma- ja alustajärjestelmät",
      "Polttoaine- ja jäähdytysjärjestelmät",
      "Erikoistyökalut ja testaus",
    ],
    recommended: true,
  },
  {
    id: "gosafe-premium",
    name: "GOSafe Premium",
    tagline: "Premium-tason turva arvokkaammille ajoneuvoille",
    monthlyPrice: 35,
    fullPrice: Math.round(35 * 36),
    months: 36,
    color: "text-violet-400",
    icon: "Crown",
    coverageLevel: 3,
    vehicleTypes: ["Bensiini", "Diesel", "Hybridi", "Premium"],
    highlights: [
      "Kaikki GOSafe Completen edut",
      "Korkeammat korvauskatot",
      "Vaihteisto- ja kytkinvauriot",
      "Kattava matkavakuutus",
    ],
    recommended: false,
  },
  {
    id: "gosafe-electric",
    name: "GOSafe Electric",
    tagline: "Älykäs turva sähköajoneuvoille",
    monthlyPrice: 32,
    fullPrice: Math.round(32 * 36),
    months: 36,
    color: "text-emerald-400",
    icon: "Zap",
    coverageLevel: 2,
    vehicleTypes: ["Sähkö", "Ladattava hybridi"],
    highlights: [
      "Sähkömoottori- ja invertteriviat",
      "Akun kapasiteettitakuu",
      "Latausjärjestelmän viat",
      "Hybridin sähkökomponentit",
    ],
    recommended: false,
  },
  {
    id: "gosafe-battery",
    name: "GOSafe Battery",
    tagline: "Erikoisturva sähköauton akulle",
    monthlyPrice: 18,
    fullPrice: Math.round(18 * 36),
    months: 36,
    color: "text-sky-400",
    icon: "Battery",
    coverageLevel: 1,
    vehicleTypes: ["Sähkö", "Ladattava hybridi"],
    highlights: [
      "Akun kapasiteettivaje",
      "Akun soluvauriot",
      "Latausvikojen aiheuttamat vauriot",
      "Korvaus jopa 10 000 € asti",
    ],
    recommended: false,
  },
  {
    id: "gosafe-motorcycle",
    name: "GOSafe Motorcycle",
    tagline: "Kevyt ja kattava turva moottoripyörälle",
    monthlyPrice: 17,
    fullPrice: Math.round(17 * 36),
    months: 36,
    color: "text-orange-400",
    icon: "Wrench",
    coverageLevel: 1,
    vehicleTypes: ["Moottoripyörä"],
    highlights: [
      "Moottori- ja vaihteistoviat",
      "Sähkö- ja sytytysjärjestelmät",
      "Jarru- ja alustavirheet",
      "24/7 tiepalvelu koko Euroopassa",
    ],
    recommended: false,
  },
  {
    id: "gosafe-motorhome",
    name: "GOSafe Motorhome",
    tagline: "Luotettava kumppani matkailuautoilijalle",
    monthlyPrice: 29,
    fullPrice: Math.round(29 * 36),
    months: 36,
    color: "text-rose-400",
    icon: "Car",
    coverageLevel: 2,
    vehicleTypes: ["Matkailuauto", "Asuntovaunu"],
    highlights: [
      "Moottori- ja asunto-osan viat",
      "Sähkö-, vesi- ja kaasujärjestelmät",
      "Jääkaappi, lämmitin ja ilmastointi",
      "Matkavakuutus koko Euroopassa",
    ],
    recommended: false,
  },
];

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);
