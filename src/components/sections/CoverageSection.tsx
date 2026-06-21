import React from "react";
import { Shield, Crown, Zap, BadgeCheck, Check } from "lucide-react";
import { products } from "@/data/productData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Crown, Zap, BadgeCheck,
};

/**
 * Esittelee kaikki neljä Fragus-tuotetta ja niiden kattavuuden tasavertaisesti.
 * Korvaa aiemman pelkkä-sähköauto-näkymän.
 */
const CoverageSection = () => (
  <section className="py-20 px-6 relative">
    <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[120px]" />
    <div className="max-w-6xl mx-auto relative">
      <div className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 mb-4">
          Jatkoturvan tuotevalikoima
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
          Neljä turvatasoa — yksi sopii sinunkin autoosi
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Jatkoturva myy KOKO Fraguksen virallisen tuotevalikoiman: perinteisestä
          polttomoottoriautosta sähköautoon ja lataushybridiin. Jokaisen tuotteen
          kattavuus ja korjauskatto perustuvat Fraguksen virallisiin sopimusehtoihin.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {products.map((p) => {
          const Icon = iconMap[p.icon] ?? Shield;
          return (
            <div
              key={p.id}
              className="glass-card rounded-2xl p-6 hover:border-primary/30 hover:translate-y-[-2px] transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-muted/40 flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-6 h-6 ${p.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">{p.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {p.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{p.tagline}</p>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-foreground/90">
                    <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="border-t border-border/40 pt-3 text-xs text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                <span>
                  Korjauskatto 36 kk:{" "}
                  <strong className="text-foreground">
                    {p.repairCaps["36"].toLocaleString("fi-FI")} €
                  </strong>
                </span>
                <span>
                  Omavastuu:{" "}
                  <strong className="text-foreground">
                    {p.deductible === 0 ? "0 €" : `${p.deductible} € / vika`}
                  </strong>
                </span>
                <span>
                  Sopimuskaudet:{" "}
                  <strong className="text-foreground">12 / 24 / 36 kk</strong>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8">
        Korvaa tekniset viat ja rikkoutumiset — ei normaalia kulumista, kolareita
        eikä ennen sopimuksen alkua olleita vikoja · Perustuu Fraguksen virallisiin
        sopimusehtoihin
      </p>
    </div>
  </section>
);

export default CoverageSection;
