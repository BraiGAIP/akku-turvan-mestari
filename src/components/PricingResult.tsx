import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CoverageTier, calculatePricing, getEVData } from "@/data/evDatabase";
import type { QualificationData } from "@/components/QualificationFlow";
import { Shield, Check, AlertTriangle, Clock, ArrowRight, Zap, Star, ArrowLeft, Lock, CreditCard, FileText, ChevronDown, Award } from "lucide-react";

interface Props {
  data: QualificationData;
  onBack: () => void;
}

const PricingResult = ({ data, onBack }: Props) => {
  const [tiers, setTiers] = useState<CoverageTier[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showFinancing, setShowFinancing] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "klarna" | "svea">("card");

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

  const selected = tiers?.find(t => t.id === selectedTier);

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
            Auton ikä tai ajokilometrit ylittävät turvasuunnitelman rajat.
          </p>
          <Button variant="hero" className="h-12 px-8 rounded-xl" onClick={onBack}>Kokeile toista autoa</Button>
        </div>
      </div>
    );
  }

  if (showCheckout && selected) {
    return (
      <div className="min-h-screen bg-background pb-28">
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <button onClick={() => setShowCheckout(false)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Takaisin tarjoukseen
          </button>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Checkout form - 3 cols */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h2 className="text-3xl font-black text-foreground mb-1">Viimeistele tilaus</h2>
                <p className="text-muted-foreground">Muutama tieto ja turva on valmis.</p>
              </div>

              {/* Personal info */}
              <div className="glass-strong rounded-2xl p-6 shadow-premium space-y-4">
                <h3 className="font-bold text-foreground flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /> Yhteystiedot</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1 block">Etunimi</label>
                    <input type="text" autoComplete="given-name" className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1 block">Sukunimi</label>
                    <input type="text" autoComplete="family-name" className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Sähköposti</label>
                  <input type="email" autoComplete="email" defaultValue={data.email} className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Puhelinnumero</label>
                  <input type="tel" autoComplete="tel" defaultValue={data.phone} className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
                </div>
              </div>

              {/* Payment method */}
              <div className="glass-strong rounded-2xl p-6 shadow-premium space-y-4">
                <h3 className="font-bold text-foreground flex items-center gap-2"><CreditCard className="w-4 h-4 text-primary" /> Maksutapa</h3>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { id: "card" as const, label: "Korttimaksu", sub: "Visa / Mastercard" },
                    { id: "klarna" as const, label: "Klarna", sub: "Lasku tai osamaksu" },
                    { id: "svea" as const, label: "Svea", sub: "Rahoitus 6–36 kk" },
                  ]).map(pm => (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                        paymentMethod === pm.id
                          ? "border-primary bg-primary/5 glow-primary"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      <p className="font-bold text-foreground text-sm">{pm.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{pm.sub}</p>
                    </button>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1 block">Korttinumero</label>
                      <input type="text" autoComplete="cc-number" placeholder="1234 5678 9012 3456" className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-1 block">Voimassaolo</label>
                        <input type="text" autoComplete="cc-exp" placeholder="MM/VV" className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-1 block">CVC</label>
                        <input type="text" autoComplete="cc-csc" placeholder="123" className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "klarna" && (
                  <div className="p-4 rounded-xl bg-muted/50 text-sm text-muted-foreground">
                    Sinut ohjataan Klarnan turvalliseen maksuympäristöön tilauksen vahvistamisen jälkeen. Voit valita laskun tai osamaksun.
                  </div>
                )}

                {paymentMethod === "svea" && (
                  <div className="p-4 rounded-xl bg-muted/50 text-sm text-muted-foreground">
                    Svea-rahoitus 6–36 kuukauden maksuajalla. Luottopäätös tehdään automaattisesti. Korko alk. 4,9 %.
                  </div>
                )}
              </div>

              {/* Refund policy */}
              <div className="glass rounded-2xl p-5 flex items-start gap-3">
                <Shield className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground text-sm">14 päivän peruutusoikeus</p>
                  <p className="text-xs text-muted-foreground mt-1">Voit peruuttaa tilauksen 14 päivän sisällä ilman syytä ja saat täyden hyvityksen. Kuluttajansuojalain mukainen.</p>
                </div>
              </div>
            </div>

            {/* Order summary - 2 cols */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-20 glass-strong rounded-2xl p-6 shadow-premium-lg space-y-5">
                <h3 className="font-bold text-lg text-foreground">Tilausyhteenveto</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Auto</span>
                    <span className="font-semibold text-foreground">{data.brand} {data.model} {data.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kilometrit</span>
                    <span className="font-semibold text-foreground">{data.mileage?.toLocaleString("fi-FI")} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Turvataso</span>
                    <span className="font-semibold text-foreground">{selected.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kesto</span>
                    <span className="font-semibold text-foreground">{selected.duration}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Sisältää</p>
                  <ul className="space-y-2">
                    {selected.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  {showFinancing ? (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Kuukausierä (24 kk)</span>
                        <span className="font-black text-xl text-foreground">{selected.monthlyPrice} €/kk</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Kokonaishinta {selected.price} €</p>
                    </>
                  ) : (
                    <div className="flex justify-between items-end">
                      <span className="text-sm text-muted-foreground">Yhteensä</span>
                      <span className="font-black text-3xl text-foreground">{selected.price} €</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
                  <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL-suojattu</span>
                  <span className="flex items-center gap-1"><Award className="w-3 h-3" /> Fragus</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky checkout CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-border/50">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div className="hidden sm:block">
              <p className="font-black text-xl text-foreground">
                {showFinancing ? `${selected.monthlyPrice} €/kk` : `${selected.price} €`}
              </p>
              <p className="text-xs text-muted-foreground">{selected.name} · {selected.duration}</p>
            </div>
            <Button variant="hero" size="lg" className="h-14 px-10 rounded-full text-base flex-1 sm:flex-initial">
              Osta akkuturva nyt <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="max-w-6xl mx-auto px-6 pt-8">
        {/* Back */}
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-6 animate-fade-in">
          <ArrowLeft className="w-4 h-4" /> Tarkista toinen auto
        </button>

        {/* Urgency */}
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
        <div className="mb-8 animate-fade-up-delay glass-strong rounded-3xl p-8 shadow-premium-lg">
          <h3 className="font-bold text-xl text-foreground mb-5">Tiedätkö, mitä akun vaihto maksaa?</h3>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex-1 min-w-[180px]">
              <p className="text-sm text-muted-foreground mb-1">Ilman suojaa</p>
              <p className="text-4xl font-black text-destructive">{evData?.avgReplacementCost?.toLocaleString("fi-FI")} €</p>
            </div>
            <div className="hidden md:flex w-12 h-12 rounded-full bg-muted items-center justify-center">
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-[180px]">
              <p className="text-sm text-muted-foreground mb-1">AkkuTurva alkaen</p>
              <p className="text-4xl font-black text-secondary">{tiers[0].price} €</p>
            </div>
          </div>
          <div className="mt-5 p-4 rounded-xl bg-secondary/10 border border-secondary/20">
            <p className="text-sm text-foreground font-medium">
              💡 Säästä jopa <span className="font-bold text-secondary">{((evData?.avgReplacementCost || 10000) - tiers[0].price).toLocaleString("fi-FI")} €</span>
            </p>
          </div>
        </div>

        {/* Payment toggle */}
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
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {tiers.map((tier, i) => (
            <div
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`relative glass-strong rounded-3xl p-7 cursor-pointer transition-all duration-500 hover:-translate-y-2 ${
                tier.highlighted ? "ring-2 ring-primary shadow-premium-lg scale-[1.02]" : "shadow-premium hover:shadow-premium-lg"
              } ${selectedTier === tier.id ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
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
                    <p className="text-xs text-muted-foreground mt-1">tai {tier.price} € kertamaksu</p>
                  </div>
                ) : (
                  <div>
                    <span className="text-4xl font-black text-foreground">{tier.price} €</span>
                    <span className="text-muted-foreground text-sm ml-1">kertamaksu</span>
                    <p className="text-xs text-muted-foreground mt-1">tai {tier.monthlyPrice} €/kk (24 kk)</p>
                  </div>
                )}
              </div>

              <ul className="space-y-2.5 mb-6">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.highlighted ? "hero" : "outline"}
                className="w-full h-12 rounded-xl"
                onClick={(e) => { e.stopPropagation(); setSelectedTier(tier.id); setShowCheckout(true); }}
              >
                Valitse {tier.name}
              </Button>
            </div>
          ))}
        </div>

        {/* Payment options */}
        <div className="glass rounded-2xl p-5 mb-8 animate-fade-up-delay-2">
          <p className="text-sm font-semibold text-foreground mb-3">Maksuvaihtoehdot</p>
          <div className="flex items-center gap-6 flex-wrap text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-primary" /> Visa / Mastercard</span>
            <span className="flex items-center gap-2 font-bold text-foreground">Klarna</span>
            <span className="flex items-center gap-2 font-bold text-foreground">Svea</span>
            <span className="flex items-center gap-1.5 ml-auto"><Lock className="w-3.5 h-3.5 text-secondary" /> SSL-suojattu</span>
          </div>
        </div>

        {/* Trust */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-8 flex-wrap text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-secondary" /> 14 päivän peruutusoikeus</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-primary" /> Yhteistyössä Fragus</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-secondary" /> Yli 10 000 suojattua autoa</span>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-border/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            {selected && (
              <>
                <p className="font-black text-xl text-foreground">
                  {showFinancing ? `${selected.monthlyPrice} €/kk` : `${selected.price} €`}
                </p>
                <p className="text-xs text-muted-foreground">{selected.name} · {selected.duration}</p>
              </>
            )}
          </div>
          <Button
            variant="hero"
            size="lg"
            className="h-14 px-10 rounded-full text-base flex-1 sm:flex-initial"
            onClick={() => setShowCheckout(true)}
            disabled={!selectedTier}
          >
            Osta akkuturva nyt <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingResult;
