import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CoverageTier, calculatePricing, getEVData, checkEligibility, repairLimits } from "@/data/evDatabase";
import type { VehicleData } from "@/components/QualificationFlow";
import { Shield, Check, AlertTriangle, ArrowRight, ArrowLeft, Lock, CreditCard, FileText, Battery, Wrench, Info } from "lucide-react";

interface Props {
  data: VehicleData;
  onBack: () => void;
}

const PricingResult = ({ data, onBack }: Props) => {
  const [tiers, setTiers] = useState<CoverageTier[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showFinancing, setShowFinancing] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "klarna" | "svea">("card");
  const [termsAccepted, setTermsAccepted] = useState(false);

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

  // CHECKOUT VIEW
  if (showCheckout && selected) {
    return (
      <div className="min-h-screen bg-background pb-28">
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <button onClick={() => setShowCheckout(false)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Takaisin tarjoukseen
          </button>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div>
                <h2 className="text-2xl font-black text-foreground mb-1">Viimeistele tilaus</h2>
                <p className="text-muted-foreground text-sm">Vielä muutama tieto – turva alkaa heti.</p>
              </div>

              {/* Contact info */}
              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /> Yhteystiedot</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1 block">Etunimi</label>
                    <input type="text" autoComplete="given-name" className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground mb-1 block">Sukunimi</label>
                    <input type="text" autoComplete="family-name" className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Sähköposti</label>
                  <input type="email" autoComplete="email" className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Puhelinnumero</label>
                  <input type="tel" autoComplete="tel" className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm" />
                </div>

                {/* Customer type */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Asiakastyyppi</label>
                  <select className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm appearance-none">
                    <option value="private">Yksityishenkilö</option>
                    <option value="business">Yritys</option>
                  </select>
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2"><CreditCard className="w-4 h-4 text-primary" /> Maksutapa</h3>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { id: "card" as const, label: "Korttimaksu", sub: "Visa / Mastercard" },
                    { id: "klarna" as const, label: "Klarna", sub: "Lasku tai osamaksu" },
                    { id: "svea" as const, label: "Svea", sub: "Rahoitus 6–36 kk" },
                  ]).map((pm) => (
                    <button key={pm.id} onClick={() => setPaymentMethod(pm.id)}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        paymentMethod === pm.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                      }`}>
                      <p className="font-semibold text-foreground text-sm">{pm.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{pm.sub}</p>
                    </button>
                  ))}
                </div>
                {paymentMethod === "card" && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground mb-1 block">Korttinumero</label>
                      <input type="text" autoComplete="cc-number" placeholder="1234 5678 9012 3456" className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-1 block">Voimassaolo</label>
                        <input type="text" autoComplete="cc-exp" placeholder="MM/VV" className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground mb-1 block">CVC</label>
                        <input type="text" autoComplete="cc-csc" placeholder="123" className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-sm" />
                      </div>
                    </div>
                  </div>
                )}
                {paymentMethod === "klarna" && (
                  <p className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">Sinut ohjataan Klarnan turvalliseen maksuympäristöön tilauksen vahvistamisen jälkeen.</p>
                )}
                {paymentMethod === "svea" && (
                  <p className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">Svea-rahoitus 6–36 kuukauden maksuajalla. Korko alk. 4,9 %.</p>
                )}
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer p-4 rounded-lg border border-border bg-card">
                <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-input text-primary" />
                <span className="text-sm text-muted-foreground">
                  Hyväksyn <a href="/kayttoehdot" target="_blank" className="text-primary hover:underline">käyttöehdot</a> ja{" "}
                  <a href="/tietosuoja" target="_blank" className="text-primary hover:underline">tietosuojaselosteen</a>.
                  Ymmärrän, että minulla on 14 päivän peruutusoikeus.
                </span>
              </label>

              <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20 flex items-start gap-3">
                <Shield className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm">14 päivän peruutusoikeus</p>
                  <p className="text-xs text-muted-foreground mt-1">Voit peruuttaa tilauksen 14 päivän sisällä ilman syytä.</p>
                </div>
              </div>
            </div>

            {/* Order summary sidebar */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-8 bg-card rounded-xl border border-border p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Tilausyhteenveto</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Auto</span><span className="font-semibold text-foreground">{data.brand} {data.model} {data.year}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Turva-aika</span><span className="font-semibold text-foreground">{selected.duration}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Korvausraja</span><span className="font-semibold text-foreground">{selected.repairLimit.toLocaleString("fi-FI")} €</span></div>
                  {isLimited && <div className="flex justify-between"><span className="text-muted-foreground">Turvatyyppi</span><span className="font-semibold text-primary">Rajoitettu</span></div>}
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Sisältää</p>
                  <ul className="space-y-1.5">
                    {selected.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground"><Check className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" /> {f}</li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-border pt-4">
                  {showFinancing ? (
                    <div className="flex justify-between items-end"><span className="text-sm text-muted-foreground">Kuukausierä</span><span className="font-black text-xl text-foreground">{selected.monthlyPrice} €/kk</span></div>
                  ) : (
                    <div className="flex justify-between items-end"><span className="text-sm text-muted-foreground">Yhteensä</span><span className="font-black text-2xl text-foreground">{selected.price} €</span></div>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground">Perustuu Fraguksen virallisiin sopimusehtoihin · Ei piilokuluja</p>
                {data.isManualEntry && (
                  <p className="text-[10px] text-primary flex items-center gap-1"><Info className="w-3 h-3" /> Arvio – lopullinen hinta vahvistetaan erikseen</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-t border-border/50">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <div className="hidden sm:block">
              <p className="font-black text-lg text-foreground">{showFinancing ? `${selected.monthlyPrice} €/kk` : `${selected.price} €`}</p>
              <p className="text-xs text-muted-foreground">{selected.duration} · Korvausraja {selected.repairLimit.toLocaleString("fi-FI")} €</p>
            </div>
            <Button size="lg" className="h-13 px-10 rounded-full text-base flex-1 sm:flex-initial" disabled={!termsAccepted}>
              Osta akkuturva nyt <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
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
                <p className="text-sm text-muted-foreground mb-1">Akun vaihto ilman suojaa</p>
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

        {/* Payment toggle */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className={`text-sm font-medium ${!showFinancing ? "text-foreground" : "text-muted-foreground"}`}>Kertamaksu</span>
          <button onClick={() => setShowFinancing(!showFinancing)}
            className={`relative w-12 h-6 rounded-full transition-colors ${showFinancing ? "bg-primary" : "bg-muted"}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-primary-foreground shadow transition-transform ${showFinancing ? "translate-x-7" : "translate-x-1"}`} />
          </button>
          <span className={`text-sm font-medium ${showFinancing ? "text-foreground" : "text-muted-foreground"}`}>Kuukausierä</span>
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
                {showFinancing ? `${tier.monthlyPrice} €/kk` : `${tier.price} €`}
              </p>
              {showFinancing && <p className="text-xs text-muted-foreground">Kokonaishinta {tier.price} €</p>}
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
            <span className="text-sm text-muted-foreground">Akun korjaus</span>
            <span className="text-sm font-black text-destructive">5 000 – 20 000 €</span>
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
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-t border-border/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          {selected && (
            <div className="hidden sm:block">
              <p className="font-black text-lg text-foreground">{showFinancing ? `${selected.monthlyPrice} €/kk` : `${selected.price} €`}</p>
              <p className="text-xs text-muted-foreground">{selected.duration} · {data.brand} {data.model}</p>
            </div>
          )}
          <Button
            size="lg"
            className="h-13 px-10 rounded-full text-base flex-1 sm:flex-initial"
            disabled={!selectedTier}
            onClick={() => setShowCheckout(true)}
          >
            Osta akkuturva nyt <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingResult;
