import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getBrands, getModels, getYears } from "@/data/evDatabase";
import { Shield, Car, User, ChevronRight, ChevronLeft, Zap, Building2, Search } from "lucide-react";

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
    if (step < TOTAL_STEPS) setStep(step + 1);
    else onComplete(data);
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  const OptionCard = ({ selected, onClick, icon: Icon, label, sublabel }: { selected: boolean; onClick: () => void; icon: React.ElementType; label: string; sublabel?: string }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
        selected
          ? "border-primary bg-primary/5 glow-primary"
          : "border-border bg-background hover:border-primary/40 hover:bg-primary/[0.02]"
      }`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${selected ? "gradient-hero" : "bg-muted"}`}>
        <Icon className={`w-7 h-7 ${selected ? "text-primary-foreground" : "text-muted-foreground"}`} />
      </div>
      <span className="font-semibold text-foreground">{label}</span>
      {sublabel && <span className="text-xs text-muted-foreground">{sublabel}</span>}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-md" />

      <div
        className="relative w-full max-w-lg glass-strong rounded-3xl p-8 shadow-premium-lg animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-200">
          ✕
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-muted-foreground">Vaihe {step}/{TOTAL_STEPS}</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full gradient-hero transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="min-h-[300px] flex flex-col">
          {step === 1 && (
            <div className="animate-fade-up">
              <h2 className="text-2xl font-bold mb-2 text-foreground">Onko sinulla jo sähköauto?</h2>
              <p className="text-muted-foreground mb-6">Valitse tilanne, niin räätälöimme tarjouksen sinulle.</p>
              <div className="grid grid-cols-2 gap-4">
                <OptionCard selected={data.hasEV === true} onClick={() => setData({ ...data, hasEV: true, isBuying: false })} icon={Car} label="Kyllä, omistan" sublabel="Nykyinen auto" />
                <OptionCard selected={data.hasEV === false} onClick={() => setData({ ...data, hasEV: false, isBuying: true })} icon={Zap} label="Olen ostamassa" sublabel="Tuleva auto" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-up">
              <h2 className="text-2xl font-bold mb-2 text-foreground">Oletko yksityishenkilö vai yritys?</h2>
              <p className="text-muted-foreground mb-6">Tämä vaikuttaa tarjouksen ehtoihin.</p>
              <div className="grid grid-cols-2 gap-4">
                <OptionCard selected={data.customerType === "private"} onClick={() => setData({ ...data, customerType: "private" })} icon={User} label="Yksityishenkilö" />
                <OptionCard selected={data.customerType === "business"} onClick={() => setData({ ...data, customerType: "business" })} icon={Building2} label="Yritys" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-up">
              <h2 className="text-2xl font-bold mb-2 text-foreground">Mikä on autosi?</h2>
              <p className="text-muted-foreground mb-6">Merkki ja malli</p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Merkki</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Hae merkki..."
                      value={brandSearch || data.brand}
                      onChange={(e) => { setBrandSearch(e.target.value); setData({ ...data, brand: "", model: "" }); }}
                      className="w-full h-12 pl-11 pr-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all duration-200"
                    />
                  </div>
                  {brandSearch && brands.length > 0 && (
                    <div className="mt-2 max-h-36 overflow-y-auto rounded-xl border border-border bg-card shadow-premium-lg">
                      {brands.map(b => (
                        <button key={b} onClick={() => { setData({ ...data, brand: b, model: "" }); setBrandSearch(""); setModelSearch(""); }}
                          className="w-full text-left px-4 py-3 hover:bg-muted text-foreground text-sm font-medium transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl">{b}</button>
                      ))}
                    </div>
                  )}
                </div>
                {data.brand && (
                  <div className="animate-fade-up">
                    <label className="text-sm font-semibold text-foreground mb-2 block">Malli</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Hae malli..."
                        value={modelSearch || data.model}
                        onChange={(e) => { setModelSearch(e.target.value); setData({ ...data, model: "" }); }}
                        className="w-full h-12 pl-11 pr-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all duration-200"
                      />
                    </div>
                    {modelSearch && models.length > 0 && (
                      <div className="mt-2 max-h-36 overflow-y-auto rounded-xl border border-border bg-card shadow-premium-lg">
                        {models.map(m => (
                          <button key={m} onClick={() => { setData({ ...data, model: m }); setModelSearch(""); }}
                            className="w-full text-left px-4 py-3 hover:bg-muted text-foreground text-sm font-medium transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl">{m}</button>
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
              <h2 className="text-2xl font-bold mb-2 text-foreground">Vuosimalli?</h2>
              <p className="text-muted-foreground mb-6">Valitse auton vuosimalli.</p>
              <div className="grid grid-cols-3 gap-3 max-h-52 overflow-y-auto">
                {years.map(y => (
                  <button
                    key={y}
                    onClick={() => setData({ ...data, year: y })}
                    className={`py-3.5 rounded-xl border-2 font-semibold transition-all duration-300 text-foreground hover:scale-[1.02] ${
                      data.year === y ? "border-primary bg-primary/5 glow-primary" : "border-border hover:border-primary/40"
                    }`}
                  >{y}</button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="animate-fade-up">
              <h2 className="text-2xl font-bold mb-2 text-foreground">Ajokilometrit?</h2>
              <p className="text-muted-foreground mb-6">Arvio nykyisistä ajokilometreistä.</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "0 – 30 000 km", value: 15000 },
                  { label: "30 – 60 000 km", value: 45000 },
                  { label: "60 – 100 000 km", value: 80000 },
                  { label: "100 – 150 000 km", value: 125000 },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setData({ ...data, mileage: opt.value })}
                    className={`py-4 px-4 rounded-xl border-2 font-medium text-sm transition-all duration-300 text-foreground hover:scale-[1.02] ${
                      data.mileage === opt.value ? "border-primary bg-primary/5 glow-primary" : "border-border hover:border-primary/40"
                    }`}
                  >{opt.label}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <Button variant="outline" onClick={back} className="flex-1 h-12 rounded-xl">
              <ChevronLeft className="w-4 h-4" /> Takaisin
            </Button>
          )}
          <Button
            variant="hero"
            onClick={next}
            disabled={!canProceed()}
            className="flex-1 h-12 rounded-xl"
          >
            {step === TOTAL_STEPS ? "Näytä tarjous" : "Jatka"} <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QualificationFlow;
