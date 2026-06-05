export interface Product {
  id: string;
  name: string;
  subtitle: string;
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
    name: "Perusturva",
    subtitle: "GOSafe Basic",
    tagline: "Luotettava perusturva jokapäiväiseen ajoon",
    monthlyPrice: 19,
    fullPrice: 684,
    months: 36,
    color: "text-cyan-400",
    icon: "Shield",
    coverageLevel: 1,
    vehicleTypes: ["Bensiini", "Diesel", "Hybridi"],
    highlights: [
      "Moottori- ja voimansiirtoviat",
      "Turbo- ja kompressoriviat",
      "Sähkö- ja elektroniikkaviat",
      "24/7 tiepalvelu",
    ],
    recommended: false,
  },
  {
    id: "gosafe-complete",
    name: "Täysturva",
    subtitle: "GOSafe Complete",
    tagline: "Kattavin suoja kaikille polttomoottoriautoille",
    monthlyPrice: 27,
    fullPrice: 972,
    months: 36,
    color: "text-amber-400",
    icon: "BadgeCheck",
    coverageLevel: 2,
    vehicleTypes: ["Bensiini", "Diesel", "Hybridi"],
    highlights: [
      "Kaikki Perusturvan edut",
      "Ilma- ja alustajärjestelmät",
      "Polttoaine- ja jäähdytysjärjestelmät",
      "Erikoistyökalut ja testaus",
    ],
    recommended: true,
  },
  {
    id: "gosafe-premium",
    name: "Huippuajajan turva",
    subtitle: "GOSafe Premium",
    tagline: "Premium-tason turva arvokkaille ajoneuvoille",
    monthlyPrice: 35,
    fullPrice: 1260,
    months: 36,
    color: "text-violet-400",
    icon: "Crown",
    coverageLevel: 3,
    vehicleTypes: ["Bensiini", "Diesel", "Hybridi", "Premium"],
    highlights: [
      "Kaikki Täysturvan edut",
      "Korkeammat korvauskatot",
      "Vaihteisto- ja kytkinvauriot",
      "Kattava matkavakuutus",
    ],
    recommended: false,
  },
  {
    id: "gosafe-electric",
    name: "Sähköturva",
    subtitle: "GOSafe Electric",
    tagline: "Älykäs turva sähköajoneuvoille",
    monthlyPrice: 32,
    fullPrice: 1152,
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
    name: "Akkuturva",
    subtitle: "GOSafe Battery",
    tagline: "Erikoisturva sähköauton akulle",
    monthlyPrice: 18,
    fullPrice: 648,
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
    name: "Moottoripyöräturva",
    subtitle: "GOSafe Motorcycle",
    tagline: "Kevyt ja kattava turva moottoripyörälle",
    monthlyPrice: 17,
    fullPrice: 612,
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
    name: "Matkailuautoturva",
    subtitle: "GOSafe Motorhome",
    tagline: "Luotettava kumppani matkailuautoilijalle",
    monthlyPrice: 29,
    fullPrice: 1044,
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
