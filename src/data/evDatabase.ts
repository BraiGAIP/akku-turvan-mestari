export interface EVModel {
  brand: string;
  model: string;
  years: number[];
  batteryCapacity: number; // kWh
  avgReplacementCost: number; // EUR
}

export const evDatabase: EVModel[] = [
  { brand: "Tesla", model: "Model 3", years: [2019,2020,2021,2022,2023,2024,2025], batteryCapacity: 60, avgReplacementCost: 12000 },
  { brand: "Tesla", model: "Model Y", years: [2021,2022,2023,2024,2025], batteryCapacity: 75, avgReplacementCost: 14000 },
  { brand: "Tesla", model: "Model S", years: [2016,2017,2018,2019,2020,2021,2022,2023,2024], batteryCapacity: 100, avgReplacementCost: 18000 },
  { brand: "Tesla", model: "Model X", years: [2016,2017,2018,2019,2020,2021,2022,2023,2024], batteryCapacity: 100, avgReplacementCost: 20000 },
  { brand: "Volkswagen", model: "ID.3", years: [2020,2021,2022,2023,2024,2025], batteryCapacity: 58, avgReplacementCost: 10000 },
  { brand: "Volkswagen", model: "ID.4", years: [2021,2022,2023,2024,2025], batteryCapacity: 77, avgReplacementCost: 13000 },
  { brand: "Volkswagen", model: "ID.5", years: [2022,2023,2024,2025], batteryCapacity: 77, avgReplacementCost: 13000 },
  { brand: "Volkswagen", model: "ID.7", years: [2023,2024,2025], batteryCapacity: 86, avgReplacementCost: 15000 },
  { brand: "BMW", model: "iX1", years: [2023,2024,2025], batteryCapacity: 65, avgReplacementCost: 12000 },
  { brand: "BMW", model: "iX3", years: [2021,2022,2023,2024], batteryCapacity: 74, avgReplacementCost: 14000 },
  { brand: "BMW", model: "iX", years: [2022,2023,2024,2025], batteryCapacity: 105, avgReplacementCost: 20000 },
  { brand: "BMW", model: "i4", years: [2022,2023,2024,2025], batteryCapacity: 84, avgReplacementCost: 15000 },
  { brand: "BMW", model: "i5", years: [2024,2025], batteryCapacity: 84, avgReplacementCost: 16000 },
  { brand: "Hyundai", model: "Kona Electric", years: [2019,2020,2021,2022,2023,2024,2025], batteryCapacity: 64, avgReplacementCost: 9000 },
  { brand: "Hyundai", model: "IONIQ 5", years: [2022,2023,2024,2025], batteryCapacity: 77, avgReplacementCost: 12000 },
  { brand: "Hyundai", model: "IONIQ 6", years: [2023,2024,2025], batteryCapacity: 77, avgReplacementCost: 13000 },
  { brand: "Kia", model: "EV6", years: [2022,2023,2024,2025], batteryCapacity: 77, avgReplacementCost: 12000 },
  { brand: "Kia", model: "Niro EV", years: [2019,2020,2021,2022,2023,2024,2025], batteryCapacity: 64, avgReplacementCost: 9000 },
  { brand: "Kia", model: "EV9", years: [2024,2025], batteryCapacity: 100, avgReplacementCost: 18000 },
  { brand: "Audi", model: "Q4 e-tron", years: [2022,2023,2024,2025], batteryCapacity: 77, avgReplacementCost: 14000 },
  { brand: "Audi", model: "e-tron GT", years: [2022,2023,2024,2025], batteryCapacity: 93, avgReplacementCost: 20000 },
  { brand: "Audi", model: "Q8 e-tron", years: [2023,2024,2025], batteryCapacity: 106, avgReplacementCost: 22000 },
  { brand: "Mercedes-Benz", model: "EQA", years: [2021,2022,2023,2024,2025], batteryCapacity: 67, avgReplacementCost: 12000 },
  { brand: "Mercedes-Benz", model: "EQB", years: [2022,2023,2024,2025], batteryCapacity: 67, avgReplacementCost: 12000 },
  { brand: "Mercedes-Benz", model: "EQC", years: [2020,2021,2022,2023], batteryCapacity: 80, avgReplacementCost: 15000 },
  { brand: "Mercedes-Benz", model: "EQS", years: [2022,2023,2024,2025], batteryCapacity: 108, avgReplacementCost: 25000 },
  { brand: "Volvo", model: "XC40 Recharge", years: [2021,2022,2023,2024], batteryCapacity: 69, avgReplacementCost: 11000 },
  { brand: "Volvo", model: "EX30", years: [2024,2025], batteryCapacity: 51, avgReplacementCost: 8000 },
  { brand: "Volvo", model: "EX90", years: [2024,2025], batteryCapacity: 107, avgReplacementCost: 20000 },
  { brand: "Polestar", model: "2", years: [2020,2021,2022,2023,2024,2025], batteryCapacity: 78, avgReplacementCost: 13000 },
  { brand: "Nissan", model: "Leaf", years: [2018,2019,2020,2021,2022,2023,2024], batteryCapacity: 40, avgReplacementCost: 7000 },
  { brand: "Nissan", model: "Ariya", years: [2023,2024,2025], batteryCapacity: 87, avgReplacementCost: 14000 },
  { brand: "Škoda", model: "Enyaq iV", years: [2021,2022,2023,2024,2025], batteryCapacity: 77, avgReplacementCost: 11000 },
  { brand: "Cupra", model: "Born", years: [2022,2023,2024,2025], batteryCapacity: 58, avgReplacementCost: 10000 },
  { brand: "MG", model: "ZS EV", years: [2020,2021,2022,2023,2024,2025], batteryCapacity: 51, avgReplacementCost: 7000 },
  { brand: "MG", model: "MG4", years: [2023,2024,2025], batteryCapacity: 64, avgReplacementCost: 8000 },
  { brand: "BYD", model: "Atto 3", years: [2023,2024,2025], batteryCapacity: 60, avgReplacementCost: 8000 },
  { brand: "BYD", model: "Seal", years: [2024,2025], batteryCapacity: 82, avgReplacementCost: 11000 },
];

export const getBrands = (): string[] => {
  return [...new Set(evDatabase.map(ev => ev.brand))].sort();
};

export const getModels = (brand: string): string[] => {
  return [...new Set(evDatabase.filter(ev => ev.brand === brand).map(ev => ev.model))].sort();
};

export const getYears = (brand: string, model: string): number[] => {
  const ev = evDatabase.find(ev => ev.brand === brand && ev.model === model);
  return ev ? [...ev.years].sort((a, b) => b - a) : [];
};

export const getEVData = (brand: string, model: string): EVModel | undefined => {
  return evDatabase.find(ev => ev.brand === brand && ev.model === model);
};

// Eligibility types
export type EligibilityResult = 
  | { status: "full"; maxAge: number; maxKm: number }
  | { status: "limited"; maxAge: number; maxKm: number }
  | { status: "rejected"; reason: string };

export const checkEligibility = (year: number, mileage: number): EligibilityResult => {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  if (age > 20 || mileage > 300000) {
    return { status: "rejected", reason: "Auto on yli 20 vuotta vanha tai ajokilometrit ylittävät 300 000 km." };
  }
  if (age > 10 || mileage > 200000) {
    return { status: "limited", maxAge: 20, maxKm: 300000 };
  }
  return { status: "full", maxAge: 10, maxKm: 200000 };
};

// Repair limits
export interface RepairLimit {
  months: number;
  label: string;
  fullLimit: number;
  limitedLimit: number;
}

export const repairLimits: RepairLimit[] = [
  { months: 12, label: "12 kk", fullLimit: 6000, limitedLimit: 3000 },
  { months: 24, label: "24 kk", fullLimit: 10000, limitedLimit: 4000 },
  { months: 36, label: "36 kk", fullLimit: 15000, limitedLimit: 5000 },
];

// Coverage categories (sales-friendly names)
export const coverageCategories = [
  { id: "motor", icon: "Zap", title: "Sähköajomoottori", description: "Auton sydän – sähkömoottori ja sen komponentit turvattu" },
  { id: "controller", icon: "Cpu", title: "Moottorin ohjainlaitteet", description: "Moottorin ohjauselektroniikka ja invertteri suojattu" },
  { id: "drivetrain", icon: "Cog", title: "Voimansiirto", description: "Vaihteisto ja voimansiirron kriittiset osat katettu" },
  { id: "brakes", icon: "Shield", title: "Jarru- ja ohjausjärjestelmä", description: "Keskeiset jarru- ja ohjauskomponentit suojattu" },
  { id: "battery", icon: "Battery", title: "Korkeajänniteakku (HV)", description: "Sähköauton kallein osa – koko HV-akkujärjestelmä turvattu" },
  { id: "charging", icon: "PlugZap", title: "Latausjärjestelmä", description: "Sisäinen laturi, DC/DC-muunnin ja latauskomponentit" },
  { id: "cooling", icon: "Thermometer", title: "Akun jäähdytysjärjestelmä", description: "Akun lämpötilanhallinta ja jäähdytyspiiri suojattu" },
  { id: "safety", icon: "ShieldCheck", title: "Turvalaitteet", description: "Airbag-järjestelmä, törmäyssensorit ja turvajärjestelmät" },
  { id: "hvac", icon: "Wind", title: "Lämmitys ja jäähdytys", description: "Ilmastointijärjestelmä ja matkustamon lämpöhallinta" },
  { id: "comfort", icon: "Sparkles", title: "Sähköiset mukavuustoiminnot", description: "Ikkunannostimet, peilit, istuinlämmittimet ja muut sähkötoiminnot" },
];

// Exclusions (simplified for trust)
export const exclusions = [
  "Normaali kuluminen ja huolto",
  "Ulkoiset vauriot (onnettomuudet, vesivahingot)",
  "Muokatut tai viritetyt autot",
  "Viat ennen sopimuksen alkua",
  "Epäsuorat kulut (hinaus, sijaisauto ilman lisäpalvelua)",
];

// Vehicle condition requirements (hidden logic, tooltip info)
export const vehicleRequirements = [
  "Huollettu valmistajan ohjeiden mukaan",
  "Ei aiempia tunnettuja vikoja",
  "Ei ohjelmisto- tai rakennemuutoksia",
  "Ei vakuutusyhtiön lunastama",
];

export interface CoverageTier {
  id: string;
  name: string;
  price: number;
  monthlyPrice: number;
  features: string[];
  highlighted?: boolean;
  coverage: string;
  duration: string;
  repairLimit: number;
}

export const calculatePricing = (
  brand: string,
  model: string,
  year: number,
  mileage: number
): CoverageTier[] | null => {
  const ev = getEVData(brand, model);
  if (!ev) return null;

  const eligibility = checkEligibility(year, mileage);
  if (eligibility.status === "rejected") return null;

  const currentYear = new Date().getFullYear();
  const age = currentYear - year;
  const isLimited = eligibility.status === "limited";

  // Base price factors
  const ageFactor = 1 + (age * 0.08);
  const mileageFactor = 1 + (mileage / 300000);
  const capacityFactor = ev.batteryCapacity / 60;
  const limitedSurcharge = isLimited ? 1.3 : 1;

  const basePrice = 490 * ageFactor * mileageFactor * capacityFactor * limitedSurcharge;

  const limits = isLimited ? repairLimits.map(r => r.limitedLimit) : repairLimits.map(r => r.fullLimit);

  return [
    {
      id: "12kk",
      name: "12 kuukautta",
      price: Math.round(basePrice),
      monthlyPrice: Math.round(basePrice / 12),
      coverage: isLimited ? "Rajoitettu turva" : "Täysi turva",
      duration: "12 kk",
      repairLimit: limits[0],
      features: [
        `Korkeajänniteakku (HV) turvattu`,
        `Akun kapasiteetin heikkeneminen (< 70 %)`,
        "Sähköajomoottori ja ohjainlaitteet",
        "Latausjärjestelmä ja muuntimet",
        "Akun jäähdytysjärjestelmä",
        `Korvausraja: ${limits[0].toLocaleString("fi-FI")} €`,
      ],
    },
    {
      id: "24kk",
      name: "24 kuukautta",
      price: Math.round(basePrice * 1.7),
      monthlyPrice: Math.round((basePrice * 1.7) / 24),
      coverage: isLimited ? "Rajoitettu turva" : "Täysi turva",
      duration: "24 kk",
      repairLimit: limits[1],
      highlighted: true,
      features: [
        "Kaikki 12 kk:n turvan edut",
        "Voimansiirto ja vaihteisto",
        "Jarru- ja ohjausjärjestelmä",
        "Turvalaitteet (airbag, sensorit)",
        "Lämmitys- ja jäähdytysjärjestelmä",
        `Korvausraja: ${limits[1].toLocaleString("fi-FI")} €`,
      ],
    },
    {
      id: "36kk",
      name: "36 kuukautta",
      price: Math.round(basePrice * 2.3),
      monthlyPrice: Math.round((basePrice * 2.3) / 36),
      coverage: isLimited ? "Rajoitettu turva" : "Täysi turva",
      duration: "36 kk",
      repairLimit: limits[2],
      features: [
        "Kaikki 24 kk:n turvan edut",
        "Sähköiset mukavuustoiminnot",
        "Pisin turva-aika",
        "Paras hinta/kuukausi-suhde",
        `Korvausraja: ${limits[2].toLocaleString("fi-FI")} €`,
        isLimited ? "" : "Kattavin mahdollinen suoja",
      ].filter(Boolean),
    },
  ];
};
