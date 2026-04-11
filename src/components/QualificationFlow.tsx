import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getBrands, getModels, getYears } from "@/data/evDatabase";
import { Shield, Car, User, ChevronRight, ChevronLeft, Zap } from "lucide-react";

export interface QualificationData {
  hasEV: boolean | null;
  isBuying: boolean | null;
  customerType: "private" | "business" | null;
  brand: string;
  model: string;
  year: number | null;
  mileage: number | null;
}

interface Props {
  onComplete: (data: QualificationData) => void;
  onClose: () => void;
}

const TOTAL_STEPS = 5;

const QualificationFlow = ({ onComplete, onClose }: Props) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QualificationData>({
    hasEV: null,
    isBuying: null,
    customerType: null,
    brand: "",
    model: "",
    year: null,
    mileage: null,
  });
  const [brandSearch, setBrandSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");

  const progress = (step / TOTAL_STEPS) * 100;

  const brands = useMemo(() => {
    const all = getBrands();
    return brandSearch ? all.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase())) : all;
  }, [brandSearch]);

  const models = useMemo(() => {
    if (!data.brand) return [];
    const all = getModels(data.brand);
    return modelSearch ? all.filter(m => m.toLowerCase().includes(modelSearch.toLowerCase())) : all;
  }, [data.brand, modelSearch]);

  const years = useMemo(() => {
    if (!data.brand || !data.model) return [];
    return getYears(data.brand, data.model);
  }, [data.brand, data.model]);

  const canProceed = () => {
    switch (step) {
      case 1: return data.hasEV !== null;
      case 2: return data.customerType !== null;
      case 3: return data.brand !== "" && data.model !== "";
      case 4: return data.year !== null;
      case 5: return data.mileage !== null;
      default: return false;
    }
  };

  const next = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      onComplete(data);
    }
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-card p-6 md:p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors text-xl">✕</button>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Vaihe {step}/{TOTAL_STEPS}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="min-h-[280px] flex flex-col">
          {step === 1 && (
            <div className="animate-fade-up">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Onko sinulla jo sähköauto?</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setData({ ...data, hasEV: true, isBuying: false })}
                  className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200 ${data.hasEV === true ? "border-primary bg-primary/5 glow-primary" : "border-border hover:border-primary/50"}`}
                >
                  <Car className="w-10 h-10 text-primary" />
                  <span className="font-semibold text-foreground">Kyllä, omistan</span>
                </button>
                <button
                  onClick={() => setData({ ...data, hasEV: false, isBuying: true })}
                  className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200 ${data.hasEV === false ? "border-primary bg-primary/5 glow-primary" : "border-border hover:border-primary/50"}`}
                >
                  <Zap className="w-10 h-10 text-secondary" />
                  <span className="font-semibold text-foreground">Olen ostamassa</span>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-up">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Oletko yksityishenkilö vai yritys?</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setData({ ...data, customerType: "private" })}
                  className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200 ${data.customerType === "private" ? "border-primary bg-primary/5 glow-primary" : "border-border hover:border-primary/50"}`}
                >
                  <User className="w-10 h-10 text-primary" />
                  <span className="font-semibold text-foreground">Yksityishenkilö</span>
                </button>
                <button
                  onClick={() => setData({ ...data, customerType: "business" })}
                  className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200 ${data.customerType === "business" ? "border-primary bg-primary/5 glow-primary" : "border-border hover:border-primary/50"}`}
                >
                  <Shield className="w-10 h-10 text-secondary" />
                  <span className="font-semibold text-foreground">Yritys</span>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-up">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Mikä on autosi merkki ja malli?</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">Merkki</label>
                  <input
                    type="text"
                    placeholder="Hae merkki..."
                    value={brandSearch || data.brand}
                    onChange={(e) => {
                      setBrandSearch(e.target.value);
                      setData({ ...data, brand: "", model: "" });
                    }}
                    className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                  {brandSearch && brands.length > 0 && (
                    <div className="mt-1 max-h-32 overflow-y-auto rounded-lg border border-border bg-card shadow-lg">
                      {brands.map(b => (
                        <button key={b} onClick={() => { setData({ ...data, brand: b, model: "" }); setBrandSearch(""); setModelSearch(""); }}
                          className="w-full text-left px-4 py-2 hover:bg-muted text-foreground text-sm">{b}</button>
                      ))}
                    </div>
                  )}
                </div>
                {data.brand && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1 block">Malli</label>
                    <input
                      type="text"
                      placeholder="Hae malli..."
                      value={modelSearch || data.model}
                      onChange={(e) => {
                        setModelSearch(e.target.value);
                        setData({ ...data, model: "" });
                      }}
                      className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                    {modelSearch && models.length > 0 && (
                      <div className="mt-1 max-h-32 overflow-y-auto rounded-lg border border-border bg-card shadow-lg">
                        {models.map(m => (
                          <button key={m} onClick={() => { setData({ ...data, model: m }); setModelSearch(""); }}
                            className="w-full text-left px-4 py-2 hover:bg-muted text-foreground text-sm">{m}</button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-up">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Vuosimalli?</h2>
              <div className="grid grid-cols-3 gap-3 max-h-48 overflow-y-auto">
                {years.map(y => (
                  <button
                    key={y}
                    onClick={() => setData({ ...data, year: y })}
                    className={`py-3 rounded-lg border-2 font-semibold transition-all text-foreground ${data.year === y ? "border-primary bg-primary/5 glow-primary" : "border-border hover:border-primary/50"}`}
                  >{y}</button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="animate-fade-up">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Ajokilometrit?</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "0 – 30 000 km", value: 15000 },
                  { label: "30 000 – 60 000 km", value: 45000 },
                  { label: "60 000 – 100 000 km", value: 80000 },
                  { label: "100 000 – 150 000 km", value: 125000 },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setData({ ...data, mileage: opt.value })}
                    className={`py-4 px-3 rounded-lg border-2 font-medium text-sm transition-all text-foreground ${data.mileage === opt.value ? "border-primary bg-primary/5 glow-primary" : "border-border hover:border-primary/50"}`}
                  >{opt.label}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          {step > 1 && (
            <Button variant="outline" onClick={back} className="flex-1">
              <ChevronLeft className="w-4 h-4" /> Takaisin
            </Button>
          )}
          <Button
            variant="hero"
            onClick={next}
            disabled={!canProceed()}
            className="flex-1 h-12"
          >
            {step === TOTAL_STEPS ? "Näytä tarjous" : "Jatka"} <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QualificationFlow;
