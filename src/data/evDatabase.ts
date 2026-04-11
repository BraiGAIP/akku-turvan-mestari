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

export interface CoverageTier {
  id: string;
  name: string;
  price: number;
  monthlyPrice: number;
  features: string[];
  highlighted?: boolean;
  coverage: string;
  duration: string;
}

export const calculatePricing = (
  brand: string,
  model: string,
  year: number,
  mileage: number
): CoverageTier[] | null => {
  const ev = getEVData(brand, model);
  if (!ev) return null;

  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  // Decline if too old or too many km
  if (age > 8 || mileage > 150000) return null;

  // Base price factors
  const ageFactor = 1 + (age * 0.12);
  const mileageFactor = 1 + (mileage / 200000);
  const capacityFactor = ev.batteryCapacity / 60;

  const basePrice = 490 * ageFactor * mileageFactor * capacityFactor;

  return [
    {
      id: "basic",
      name: "Perus",
      price: Math.round(basePrice),
      monthlyPrice: Math.round(basePrice / 24),
      coverage: "Akun perustoiminnot",
      duration: "3 vuotta",
      features: [
        "Akun kapasiteetin lasku alle 70%",
        "Akkumoduulin vika",
        "Akun hallintajärjestelmä (BMS)",
        "Enintään 5 000 € korvaus",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: Math.round(basePrice * 1.6),
      monthlyPrice: Math.round((basePrice * 1.6) / 24),
      coverage: "Laaja akkuturva",
      duration: "5 vuotta",
      highlighted: true,
      features: [
        "Kaikki Perus-tason edut",
        "Akun kapasiteetin lasku alle 80%",
        "Lämpötilanhallintajärjestelmä",
        "Latausjärjestelmän viat",
        "Enintään 15 000 € korvaus",
        "Hinauspalvelu",
      ],
    },
    {
      id: "extended",
      name: "Laajennettu",
      price: Math.round(basePrice * 2.2),
      monthlyPrice: Math.round((basePrice * 2.2) / 24),
      coverage: "Täysi akkuturva",
      duration: "8 vuotta",
      features: [
        "Kaikki Premium-tason edut",
        "Täysi akun vaihto tarvittaessa",
        "Sähkömoottorin suoja",
        "Tehoelektroniikka",
        "Rajaton korvaus",
        "Sijaisauto akun vaihdon ajaksi",
        "24/7 hätäpalvelu",
      ],
    },
  ];
};
