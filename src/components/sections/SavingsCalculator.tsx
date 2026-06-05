import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, ArrowRight } from "lucide-react";

type FuelType = "bensiini" | "diesel" | "hybridi" | "sahko";

const AVG_REPAIR: Record<FuelType, { low: number; high: number; label: string }> = {
  bensiini: { low: 1800, high: 6500,  label: "Bensiini" },
  diesel:   { low: 2200, high: 8500,  label: "Diesel" },
  hybridi:  { low: 2500, high: 9500,  label: "Hybridi" },
  sahko:    { low: 4500, high: 20000, label: "Sähkö" },
};

// Rough plan price scaling by age (€/kk)
const planMonthlyByAge = (age: number) => {
  if (age <= 3) return 19;
  if (age <= 6) return 24;
  if (age <= 10) return 32;
  return 39;
};

interface Props {
  onStartFlow: () => void;
}

const SavingsCalculator = ({ onStartFlow }: Props) => {
  const [fuel, setFuel] = useState<FuelType>("bensiini");
  const [age, setAge] = useState(5);

  const repair = AVG_REPAIR[fuel];
  const avgRepair = Math.round((repair.low + repair.high) / 2);
  const monthly = planMonthlyByAge(age);
  const yearly = monthly * 12;
  const savings = Math.max(0, avgRepair - yearly);

  const fuels: FuelType[] = ["bensiini", "diesel", "hybridi", "sahko"];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-gradient bg-brand-gradient-soft mb-4">
            <Calculator className="w-3.5 h-3.5" /> Säästölaskuri
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
            Paljonko säästät?
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Vertaa keskimääräistä yllättävää korjauskustannusta Jatkoturvan hintaan.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 grid lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                Auton käyttövoima
              </label>
              <div className="grid grid-cols-2 gap-2">
                {fuels.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFuel(f)}
                    className="admin-chip justify-center"
                    data-selected={fuel === f}
                  >
                    {AVG_REPAIR[f].label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Auton ikä
                </label>
                <span className="text-2xl font-black text-brand-gradient">{age} v</span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-[#FF4D9D]"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>1 v</span><span>5 v</span><span>10 v</span><span>15 v</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border/50 p-5 bg-muted/30">
              <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-1">
                Keskimääräinen yllätyskorjaus
              </p>
              <p className="text-3xl font-black text-foreground">
                {avgRepair.toLocaleString("fi-FI")} €
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Vaihteluväli {repair.low.toLocaleString("fi-FI")}–{repair.high.toLocaleString("fi-FI")} €
              </p>
            </div>

            <div className="rounded-xl p-5 bg-brand-gradient-soft border border-[#FF4D9D]/30">
              <p className="text-xs uppercase tracking-wider font-bold text-brand-gradient mb-1">
                Jatkoturva
              </p>
              <p className="text-3xl font-black text-foreground">
                {monthly} € / kk
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                eli {yearly} € vuodessa
              </p>
            </div>

            <div className="rounded-xl p-5 btn-brand text-white flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider font-bold opacity-90">
                  Mahdollinen säästö / vika
                </p>
                <p className="text-3xl font-black flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  {savings.toLocaleString("fi-FI")} €
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button size="lg" className="btn-brand h-14 px-10 rounded-full text-base" onClick={onStartFlow}>
            Katso sopimukset <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
