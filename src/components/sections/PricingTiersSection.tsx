import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

interface PricingTiersSectionProps {
  onStartFlow: () => void;
}

const tiers = [
  {
    name: "12 kuukautta",
    price: "alk. 490 €",
    limit: "6 000 €",
    limitLimited: "3 000 €",
    features: ["HV-akku turvattu", "Kapasiteetin heikkeneminen", "Sähkömoottori", "Latausjärjestelmä", "Akun jäähdytys"],
  },
  {
    name: "24 kuukautta",
    price: "alk. 830 €",
    limit: "10 000 €",
    limitLimited: "4 000 €",
    features: ["Kaikki 12 kk:n edut", "Voimansiirto", "Jarru- ja ohjausjärjestelmä", "Turvalaitteet", "Lämmitys ja jäähdytys"],
    highlighted: true,
  },
  {
    name: "36 kuukautta",
    price: "alk. 1 130 €",
    limit: "15 000 €",
    limitLimited: "5 000 €",
    features: ["Kaikki 24 kk:n edut", "Mukavuustoiminnot", "Paras hinta/kk", "Kattavin suoja", "Pisin turva-aika"],
  },
];

const PricingTiersSection = ({ onStartFlow }: PricingTiersSectionProps) => (
  <section id="turva" className="py-20 px-6 bg-muted/30">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 mb-4">
          Turvatasot
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">Valitse turva-aika</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Pidempi sopimus = suurempi korvausraja ja parempi hinta per kuukausi.
          14 päivän peruutusoikeus.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative bg-card rounded-2xl border p-8 transition-all duration-300 hover:shadow-lg ${
              tier.highlighted ? "border-primary ring-1 ring-primary shadow-md scale-[1.02]" : "border-border shadow-sm hover:border-primary/30"
            }`}
          >
            {tier.highlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1.5">
                <Star className="w-3 h-3" /> Suosituin
              </div>
            )}
            <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
            <p className="text-3xl font-black text-foreground mt-3">{tier.price}</p>
            <p className="text-sm text-muted-foreground mb-1">Korvausraja jopa {tier.limit}</p>
            <p className="text-xs text-muted-foreground mb-6">Vanhemmille autoille: {tier.limitLimited}</p>
            <ul className="space-y-2.5 mb-8">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
            <Button
              variant={tier.highlighted ? "default" : "outline"}
              className={`w-full h-11 rounded-xl ${tier.highlighted ? "shadow-lg shadow-primary/20" : ""}`}
              onClick={onStartFlow}
            >
              Selvitä hinta
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">Et sitoudu ostamaan</p>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-8">
        Lopullinen hinta määräytyy auton iän, kilometrien ja kunnon mukaan · Perustuu Fraguksen virallisiin ehtoihin
      </p>
    </div>
  </section>
);

export default PricingTiersSection;
