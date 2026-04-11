import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CoverageTier, calculatePricing, getEVData } from "@/data/evDatabase";
import { QualificationData } from "@/components/QualificationFlow";
import { Shield, Check, AlertTriangle, Clock, ArrowRight, Zap } from "lucide-react";

interface Props {
  data: QualificationData;
  onBack: () => void;
}

const PricingResult = ({ data, onBack }: Props) => {
  const [tiers, setTiers] = useState<CoverageTier[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showFinancing, setShowFinancing] = useState(false);

  const evData = getEVData(data.brand, data.model);

  useEffect(() => {
    const timer = setTimeout(() => {
      const result = calculatePricing(data.brand, data.model, data.year!, data.mileage!);
      setTiers(result);
      setLoading(false);
      if (result) setSelectedTier("premium");
    }, 1500);
    return () => clearTimeout(timer);
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center animate-fade-up">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-hero flex items-center justify-center animate-pulse-glow">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Lasketaan tarjousta...</h2>
          <p className="text-muted-foreground">{data.brand} {data.model} {data.year}</p>
        </div>
      </div>
    );
  }

  if (!tiers) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center max-w-md animate-fade-up">
          <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Autosi ei valitettavasti täytä ehtoja</h2>
          <p className="text-muted-foreground mb-6">
            Auton ikä tai ajokilometrit ylittävät turvasuunnitelman rajat. Ota yhteyttä, niin katsotaan vaihtoehdot.
          </p>
          <Button variant="hero" className="h-12 px-8" onClick={onBack}>Kokeile toista autoa</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Urgency banner */}
        <div className="mb-6 animate-fade-up rounded-xl gradient-hero p-4 flex items-center gap-3 text-primary-foreground">
          <Clock className="w-5 h-5 flex-shrink-0" />
          <span className="font-semibold text-sm">Tarjous voimassa 24 tuntia – {data.brand} {data.model} {data.year}</span>
        </div>

        {/* Cost comparison */}
        <div className="mb-8 animate-fade-up-delay rounded-xl bg-card border border-border p-6">
          <h3 className="font-bold text-lg text-foreground mb-3">Tiedätkö, mitä akun vaihto maksaa?</h3>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <p className="text-sm text-muted-foreground">Akun vaihto ilman suojaa</p>
              <p className="text-3xl font-black text-destructive">{evData?.avgReplacementCost?.toLocaleString("fi-FI")} €</p>
            </div>
            <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
            <div className="flex-1 min-w-[200px]">
              <p className="text-sm text-muted-foreground">AkkuTurva-suojalla alkaen</p>
              <p className="text-3xl font-black text-secondary">{tiers[0].price} €</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Säästä jopa <span className="font-bold text-secondary">{((evData?.avgReplacementCost || 10000) - tiers[0].price).toLocaleString("fi-FI")} €</span> odottamattomilta kuluilta.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {tiers.map((tier, i) => (
            <div
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`relative rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 ${
                tier.highlighted ? "border-primary glow-primary scale-[1.02]" : "border-border hover:border-primary/50"
              } ${selectedTier === tier.id ? "ring-2 ring-primary ring-offset-2" : ""} bg-card`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-hero text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Suosituin
                </div>
              )}
              <h3 className="text-xl font-bold text-foreground mb-1">{tier.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{tier.coverage} · {tier.duration}</p>
              
              <div className="mb-4">
                {showFinancing ? (
                  <div>
                    <span className="text-3xl font-black text-foreground">{tier.monthlyPrice} €</span>
                    <span className="text-muted-foreground text-sm">/kk</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-3xl font-black text-foreground">{tier.price} €</span>
                    <span className="text-muted-foreground text-sm"> kertamaksu</span>
                  </div>
                )}
              </div>

              <ul className="space-y-2 mb-6">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.highlighted ? "hero" : "outline"}
                className="w-full h-11"
              >
                Valitse {tier.name}
              </Button>
            </div>
          ))}
        </div>

        {/* Financing toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={`text-sm font-medium ${!showFinancing ? "text-foreground" : "text-muted-foreground"}`}>Kertamaksu</span>
          <button
            onClick={() => setShowFinancing(!showFinancing)}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${showFinancing ? "bg-primary" : "bg-muted"}`}
          >
            <div className={`absolute top-1 w-5 h-5 rounded-full bg-card shadow transition-transform duration-300 ${showFinancing ? "translate-x-8" : "translate-x-1"}`} />
          </button>
          <span className={`text-sm font-medium ${showFinancing ? "text-foreground" : "text-muted-foreground"}`}>Rahoitus (24 kk)</span>
        </div>

        {/* Trust */}
        <div className="text-center space-y-3 animate-fade-up-delay-2">
          <div className="flex items-center justify-center gap-6 flex-wrap text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-secondary" /> 14 päivän peruutusoikeus</span>
            <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-primary" /> Yhteistyössä Fragus</span>
            <span className="flex items-center gap-1"><Check className="w-4 h-4 text-secondary" /> Yli 10 000 suojattua autoa</span>
          </div>
          <button onClick={onBack} className="text-sm text-primary hover:underline">← Tarkista toinen auto</button>
        </div>
      </div>
    </div>
  );
};

export default PricingResult;
