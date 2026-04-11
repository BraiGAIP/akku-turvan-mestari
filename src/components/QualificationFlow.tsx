import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { getBrands, getModels, getYears, checkEligibility } from "@/data/evDatabase";
import { Shield, Search, AlertTriangle, Info, ArrowRight, ChevronLeft } from "lucide-react";

export interface VehicleData {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  isManualEntry: boolean;
}

interface Props {
  onComplete: (data: VehicleData) => void;
  onClose: () => void;
}

const QualificationFlow = ({ onComplete, onClose }: Props) => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number | null>(null);
  const [mileage, setMileage] = useState<number | null>(null);
  const [brandSearch, setBrandSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [showManual, setShowManual] = useState(false);
  const [manualBrand, setManualBrand] = useState("");
  const [manualModel, setManualModel] = useState("");
  const [manualYear, setManualYear] = useState("");
  const [manualMileage, setManualMileage] = useState("");

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

  const eligibility = useMemo(() => {
    if (year && mileage) return checkEligibility(year, mileage);
    return null;
  }, [year, mileage]);

  const canSubmit = brand && model && year && mileage && eligibility?.status !== "rejected";

  const handleSubmit = () => {
    if (canSubmit) {
      onComplete({ brand, model, year: year!, mileage: mileage!, isManualEntry: false });
    }
  };

  const handleManualSubmit = () => {
    const y = parseInt(manualYear);
    const m = parseInt(manualMileage);
    if (manualBrand && manualModel && y && m) {
      onComplete({ brand: manualBrand, model: manualModel, year: y, mileage: m, isManualEntry: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Top bar */}
      <div className="flex-shrink-0 px-6 py-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-extrabold text-foreground">AkkuTurva</span>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 overflow-y-auto py-8">
        <div className="w-full max-w-lg">
          {!showManual ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-2 tracking-tight">
                Tarkista hinta autollesi
              </h2>
              <p className="text-muted-foreground mb-6">
                Syötä autosi tiedot ja saat tarjouksen heti.
              </p>

              <div className="space-y-4">
                {/* Brand */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Merkki</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Hae merkki..."
                      value={brandSearch || brand}
                      onChange={(e) => {
                        setBrandSearch(e.target.value);
                        setBrand("");
                        setModel("");
                        setYear(null);
                      }}
                      className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm"
                    />
                  </div>
                  {brandSearch && brands.length > 0 && (
                    <div className="mt-1 max-h-36 overflow-y-auto rounded-lg border border-border bg-card shadow-md z-10 relative">
                      {brands.map((b) => (
                        <button
                          key={b}
                          onClick={() => { setBrand(b); setBrandSearch(""); setModel(""); setYear(null); setModelSearch(""); }}
                          className="w-full text-left px-4 py-2.5 hover:bg-muted text-foreground text-sm transition-colors first:rounded-t-lg last:rounded-b-lg"
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Model */}
                {brand && (
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1.5 block">Malli</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Hae malli..."
                        value={modelSearch || model}
                        onChange={(e) => { setModelSearch(e.target.value); setModel(""); setYear(null); }}
                        className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm"
                      />
                    </div>
                    {modelSearch && models.length > 0 && (
                      <div className="mt-1 max-h-36 overflow-y-auto rounded-lg border border-border bg-card shadow-md z-10 relative">
                        {models.map((m) => (
                          <button
                            key={m}
                            onClick={() => { setModel(m); setModelSearch(""); setYear(null); }}
                            className="w-full text-left px-4 py-2.5 hover:bg-muted text-foreground text-sm transition-colors first:rounded-t-lg last:rounded-b-lg"
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Year + Mileage */}
                {model && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-1.5 block">Vuosimalli</label>
                      <select
                        value={year || ""}
                        onChange={(e) => setYear(Number(e.target.value) || null)}
                        className="w-full h-11 px-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm appearance-none"
                      >
                        <option value="">Valitse</option>
                        {years.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-1.5 block">Kilometrit</label>
                      <select
                        value={mileage || ""}
                        onChange={(e) => setMileage(Number(e.target.value) || null)}
                        className="w-full h-11 px-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm appearance-none"
                      >
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
                  <div
                    className={`rounded-lg p-4 flex items-start gap-3 text-sm ${
                      eligibility.status === "full"
                        ? "bg-secondary/10 border border-secondary/20"
                        : eligibility.status === "limited"
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-destructive/10 border border-destructive/20"
                    }`}
                  >
                    {eligibility.status === "rejected" ? (
                      <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                    )}
                    <div>
                      {eligibility.status === "full" && (
                        <>
                          <p className="font-semibold text-foreground">✓ Autosi on kelpoinen – täysi turva saatavilla</p>
                          <p className="text-xs text-muted-foreground mt-1">Korvausrajat jopa 15 000 €.</p>
                        </>
                      )}
                      {eligibility.status === "limited" && (
                        <>
                          <p className="font-semibold text-foreground">Rajoitettu turva saatavilla</p>
                          <p className="text-xs text-muted-foreground mt-1">Korvausrajat 3 000–5 000 € auton iän tai kilometrien vuoksi.</p>
                        </>
                      )}
                      {eligibility.status === "rejected" && (
                        <>
                          <p className="font-semibold text-destructive">Autosi ei valitettavasti täytä ehtoja</p>
                          <p className="text-xs text-muted-foreground mt-1">{eligibility.reason}</p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-8 space-y-3">
                <Button
                  className="w-full h-12 rounded-xl text-base"
                  disabled={!canSubmit}
                  onClick={handleSubmit}
                >
                  Näytä hinnat <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
                <button
                  onClick={() => setShowManual(true)}
                  className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Etkö löydä autoasi? Syötä tiedot manuaalisesti →
                </button>
              </div>
            </>
          ) : (
            /* Manual entry fallback */
            <>
              <button
                onClick={() => setShowManual(false)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ChevronLeft className="w-4 h-4" /> Takaisin hakuun
              </button>
              <h2 className="text-2xl font-black text-foreground mb-2 tracking-tight">
                Syötä auton tiedot manuaalisesti
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Emme löytäneet autoasi tietokannastamme – arvioimme hinnan syöttämiesi tietojen perusteella.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Merkki</label>
                  <input
                    type="text"
                    value={manualBrand}
                    onChange={(e) => setManualBrand(e.target.value)}
                    placeholder="esim. Tesla"
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Malli</label>
                  <input
                    type="text"
                    value={manualModel}
                    onChange={(e) => setManualModel(e.target.value)}
                    placeholder="esim. Model 3"
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1.5 block">Vuosimalli</label>
                    <input
                      type="number"
                      value={manualYear}
                      onChange={(e) => setManualYear(e.target.value)}
                      placeholder="2022"
                      className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1.5 block">Kilometrit</label>
                    <input
                      type="number"
                      value={manualMileage}
                      onChange={(e) => setManualMileage(e.target.value)}
                      placeholder="50000"
                      className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm"
                    />
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 text-xs text-muted-foreground">
                  <Info className="w-3.5 h-3.5 text-primary inline mr-1" />
                  Manuaalisesti syötetyn auton hinta on arvio. Lopullinen hinta vahvistetaan erikseen.
                </div>
              </div>

              <Button
                className="w-full h-12 rounded-xl text-base mt-6"
                disabled={!manualBrand || !manualModel || !manualYear || !manualMileage}
                onClick={handleManualSubmit}
              >
                Näytä arviohinnat <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QualificationFlow;
