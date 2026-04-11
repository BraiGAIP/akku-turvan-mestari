import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CoverageTier, calculatePricing, getEVData } from "@/data/evDatabase";
import type { QualificationData } from "@/components/QualificationFlow";
import { Shield, Check, AlertTriangle, Clock, ArrowRight, Zap, Star, ArrowLeft } from "lucide-react";

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
          <div className="w-24 h-24 mx-auto mb-8 rounded-3xl gradient-hero flex items-center justify-center animate-pulse-glow">
            <Shield className="w-12 h-12 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-black text-foreground mb-3">Lasketaan tarjousta...</h2>
          <p className="text-muted-foreground text-lg">{data.brand} {data.model} {data.year}</p>
          <div className="mt-8 w-48 h-1.5 rounded-full bg-muted mx-auto overflow-hidden">
            <div className="h-full rounded-full gradient-hero animate-shimmer" />
          </div>
        </div>
      </div>
    );
  }

  if (!tiers) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="text-center max-w-md animate-slide-up glass-strong rounded-3xl p-10 shadow-premium-lg">
          <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-6" />
          <h2 className="text-2xl font-black text-foreground mb-3">Autosi ei valitettavasti täytä ehtoja</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Auton ikä tai ajokilometrit ylittävät turvasuunnitelman rajat. Ota yhteyttä, niin katsotaan vaihtoehdot.
          </p>
          <Button variant="hero" className="h-12 px-8 rounded-xl" onClick={onBack}>Kokeile toista autoa</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-6 animate-fade-in">
          <ArrowLeft className="w-4 h-4" /> Tarkista toinen auto
        </button>

        {/* Urgency banner */}
        <div className="mb-8 animate-fade-up rounded-2xl gradient-hero p-5 flex items-center gap-4 text-primary-foreground shadow-premium-lg">
          <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-base">Tarjous voimassa 24 tuntia</span>
            <p className="text-sm text-primary-foreground/80">{data.brand} {data.model} {data.year}</p>
          </div>
        </div>

        {/* Cost comparison */}
        <div className="mb-10 animate-fade-up-delay glass-strong rounded-3xl p-8 shadow-premium-lg">
          <h3 className="font-bold text-xl text-foreground mb-5">Tiedätkö, mitä akun vaihto maksaa?</h3>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <p className="text-sm text-muted-foreground mb-1">Akun vaihto ilman suojaa</p>
              <p className="text-4xl font-black text-destructive">{evData?.avgReplacementCost?.toLocaleString("fi-FI")} €</p>
            </div>
            <div className="hidden md:flex w-12 h-12 rounded-full bg-muted items-center justify-center">
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <p className="text-sm text-muted-foreground mb-1">AkkuTurva-suojalla alkaen</p>
              <p className="text-4xl font-black text-secondary">{tiers[0].price} €</p>
            </div>
          </div>
          <div className="mt-5 p-4 rounded-xl bg-secondary/10 border border-secondary/20">
            <p className="text-sm text-foreground font-medium">
              💡 Säästä jopa <span className="font-bold text-secondary">{((evData?.avgReplacementCost || 10000) - tiers[0].price).toLocaleString("fi-FI")} €</span> odottamattomilta kuluilta.
            </p>
          </div>
        </div>

        {/* Financing toggle */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-up-delay-2">
          <span className={`text-sm font-semibold transition-colors duration-300 ${!showFinancing ? "text-foreground" : "text-muted-foreground"}`}>Kertamaksu</span>
          <button
            onClick={() => setShowFinancing(!showFinancing)}
            className={`relative w-14 h-7 rounded-full transition-all duration-300 ${showFinancing ? "gradient-hero" : "bg-muted"}`}
          >
            <div className={`absolute top-1 w-5 h-5 rounded-full bg-primary-foreground shadow-md transition-transform duration-300 ${showFinancing ? "translate-x-8" : "translate-x-1"}`} />
          </button>
          <span className={`text-sm font-semibold transition-colors duration-300 ${showFinancing ? "text-foreground" : "text-muted-foreground"}`}>Rahoitus (24 kk)</span>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {tiers.map((tier, i) => (
            <div
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`relative glass-strong rounded-3xl p-7 cursor-pointer transition-all duration-500 hover:-translate-y-2 ${
                tier.highlighted ? "ring-2 ring-primary shadow-premium-lg scale-[1.02]" : "shadow-premium hover:shadow-premium-lg"
              } ${selectedTier === tier.id ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 gradient-hero text-primary-foreground text-xs font-bold px-5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Star className="w-3.5 h-3.5" /> Suosituin
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-1">{tier.name}</h3>
              <p className="text-sm text-muted-foreground mb-5">{tier.coverage} · {tier.duration}</p>
              
              <div className="mb-6">
                {showFinancing ? (
                  <div>
                    <span className="text-4xl font-black text-foreground">{tier.monthlyPrice} €</span>
                    <span className="text-muted-foreground text-sm ml-1">/kk</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-4xl font-black text-foreground">{tier.price} €</span>
                    <span className="text-muted-foreground text-sm ml-1">kertamaksu</span>
                  </div>
                )}
              </div>

              <ul className="space-y-2.5 mb-8">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.highlighted ? "hero" : "outline"}
                className="w-full h-12 rounded-xl"
              >
                Valitse {tier.name}
              </Button>
            </div>
          ))}
        </div>

        {/* Trust */}
        <div className="text-center space-y-4 animate-fade-up-delay-2">
          <div className="flex items-center justify-center gap-8 flex-wrap text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-secondary" /> 14 päivän peruutusoikeus</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-primary" /> Yhteistyössä Fragus</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-secondary" /> Yli 10 000 suojattua autoa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingResult;
