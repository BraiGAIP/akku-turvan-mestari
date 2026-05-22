import { useState, useMemo, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { getBrands, getModels, getYears, checkEligibility, calculatePricing } from "@/data/evDatabase";
import { Shield, Search, ArrowRight, ChevronLeft, Check, Car, X, AlertTriangle, Sparkles } from "lucide-react";
import type { VehicleData } from "@/components/QualificationFlow";

interface Props {
  open: boolean;
  onComplete: (data: VehicleData) => void;
  onClose: () => void;
}

type Step = "method" | "reg" | "manual-brand" | "manual-details" | "price";

const PriceCalculatorModal = ({ open, onComplete, onClose }: Props) => {
  const [step, setStep] = useState<Step>("method");
  const [regNumber, setRegNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number | null>(null);
  const [mileage, setMileage] = useState<number | null>(null);
  const [brandSearch, setBrandSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [manualBrand, setManualBrand] = useState("");
  const [manualModel, setManualModel] = useState("");
  const [manualYear, setManualYear] = useState("");
  const [manualMileage, setManualMileage] = useState("");
  const [isManual, setIsManual] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [animating, setAnimating] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Reset on open
  useEffect(() => {
    if (open) {
      setStep("method");
      setRegNumber("");
      setBrand("");
      setModel("");
      setYear(null);
      setMileage(null);
      setBrandSearch("");
      setModelSearch("");
      setManualBrand("");
      setManualModel("");
      setManualYear("");
      setManualMileage("");
      setIsManual(false);
      setShowExitConfirm(false);
    }
  }, [open]);

  // Auto-focus inputs on step change
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [step, open]);

  const brands = useMemo(() => {
    const all = getBrands();
    return brandSearch ? all.filter((b) => b.toLowerCase().includes(brandSearch.toLowerCase())) : all;
  }, [brandSearch]);

  const models = useMemo(() => {
    if (!brand) return [];
    const all = getModels(brand);
    return modelSearch ? all.filter((m) => m.toLowerCase().includes(modelSearch.toLowerCase())) : all;
  }, [brand, modelSearch]);

  const years = useMemo(() => {
    if (!brand || !model) return [];
    return getYears(brand, model);
  }, [brand, model]);

  // Calculate pricing for the price step
  const pricingData = useMemo(() => {
    if (isManual) {
      const y = parseInt(manualYear);
      const m = parseInt(manualMileage);
      if (manualBrand && manualModel && y && m) {
        return calculatePricing(manualBrand, manualModel, y, m);
      }
    } else if (brand && model && year && mileage) {
      return calculatePricing(brand, model, year, mileage);
    }
    return null;
  }, [brand, model, year, mileage, isManual, manualBrand, manualModel, manualYear, manualMileage]);

  const eligibility = useMemo(() => {
    if (isManual) {
      const y = parseInt(manualYear);
      const m = parseInt(manualMileage);
      if (y && m) return checkEligibility(y, m);
    } else if (year && mileage) {
      return checkEligibility(year, mileage);
    }
    return null;
  }, [year, mileage, isManual, manualYear, manualMileage]);

  const goToStep = (s: Step) => {
    setAnimating(true);
    setTimeout(() => {
      setStep(s);
      setAnimating(false);
    }, 150);
  };

  const handleClose = () => {
    if (step === "price") {
      onClose();
    } else if (step !== "method") {
      setShowExitConfirm(true);
    } else {
      onClose();
    }
  };

  const handleRegSubmit = () => {
    // Simulate reg lookup - in real app this would call an API
    // For now go to manual brand selection
    goToStep("manual-brand");
  };

  const handleBrandSelect = (b: string) => {
    setBrand(b);
    setManualBrand(b);
    setBrandSearch("");
    setModel("");
    setManualModel("");
    setYear(null);
    setManualYear("");
    setMileage(null);
    setManualMileage("");
    setModelSearch("");
  };

  const handleModelSelect = (m: string) => {
    setModel(m);
    setModelSearch("");
    setYear(null);
    setMileage(null);
  };

  const canShowPrice = () => {
    if (isManual) {
      return manualBrand && manualModel && manualYear && manualMileage;
    }
    return brand && model && year && mileage && eligibility?.status !== "rejected";
  };

  const handleShowPrice = () => {
    goToStep("price");
  };

  const handleBuy = () => {
    if (isManual) {
      onComplete({
        brand: manualBrand,
        model: manualModel,
        year: parseInt(manualYear),
        mileage: parseInt(manualMileage),
        isManualEntry: true,
      });
    } else {
      onComplete({
        brand,
        model,
        year: year!,
        mileage: mileage!,
        isManualEntry: false,
      });
    }
  };

  if (!open) return null;

  const lowestMonthly = pricingData ? Math.min(...pricingData.map(t => t.monthlyPrice)) : 0;
  const lowestYearly = pricingData ? Math.min(...pricingData.map(t => t.price)) : 0;
  const vehicleName = isManual ? `${manualBrand} ${manualModel}` : `${brand} ${model}`;
  const vehicleYear = isManual ? manualYear : year;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#111827] shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-base font-bold text-white">Jatkoturva</span>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className={`px-6 py-6 transition-opacity duration-150 ${animating ? "opacity-0" : "opacity-100"}`}>

            {/* STEP: Method selection */}
            {step === "method" && (
              <div>
                <h2 className="text-xl font-black text-white mb-1 tracking-tight">
                  Laske akkuturvan hinta autollesi
                </h2>
                <p className="text-sm text-white/50 mb-6">
                  Syötä tiedot – saat hinnan heti. Ei sitoutumista.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => goToStep("reg")}
                    className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/40 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Car className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">Syötä rekisterinumero</p>
                        <p className="text-xs text-white/40">Haemme tiedot automaattisesti</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/30 ml-auto group-hover:text-primary transition-colors" />
                    </div>
                  </button>
                  <button
                    onClick={() => { setIsManual(true); goToStep("manual-brand"); }}
                    className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/40 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <Search className="w-5 h-5 text-white/60" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">Syötän tiedot itse</p>
                        <p className="text-xs text-white/40">Valitse merkki, malli ja vuosi</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/30 ml-auto group-hover:text-primary transition-colors" />
                    </div>
                  </button>
                </div>
                <p className="text-xs text-white/30 text-center mt-5">
                  <Shield className="w-3 h-3 inline mr-1" />
                  Tietojasi ei tallenneta ennen ostoa
                </p>
              </div>
            )}

            {/* STEP: Reg number */}
            {step === "reg" && (
              <div>
                <button onClick={() => goToStep("method")} className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors mb-4">
                  <ChevronLeft className="w-3.5 h-3.5" /> Takaisin
                </button>
                <h2 className="text-xl font-black text-white mb-1 tracking-tight">
                  Syötä rekisterinumero
                </h2>
                <p className="text-sm text-white/50 mb-5">
                  Haemme autosi tiedot ja näytämme hinnan heti.
                </p>
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="ABC-123"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
                    className="w-full h-14 px-5 rounded-xl border-2 border-white/15 bg-white/5 text-white text-lg font-bold tracking-wider placeholder:text-white/20 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all text-center uppercase"
                  />
                </div>
                <Button
                  className="w-full h-12 rounded-xl text-base font-bold mt-4 bg-gradient-to-r from-primary to-primary/80 btn-glow"
                  disabled={regNumber.length < 3}
                  onClick={handleRegSubmit}
                >
                  Hae tiedot <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <button
                  onClick={() => { setIsManual(true); goToStep("manual-brand"); }}
                  className="w-full text-center text-xs text-white/40 hover:text-white/70 transition-colors mt-3 py-2"
                >
                  Syötä tiedot manuaalisesti →
                </button>
              </div>
            )}

            {/* STEP: Brand/Model/Year/Mileage selection */}
            {step === "manual-brand" && (
              <div>
                <button onClick={() => goToStep(isManual ? "method" : "reg")} className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors mb-4">
                  <ChevronLeft className="w-3.5 h-3.5" /> Takaisin
                </button>
                <h2 className="text-lg font-black text-white mb-1 tracking-tight">
                  {brand ? (model ? "Vuosimalli ja kilometrit" : "Valitse malli") : "Valitse merkki"}
                </h2>
                <p className="text-sm text-white/50 mb-5">
                  {!brand ? "Aloita valitsemalla autosi merkki." : !model ? `${brand} – valitse malli.` : "Viimeiset tiedot – hinta hetken päässä."}
                </p>

                {/* Progressive reveal */}
                <div className="space-y-4">
                  {/* Brand */}
                  {!brand ? (
                    <div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          ref={inputRef}
                          type="text"
                          placeholder="Hae merkki..."
                          value={brandSearch}
                          onChange={(e) => setBrandSearch(e.target.value)}
                          className="w-full h-11 pl-10 pr-4 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm placeholder:text-white/25"
                        />
                      </div>
                      <div className="mt-2 max-h-48 overflow-y-auto rounded-xl border border-white/10 bg-white/5">
                        {brands.map((b) => (
                          <button
                            key={b}
                            onClick={() => handleBrandSelect(b)}
                            className="w-full text-left px-4 py-3 hover:bg-white/10 text-white text-sm transition-colors border-b border-white/5 last:border-0"
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : !model ? (
                    <div>
                      <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-primary/10 border border-primary/20">
                        <Car className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-white">{brand}</span>
                        <button onClick={() => { setBrand(""); setModel(""); setYear(null); setMileage(null); }} className="ml-auto text-xs text-white/40 hover:text-white/70">Vaihda</button>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          ref={inputRef}
                          type="text"
                          placeholder="Hae malli..."
                          value={modelSearch}
                          onChange={(e) => setModelSearch(e.target.value)}
                          className="w-full h-11 pl-10 pr-4 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm placeholder:text-white/25"
                        />
                      </div>
                      <div className="mt-2 max-h-48 overflow-y-auto rounded-xl border border-white/10 bg-white/5">
                        {models.map((m) => (
                          <button
                            key={m}
                            onClick={() => handleModelSelect(m)}
                            className="w-full text-left px-4 py-3 hover:bg-white/10 text-white text-sm transition-colors border-b border-white/5 last:border-0"
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-primary/10 border border-primary/20">
                        <Car className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-white">{brand} {model}</span>
                        <button onClick={() => { setModel(""); setYear(null); setMileage(null); }} className="ml-auto text-xs text-white/40 hover:text-white/70">Vaihda</button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-white/60 mb-1.5 block">Vuosimalli</label>
                          <select
                            ref={inputRef as any}
                            value={year || ""}
                            onChange={(e) => setYear(Number(e.target.value) || null)}
                            className="w-full h-11 px-3 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm appearance-none"
                          >
                            <option value="" className="bg-[#111827]">Valitse</option>
                            {years.map((y) => <option key={y} value={y} className="bg-[#111827]">{y}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-white/60 mb-1.5 block">Kilometrit</label>
                          <select
                            value={mileage || ""}
                            onChange={(e) => setMileage(Number(e.target.value) || null)}
                            className="w-full h-11 px-3 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm appearance-none"
                          >
                            <option value="" className="bg-[#111827]">Valitse</option>
                            <option value={15000} className="bg-[#111827]">0–30 000 km</option>
                            <option value={45000} className="bg-[#111827]">30–60 000 km</option>
                            <option value={80000} className="bg-[#111827]">60–100 000 km</option>
                            <option value={125000} className="bg-[#111827]">100–150 000 km</option>
                            <option value={175000} className="bg-[#111827]">150–200 000 km</option>
                            <option value={250000} className="bg-[#111827]">200–300 000 km</option>
                          </select>
                        </div>
                      </div>

                      {/* Eligibility feedback */}
                      {eligibility && (
                        <div className={`mt-4 rounded-xl p-3 flex items-start gap-3 text-sm ${
                          eligibility.status === "full" ? "bg-emerald-500/10 border border-emerald-500/20"
                          : eligibility.status === "limited" ? "bg-primary/10 border border-primary/20"
                          : "bg-red-500/10 border border-red-500/20"
                        }`}>
                          {eligibility.status === "rejected" ? (
                            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          )}
                          <span className="text-white/80 text-xs">
                            {eligibility.status === "full" && "✓ Autosi on kelpoinen – täysi turva saatavilla"}
                            {eligibility.status === "limited" && "Rajoitettu turva saatavilla"}
                            {eligibility.status === "rejected" && eligibility.reason}
                          </span>
                        </div>
                      )}

                      <Button
                        className="w-full h-12 rounded-xl text-base font-bold mt-5 bg-gradient-to-r from-primary to-primary/80 btn-glow"
                        disabled={!canShowPrice()}
                        onClick={handleShowPrice}
                      >
                        Näytä hinta <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP: Price reveal */}
            {step === "price" && pricingData && (
              <div>
                <button onClick={() => goToStep("manual-brand")} className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition-colors mb-4">
                  <ChevronLeft className="w-3.5 h-3.5" /> Muokkaa tietoja
                </button>

                {/* Vehicle tag */}
                <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <Car className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-white">{vehicleName} {vehicleYear}</span>
                </div>

                {/* Price hero */}
                <div className="text-center py-3">
                  <p className="text-sm text-white/50 mb-1">Jatkoturva tälle autolle</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-black text-white">{lowestMonthly}</span>
                    <span className="text-lg font-bold text-white/70">€ / kk</span>
                  </div>
                  <p className="text-sm text-white/40 mt-1">
                    tai {lowestYearly} € / vuosi
                  </p>
                </div>

                {/* Risk comparison */}
                <div className="my-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Tämä on pieni hinta verrattuna riskiin</p>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white/60">Akun korjaus</span>
                    <span className="text-sm font-black text-red-400">5 000 – 20 000 €</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">Jatkoturva</span>
                    <span className="text-sm font-black text-emerald-400">alk. {lowestMonthly} € / kk</span>
                  </div>
                </div>

                {/* Decision simplifier */}
                <p className="text-sm text-white/70 text-center mb-3 leading-relaxed">
                  Käytännössä maksat muutaman kympin kuussa, jotta vältät tuhansien eurojen riskin.
                </p>

                {/* Social proof */}
                <p className="text-xs text-center text-white/40 mb-2">
                  Suurin osa asiakkaista ottaa turvan ennen kuin ongelmia ilmenee.
                </p>

                {/* Loss aversion */}
                <p className="text-xs text-center text-red-400/60 mb-4">
                  Ilman turvaa kaikki kustannukset jäävät sinulle.
                </p>

                {/* Trust points */}
                <div className="flex flex-col gap-1.5 mb-4">
                  {["Ei piilokuluja", "Voimassa heti", "14 päivän peruutusoikeus"].map((t) => (
                    <div key={t} className="flex items-center gap-2 text-xs text-white/60">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>

                {/* Micro-urgency */}
                <p className="text-xs text-center text-white/30 italic mb-4">
                  Tämän voi hoitaa nyt – suoja alkaa heti maksun jälkeen.
                </p>

                {/* Actions */}
                <div className="space-y-2.5">
                  <Button
                    className="w-full h-13 rounded-xl text-base font-bold bg-gradient-to-r from-primary to-primary/80 btn-glow hover:scale-[1.02] transition-transform"
                    onClick={handleBuy}
                  >
                    Osta akkuturva <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full h-10 rounded-xl text-sm text-white/50 hover:text-white/80"
                    onClick={handleBuy}
                  >
                    Näytä mitä turva kattaa
                  </Button>
                </div>

                <p className="text-[10px] text-white/20 text-center mt-4">
                  ✔ maksa kuukausittain tai kerralla
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Exit confirmation overlay */}
      {showExitConfirm && (
        <>
          <div className="fixed inset-0 z-[60] bg-black/50" onClick={() => setShowExitConfirm(false)} />
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
            <div className="pointer-events-auto w-full max-w-sm rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-2xl text-center">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">
                Haluatko nähdä hinnan ennen poistumista?
              </h3>
              <p className="text-sm text-white/50 mb-5">
                Olet melkein perillä – hinta on hetken päässä.
              </p>
              <div className="space-y-2">
                <Button
                  className="w-full h-11 rounded-xl font-bold bg-gradient-to-r from-primary to-primary/80"
                  onClick={() => setShowExitConfirm(false)}
                >
                  Näytä hinta
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-10 rounded-xl text-sm text-white/40 hover:text-white/70"
                  onClick={() => { setShowExitConfirm(false); onClose(); }}
                >
                  Poistu
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PriceCalculatorModal;
