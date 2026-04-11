import { Button } from "@/components/ui/button";
import { Check, Star, ArrowRight } from "lucide-react";

interface PricingTiersSectionProps {
  onStartFlow: () => void;
}

const tiers = [
  {
    name: "12 kuukautta",
    price: "490 €",
    monthly: "41 €",
    limit: "6 000 €",
    limitLimited: "3 000 €",
    features: ["HV-akku turvattu", "Kapasiteetin heikkeneminen", "Sähkömoottori", "Latausjärjestelmä", "Akun jäähdytys"],
  },
  {
    name: "24 kuukautta",
    price: "830 €",
    monthly: "35 €",
    limit: "10 000 €",
    limitLimited: "4 000 €",
    features: ["Kaikki 12 kk:n edut", "Voimansiirto", "Jarru- ja ohjausjärjestelmä", "Turvalaitteet", "Lämmitys ja jäähdytys"],
    highlighted: true,
  },
  {
    name: "36 kuukautta",
    price: "1 130 €",
    monthly: "31 €",
    limit: "15 000 €",
    limitLimited: "5 000 €",
    features: ["Kaikki 24 kk:n edut", "Mukavuustoiminnot", "Paras hinta/kk", "Kattavin suoja", "Pisin turva-aika"],
  },
];

const PricingTiersSection = ({ onStartFlow }: PricingTiersSectionProps) => (
  <section id="turva" className="py-20 px-6 relative">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
    <div className="max-w-6xl mx-auto relative">
      <div className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 mb-4">
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
            className={`relative glass-card rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-4px] ${
              tier.highlighted
                ? "border-secondary/30 ring-1 ring-secondary/20 scale-[1.02] shadow-[0_20px_60px_rgba(34,211,238,0.1)]"
                : "hover:border-primary/30"
            }`}
          >
            {tier.highlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-secondary/20">
                <Star className="w-3 h-3" /> Suosituin
              </div>
            )}
            <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>

            {/* Monthly price – PRIMARY emphasis */}
            <p className="text-4xl font-black text-secondary mt-3">
              {tier.monthly}<span className="text-lg font-bold text-secondary/80"> / kk</span>
            </p>
            {/* Yearly price – secondary */}
            <p className="text-sm text-muted-foreground mt-1">
              tai {tier.price} kertamaksulla
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 mb-1">
              <Check className="w-3 h-3 text-secondary" /> maksa kuukausittain tai kerralla
            </p>

            <div className="h-px bg-border/50 my-4" />

            <p className="text-sm text-foreground/80 mb-1">Korvausraja jopa <strong className="text-foreground">{tier.limit}</strong></p>
            <p className="text-xs text-muted-foreground mb-5">Vanhemmille autoille: {tier.limitLimited}</p>

            <ul className="space-y-2.5 mb-8">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                  <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
            <Button
              className={`w-full h-12 rounded-xl font-bold transition-all duration-200 hover:scale-[1.02] ${
                tier.highlighted
                  ? "bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground btn-glow shadow-secondary/20"
                  : "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground btn-glow"
              }`}
              onClick={onStartFlow}
            >
              Osta akkuturva <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">Et sitoudu ennen maksua · Turva alkaa heti</p>
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
