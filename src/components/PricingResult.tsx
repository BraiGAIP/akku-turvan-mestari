import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CoverageTier, calculatePricing, getEVData, checkEligibility, repairLimits } from "@/data/evDatabase";
import type { VehicleData } from "@/components/QualificationFlow";
import { Shield, Check, AlertTriangle, ArrowRight, ArrowLeft, Lock, CreditCard, FileText, Battery, Wrench, Info, Zap, Calendar, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import StripeCheckout from "./StripeCheckout";

interface Props {
  data: VehicleData;
  onBack: () => void;
}

const PricingResult = ({ data, onBack }: Props) => {
  const [tiers, setTiers] = useState<CoverageTier[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [paymentOption, setPaymentOption] = useState<"full" | "monthly">("monthly");

  const evData = getEVData(data.brand, data.model);
  const eligibility = checkEligibility(data.year, data.mileage);
  const isLimited = eligibility.status === "limited";

  useEffect(() => {
    const timer = setTimeout(() => {
      const result = calculatePricing(data.brand, data.model, data.year, data.mileage);
      setTiers(result);
      setLoading(false);
      if (result) setSelectedTier("24kk");
    }, 800);
    return () => clearTimeout(timer);
  }, [data]);

  const selected = tiers?.find((t) => t.id === selectedTier);

  const handleOpenCheckout = async () => {
    if (!selected) return;
    setIsLoadingPayment(true);
    try {
      const { data: intentData, error } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          amount: selected.price,
          currency: 'eur',
          productName: `Jatkoturva - ${data.brand} ${data.model} (${selected.duration})`,
          customerEmail: '',
        },
      });
      if (error || intentData?.error) {
        console.error('Payment intent error:', error || intentData?.error);
      } else {
        setClientSecret(intentData.clientSecret);
        setShowStripeModal(true);
      }
    } catch (err) {
      console.error('Error creating payment intent:', err);
    } finally {
      setIsLoadingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary-foreground animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-foreground mb-2">Lasketaan hintaa...</h2>
          <p className="text-muted-foreground">{data.brand} {data.model} {data.year}</p>
          <div className="mt-6 w-40 h-1.5 rounded-full bg-muted mx-auto overflow-hidden">
            <div className="h-full rounded-full bg-primary animate-pulse w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!tiers) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="text-center max-w-md bg-card rounded-2xl border border-border p-10">
          <AlertTriangle className="w-14 h-14 text-destructive mx-auto mb-6" />
          <h2 className="text-2xl font-black text-foreground mb-3">Auto ei täytä ehtoja</h2>
          <p className="text-muted-foreground mb-6">
            Jatkoturva on saatavilla alle 20-vuotiaille autoille, joissa on alle 300 000 km.
          </p>
          <Button className="h-11 px-8 rounded-xl" onClick={onBack}>Kokeile toista autoa</Button>
        </div>
      </div>
    );
  }

  // MAIN PRICING VIEW (Step 2 – no lead gate)
  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Kokeile toista autoa
        </button>

        {/* Vehicle info bar */}
        <div className="mb-8 rounded-xl bg-card border border-border p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-bold text-foreground">{data.brand} {data.model} {data.year}</p>
            <p className="text-sm text-muted-foreground">{isLimited ? "Rajoitettu turva" : "Täysi GoSafe-turva"} · Hinta perustuu ajoneuvon tietoihin</p>
          </div>
          {data.isManualEntry && (
            <span className="ml-auto text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">Arvio</span>
          )}
        </div>

        {/* Cost comparison */}
        {evData && (
          <div className="mb-8 bg-card rounded-xl border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">Ilman suojaa vs. Jatkoturva</h3>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex-1 min-w-[160px]">
                <p className="text-sm text-muted-foreground mb-1">Tyypillinen yllätyskorjaus</p>
                <p className="text-3xl font-black text-destructive">{evData.avgReplacementCost.toLocaleString("fi-FI")} €</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />
              <div className="flex-1 min-w-[160px]">
                <p className="text-sm text-muted-foreground mb-1">Jatkoturva alkaen</p>
                <p className="text-3xl font-black text-secondary">{tiers[0].monthlyPrice} € / kk</p>
              </div>
            </div>
          </div>
        )}

        {/* Repair limits */}
        <div className="mb-8 bg-card rounded-xl border border-border p-6">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-primary" /> Korvausrajat sopimuskauden mukaan
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {repairLimits.map((rl) => (
              <div key={rl.months} className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-sm font-semibold text-muted-foreground mb-1">{rl.label}</p>
                <p className="text-xl font-black text-foreground">
                  {(isLimited ? rl.limitedLimit : rl.fullLimit).toLocaleString("fi-FI")} €
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Battery highlight */}
        <div className="mb-8 rounded-xl p-6 border-2 border-secondary/30 bg-secondary/5">
          <div className="flex items-start gap-4">
            <Battery className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-foreground mb-1">Kattaa myös akun kapasiteetin heikkenemisen</h3>
              <p className="text-sm text-muted-foreground">Korvaa, jos kapasiteetti laskee alle 70 % tai alenema ylittää 6 % / 12 kk.</p>
            </div>
          </div>
        </div>

        {/* Payment method selector */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 text-center">Valitse maksutapa</h3>
          <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
            <button
              onClick={() => setPaymentOption("full")}
              className={`relative text-left bg-card rounded-xl border-2 p-5 transition-all ${
                paymentOption === "full" ? "border-primary shadow-sm" : "border-border hover:border-primary/30"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground text-sm">Maksa kerralla</span>
              </div>
              <p className="text-xl font-black text-foreground">{selected?.price ?? tiers[0].price} €</p>
              <p className="text-xs text-muted-foreground mt-1">Yksi maksu, turva alkaa heti</p>
            </button>
            <button
              onClick={() => setPaymentOption("monthly")}
              className={`relative text-left bg-card rounded-xl border-2 p-5 transition-all ${
                paymentOption === "monthly" ? "border-primary shadow-sm" : "border-border hover:border-primary/30"
              }`}
            >
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                Suosituin
              </span>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground text-sm">Kuukausimaksu</span>
              </div>
              <p className="text-xl font-black text-foreground">{selected?.monthlyPrice ?? tiers[0].monthlyPrice} €/kk</p>
              <p className="text-xs text-muted-foreground mt-1">36 kuukautta · joustava</p>
            </button>
          </div>
        </div>

        {/* Tier cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {tiers.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`text-left bg-card rounded-xl border-2 p-6 transition-all ${
                selectedTier === tier.id ? "border-primary shadow-sm" : "border-border hover:border-primary/30"
              }`}
            >
              {tier.highlighted && (
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-3 inline-block">Suosituin</span>
              )}
              <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
              <p className="text-2xl font-black text-foreground mt-1">
                {paymentOption === "monthly" ? `${tier.monthlyPrice} €/kk` : `${tier.price} €`}
              </p>
              {paymentOption === "monthly" && <p className="text-xs text-muted-foreground">Kokonaishinta {tier.price} €</p>}
              <p className="text-sm text-muted-foreground mt-1">Korvausraja {tier.repairLimit.toLocaleString("fi-FI")} €</p>
              <ul className="mt-4 space-y-1.5">
                {tier.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mb-6">
          Lopullinen hinta määräytyy auton iän, kilometrien ja kunnon mukaan · Perustuu Fraguksen virallisiin sopimusehtoihin
        </p>

        {/* Persuasion block */}
        <div className="mb-8 bg-card rounded-xl border border-border p-6 space-y-5">
          <h3 className="text-lg font-black text-foreground text-center">
            Tämä on pieni hinta verrattuna mahdolliseen riskiin
          </h3>
          <div className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/10">
            <span className="text-sm text-muted-foreground">Tyypillinen yllätyskorjaus</span>
            <span className="text-sm font-black text-destructive">3 000 – 20 000 €</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/5 border border-secondary/10">
            <span className="text-sm text-muted-foreground">Jatkoturva</span>
            <span className="text-sm font-black text-secondary">alk. {selected?.monthlyPrice ?? tiers[0].monthlyPrice} € / kk</span>
          </div>
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            Käytännössä maksat muutaman kympin kuussa, jotta vältät tuhansien eurojen riskin.
          </p>
          <p className="text-xs text-muted-foreground/70 text-center">
            Suurin osa asiakkaista ottaa turvan ennen kuin ongelmia ilmenee.
          </p>
          <p className="text-xs text-destructive/60 text-center">
            Ilman turvaa kaikki kustannukset jäävät sinulle.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-secondary" /> Turvallinen maksu</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-secondary" /> 14 pv peruutusoikeus</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-secondary" /> Ei piilokuluja</span>
          </div>
          <p className="text-xs text-center text-muted-foreground/50">
            Tämän voi hoitaa nyt – suoja alkaa heti maksun jälkeen.
          </p>
        </div>

        {/* Stripe Checkout Dialog */}
        <Dialog open={showStripeModal} onOpenChange={setShowStripeModal}>
          <DialogContent className="sm:max-w-lg bg-card border-border">
            <DialogHeader>
              <DialogTitle className="sr-only">Maksu</DialogTitle>
            </DialogHeader>
            {clientSecret ? (
              <StripeCheckout
                amount={selected?.price ?? 0}
                productName={`Jatkoturva - ${data.brand} ${data.model} (${selected?.duration ?? ''})`}
                clientSecret={clientSecret}
                onSuccess={() => {
                  setShowStripeModal(false);
                  setClientSecret(null);
                }}
                onCancel={() => {
                  setShowStripeModal(false);
                  setClientSecret(null);
                }}
              />
            ) : (
              <div className="p-6 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Ladataan maksuikkunaa...</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-t border-border/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {selected && (
            <div className="hidden sm:block">
              <p className="font-black text-lg text-foreground">{paymentOption === "monthly" ? `${selected.monthlyPrice} €/kk` : `${selected.price} €`}</p>
              <p className="text-xs text-muted-foreground">{selected.duration} · {data.brand} {data.model}</p>
            </div>
          )}
          <div className="flex flex-col items-center sm:items-end gap-1 flex-1 sm:flex-initial">
            <Button
              size="lg"
              className="h-13 px-10 rounded-full text-base"
              disabled={!selectedTier || isLoadingPayment}
              onClick={handleOpenCheckout}
            >
              {isLoadingPayment ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Ladataan...
                </>
              ) : paymentOption === "monthly" ? (
                <>Aloita — vain {selected?.monthlyPrice} €/kk <ArrowRight className="w-5 h-5 ml-1" /></>
              ) : (
                <>Osta nyt — {selected?.price} € <ArrowRight className="w-5 h-5 ml-1" /></>
              )}
            </Button>
            <p className="text-[10px] text-muted-foreground flex items-center gap-2">
              <Lock className="w-3 h-3" />
              Et sitoudu ennen maksua · Turva alkaa heti · Peruuta koska tahansa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingResult;
