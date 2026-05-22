import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Star, ArrowRight, Shield, BadgeCheck, Crown, Zap, Battery, Wrench, Car } from "lucide-react";
import { products } from "@/data/productData";
import type { Product } from "@/data/productData";

interface PricingTiersSectionProps {
  onStartFlow: () => void;
  onSelectProduct?: (productId: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  BadgeCheck,
  Crown,
  Zap,
  Battery,
  Wrench,
  Car,
};

const filters = [
  { key: "all", label: "Kaikki" },
  { key: "cars", label: "Autot" },
  { key: "electric", label: "Sähköautot" },
  { key: "motorcycle", label: "Moottoripyörät" },
  { key: "motorhome", label: "Matkailuajoneuvot" },
] as const;

function getFilterKey(product: Product): string[] {
  const keys: string[] = [];
  const vt = product.vehicleTypes;
  if (vt.includes("Bensiini") || vt.includes("Diesel") || vt.includes("Hybridi") || vt.includes("Premium")) {
    keys.push("cars");
  }
  if (vt.includes("Sähkö") || vt.includes("Ladattava hybridi")) {
    keys.push("electric");
  }
  if (vt.includes("Moottoripyörä")) {
    keys.push("motorcycle");
  }
  if (vt.includes("Matkailuauto") || vt.includes("Asuntovaunu")) {
    keys.push("motorhome");
  }
  return keys;
}

const PricingTiersSection = ({ onStartFlow, onSelectProduct }: PricingTiersSectionProps) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProducts = activeFilter === "all"
    ? products
    : products.filter((p) => getFilterKey(p).includes(activeFilter));

  const handleSelect = (product: Product) => {
    if (onSelectProduct) {
      onSelectProduct(product.id);
    } else {
      onStartFlow();
    }
  };

  return (
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

        {/* Filter row */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeFilter === f.key
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const IconComponent = iconMap[product.icon] || Shield;
            return (
              <div
                key={product.id}
                className={`relative glass-card rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-4px] ${
                  product.recommended
                    ? "ring-2 ring-primary scale-[1.02] shadow-[0_20px_60px_rgba(34,211,238,0.1)]"
                    : "hover:border-primary/30"
                }`}
              >
                {product.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-secondary/20">
                    <Star className="w-3 h-3" /> Suosituin
                  </div>
                )}

                {/* Product icon + name */}
                <div className="flex items-center gap-3 mb-2">
                  <IconComponent className={`w-6 h-6 ${product.color}`} />
                  <h3 className="text-xl font-bold text-foreground">{product.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{product.tagline}</p>

                {/* Monthly price – PRIMARY emphasis */}
                <p className="text-4xl font-black text-secondary mt-3">
                  {product.monthlyPrice}<span className="text-lg font-bold text-secondary/80"> €/kk</span>
                </p>
                {/* Full price – secondary */}
                <p className="text-sm text-muted-foreground mt-1">
                  tai {product.fullPrice} € kertamaksuna
                </p>

                <div className="h-px bg-border/50 my-4" />

                {/* Highlights */}
                <ul className="space-y-2.5 mb-8">
                  {product.highlights.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/90">
                      <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full h-12 rounded-xl font-bold transition-all duration-200 hover:scale-[1.02] ${
                    product.recommended
                      ? "bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground btn-glow shadow-secondary/20"
                      : "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground btn-glow"
                  }`}
                  onClick={() => handleSelect(product)}
                >
                  Valitse tämä turva <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Et sitoudu ennen maksua · Turva alkaa heti
                </p>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Lopullinen hinta määräytyy auton iän, kilometrien ja kunnon mukaan · Perustuu Fraguksen virallisiin ehtoihin
        </p>
      </div>
    </section>
  );
};

export default PricingTiersSection;
