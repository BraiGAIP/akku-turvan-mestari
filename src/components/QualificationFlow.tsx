import { useState, useMemo, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { getBrands, getModels, getYears, checkEligibility } from "@/data/evDatabase";
import { Shield, Car, User, ChevronRight, ChevronLeft, Zap, Building2, Search, Calendar, Gauge, Mail, Phone, Lock, ArrowRight, AlertTriangle, Info } from "lucide-react";

export interface QualificationData {
  hasEV: boolean | null;
  isBuying: boolean | null;
  customerType: "private" | "business" | null;
  brand: string;
  model: string;
  year: number | null;
  mileage: number | null;
  timing: "asap" | "month" | "exploring" | null;
  email: string;
  phone: string;
}

interface Props {
  onComplete: (data: QualificationData) => void;
  onClose: () => void;
}

const TOTAL_STEPS = 6;
const STORAGE_KEY = "akkuturva_funnel";

const QualificationFlow = ({ onComplete, onClose }: Props) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [isAnimating, setIsAnimating] = useState(false);
  const [data, setData] = useState<QualificationData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...JSON.parse(saved) };
    } catch {}
    return {
      hasEV: null, isBuying: null, customerType: null,
      brand: "", model: "", year: null, mileage: null,
      timing: null, email: "", phone: "",
    };
  });
  const [brandSearch, setBrandSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
  }, [data]);

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

  // Eligibility check for step 3
  const eligibility = useMemo(() => {
    if (data.year && data.mileage) return checkEligibility(data.year, data.mileage);
    return null;
  }, [data.year, data.mileage]);

  const canProceed = () => {
    switch (step) {
      case 1: return data.hasEV !== null;
      case 2: return data.customerType !== null;
      case 3: {
        if (!data.brand || !data.model || !data.year || !data.mileage) return false;
        // Block if rejected
        if (eligibility?.status === "rejected") return false;
        return true;
      }
      case 4: return data.timing !== null;
      case 5: return data.email.includes("@") && data.phone.length >= 6;
      case 6: return true;
      default: return false;
    }
  };

  const animateTransition = useCallback((dir: "forward" | "back", newStep: number) => {
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => { setStep(newStep); setIsAnimating(false); }, 250);
  }, []);

  const next = () => {
    if (!canProceed()) return;
    if (step < TOTAL_STEPS) animateTransition("forward", step + 1);
    else { localStorage.removeItem(STORAGE_KEY); onComplete(data); }
  };

  const back = () => { if (step > 1) animateTransition("back", step - 1); };

  const stepLabels = ["Auto", "Tyyppi", "Tiedot", "Ajoitus", "Yhteystiedot", "Tarjous"];
  const animClass = isAnimating
    ? direction === "forward" ? "opacity-0 translate-x-8" : "opacity-0 -translate-x-8"
    : "opacity-100 translate-x-0";

  const OptionCard = ({ selected, onClick, icon: Icon, label, sublabel }: { selected: boolean; onClick: () => void; icon: React.ElementType; label: string; sublabel?: string }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-3 p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
        selected ? "border-primary bg-primary/5 glow-primary" : "border-border bg-background hover:border-primary/40"
      }`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${selected ? "gradient-hero" : "bg-muted"}`}>
        <Icon className={`w-7 h-7 transition-colors duration-300 ${selected ? "text-primary-foreground" : "text-muted-foreground"}`} />
      </div>
      <span className="font-bold text-foreground text-lg">{label}</span>
      {sublabel && <span className="text-sm text-muted-foreground">{sublabel}</span>}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Top bar */}
      <div className="flex-shrink-0 px-6 py-4 flex items-center justify-between border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-extrabold text-gradient">AkkuTurva</span>
        </div>
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-200 text-sm font-medium">✕</button>
      </div>

      {/* Progress */}
      <div className="flex-shrink-0 px-6 pt-4 pb-2">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                  i + 1 < step ? "gradient-hero text-primary-foreground"
                  : i + 1 === step ? "ring-2 ring-primary bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
                }`}>
                  {i + 1 < step ? "✓" : i + 1}
                </div>
                <span className={`text-[10px] font-medium hidden sm:block transition-colors duration-300 ${i + 1 <= step ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
              </div>
            ))}
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full gradient-hero transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 flex items-center justify-center px-6 overflow-hidden">
        <div className={`w-full max-w-xl transition-all duration-300 ease-out ${animClass}`}>
          
          {step === 1 && (
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3 tracking-tight">Onko sinulla jo sähköauto?</h2>
              <p className="text-muted-foreground text-lg mb-8">Valitse tilanne, niin räätälöimme tarjouksen.</p>
              <div className="grid grid-cols-2 gap-4">
                <OptionCard selected={data.hasEV === true} onClick={() => setData({ ...data, hasEV: true, isBuying: false })} icon={Car} label="Kyllä" sublabel="Omistan sähköauton" />
                <OptionCard selected={data.hasEV === false} onClick={() => setData({ ...data, hasEV: false, isBuying: true })} icon={Zap} label="Olen ostamassa" sublabel="Harkitsen ostoa" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3 tracking-tight">Yksityishenkilö vai yritys?</h2>
              <p className="text-muted-foreground text-lg mb-8">Tämä vaikuttaa tarjouksen ehtoihin.</p>
              <div className="grid grid-cols-2 gap-4">
                <OptionCard selected={data.customerType === "private"} onClick={() => setData({ ...data, customerType: "private" })} icon={User} label="Yksityinen" sublabel="Henkilökohtainen käyttö" />
                <OptionCard selected={data.customerType === "business"} onClick={() => setData({ ...data, customerType: "business" })} icon={Building2} label="Yritys" sublabel="Yritysajoneuvo" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3 tracking-tight">Autosi tiedot</h2>
              <p className="text-muted-foreground text-lg mb-6">Merkki, malli, vuosimalli ja kilometrit.</p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Merkki</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="text" placeholder="Hae merkki..." value={brandSearch || data.brand}
                      onChange={(e) => { setBrandSearch(e.target.value); setData({ ...data, brand: "", model: "", year: null }); }}
                      className="w-full h-12 pl-11 pr-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all duration-200" />
                  </div>
                  {brandSearch && brands.length > 0 && (
                    <div className="mt-1 max-h-32 overflow-y-auto rounded-xl border border-border bg-card shadow-premium-lg z-10 relative">
                      {brands.map(b => (
                        <button key={b} onClick={() => { setData({ ...data, brand: b, model: "", year: null }); setBrandSearch(""); setModelSearch(""); }}
                          className="w-full text-left px-4 py-2.5 hover:bg-muted text-foreground text-sm font-medium transition-colors first:rounded-t-xl last:rounded-b-xl">{b}</button>
                      ))}
                    </div>
                  )}
                </div>

                {data.brand && (
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1.5 block">Malli</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="text" placeholder="Hae malli..." value={modelSearch || data.model}
                        onChange={(e) => { setModelSearch(e.target.value); setData({ ...data, model: "", year: null }); }}
                        className="w-full h-12 pl-11 pr-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all duration-200" />
                    </div>
                    {modelSearch && models.length > 0 && (
                      <div className="mt-1 max-h-32 overflow-y-auto rounded-xl border border-border bg-card shadow-premium-lg z-10 relative">
                        {models.map(m => (
                          <button key={m} onClick={() => { setData({ ...data, model: m, year: null }); setModelSearch(""); }}
                            className="w-full text-left px-4 py-2.5 hover:bg-muted text-foreground text-sm font-medium transition-colors first:rounded-t-xl last:rounded-b-xl">{m}</button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {data.model && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-1.5 block">Vuosimalli</label>
                      <select value={data.year || ""} onChange={(e) => setData({ ...data, year: Number(e.target.value) || null })}
                        className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all duration-200 appearance-none">
                        <option value="">Valitse</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-1.5 block">Kilometrit</label>
                      <select value={data.mileage || ""} onChange={(e) => setData({ ...data, mileage: Number(e.target.value) || null })}
                        className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all duration-200 appearance-none">
                        <option value="">Valitse</option>
                        <option value={15000}>0–30 000 km</option>
                        <option value={45000}>30–60 000 km</option>
                        <option value={80000}>60–100 000 km</option>
                        <option value={125000}>100–150 000 km</option>
                        <option value={175000}>150–200 000 km</option>
                        <option value={250000}>200–300 000 km</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Eligibility feedback */}
                {eligibility && (
                  <div className={`rounded-xl p-4 flex items-start gap-3 ${
                    eligibility.status === "full" ? "bg-secondary/10 border border-secondary/20" :
                    eligibility.status === "limited" ? "bg-primary/10 border border-primary/20" :
                    "bg-destructive/10 border border-destructive/20"
                  }`}>
                    {eligibility.status === "rejected" ? (
                      <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
                    )}
                    <div>
                      {eligibility.status === "full" && (
                        <>
                          <p className="font-bold text-foreground text-sm">✓ Autosi on täysin kelpoinen</p>
                          <p className="text-xs text-muted-foreground mt-1">Täysi GoSafe Electric -turva saatavilla – korvausrajat jopa 15 000 €.</p>
                        </>
                      )}
                      {eligibility.status === "limited" && (
                        <>
                          <p className="font-bold text-foreground text-sm">Rajoitettu turva saatavilla</p>
                          <p className="text-xs text-muted-foreground mt-1">Auton iän tai kilometrien vuoksi korvausrajat ovat matalammat (3 000–5 000 €). Turva on silti saatavilla.</p>
                        </>
                      )}
                      {eligibility.status === "rejected" && (
                        <>
                          <p className="font-bold text-destructive text-sm">Autosi ei valitettavasti täytä ehtoja</p>
                          <p className="text-xs text-muted-foreground mt-1">{eligibility.reason}</p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3 tracking-tight">Milloin tarvitset turvan?</h2>
              <p className="text-muted-foreground text-lg mb-8">Tämä auttaa meitä palvelemaan sinua paremmin.</p>
              <div className="space-y-3">
                {[
                  { value: "asap" as const, icon: Zap, label: "Heti", desc: "Haluan suojan mahdollisimman pian" },
                  { value: "month" as const, icon: Calendar, label: "Kuukauden sisään", desc: "Olen päättämässä lähiaikoina" },
                  { value: "exploring" as const, icon: Search, label: "Tutkin vaihtoehtoja", desc: "Vertailen ja kerään tietoa" },
                ].map(opt => (
                  <button key={opt.value} onClick={() => setData({ ...data, timing: opt.value })}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] ${
                      data.timing === opt.value ? "border-primary bg-primary/5 glow-primary" : "border-border hover:border-primary/40"
                    }`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      data.timing === opt.value ? "gradient-hero" : "bg-muted"
                    }`}>
                      <opt.icon className={`w-6 h-6 ${data.timing === opt.value ? "text-primary-foreground" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <span className="font-bold text-foreground text-lg">{opt.label}</span>
                      <p className="text-sm text-muted-foreground">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3 tracking-tight">Yhteystietosi</h2>
              <p className="text-muted-foreground text-lg mb-8">Lähetämme tarjouksen sinulle. Ei roskapostia.</p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Sähköposti</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="email" placeholder="nimi@esimerkki.fi" value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                      className="w-full h-14 pl-11 pr-4 rounded-xl border border-input bg-background text-foreground text-lg focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all duration-200" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Puhelinnumero</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="tel" placeholder="+358 40 123 4567" value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                      className="w-full h-14 pl-11 pr-4 rounded-xl border border-input bg-background text-foreground text-lg focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all duration-200" />
                  </div>
                </div>
                <div className="flex items-start gap-2 text-xs text-muted-foreground pt-2">
                  <Lock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>Tietojasi käsitellään GDPR:n mukaisesti. Ei roskapostia, ei kolmansia osapuolia.</span>
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="text-center">
              <div className="w-20 h-20 rounded-3xl gradient-hero flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <Shield className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground mb-3 tracking-tight">Kaikki valmiina!</h2>
              <p className="text-muted-foreground text-lg mb-8">Tässä yhteenveto ennen tarjousta.</p>
              <div className="glass-strong rounded-2xl p-6 text-left space-y-3 shadow-premium mb-2">
                {[
                  { l: "Auto", v: `${data.brand} ${data.model}` },
                  { l: "Vuosimalli", v: String(data.year) },
                  { l: "Kilometrit", v: `${data.mileage?.toLocaleString("fi-FI")} km` },
                  { l: "Sähköposti", v: data.email },
                ].map(({ l, v }, i, arr) => (
                  <div key={l} className={`flex justify-between items-center py-2 ${i < arr.length - 1 ? "border-b border-border/50" : ""}`}>
                    <span className="text-sm text-muted-foreground">{l}</span>
                    <span className="font-bold text-foreground">{v}</span>
                  </div>
                ))}
              </div>
              {eligibility?.status === "limited" && (
                <div className="mt-4 p-3 rounded-xl bg-primary/10 border border-primary/20 text-sm text-muted-foreground text-left flex items-start gap-2">
                  <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Autollesi on saatavilla rajoitettu turva alhaisemmilla korvausrajoilla.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="flex-shrink-0 px-6 py-5 border-t border-border/50">
        <div className="max-w-xl mx-auto flex gap-3">
          {step > 1 && (
            <Button variant="outline" onClick={back} className="h-13 px-6 rounded-xl text-base">
              <ChevronLeft className="w-4 h-4" /> Takaisin
            </Button>
          )}
          <Button variant="hero" onClick={next} disabled={!canProceed()} className="flex-1 h-13 rounded-xl text-base">
            {step === TOTAL_STEPS ? <>Näytä tarjous <ArrowRight className="w-5 h-5" /></> : <>Jatka <ChevronRight className="w-5 h-5" /></>}
          </Button>
        </div>
        <p className="text-center text-[10px] text-muted-foreground mt-2">Perustuu Fraguksen virallisiin ehtoihin · Läpinäkyvä ja selkeä turva</p>
      </div>
    </div>
  );
};

export default QualificationFlow;
