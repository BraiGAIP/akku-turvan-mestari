import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";

interface CostBarProps {
  label: string;
  value: number;
  max: number;
  variant: "danger" | "success";
}

const CostBar = ({ label, value, max, variant }: CostBarProps) => (
  <div>
    <div className="flex justify-between items-end mb-2">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className={`text-2xl font-black ${variant === "danger" ? "text-destructive" : "text-secondary"}`}>
        {value.toLocaleString("fi-FI")} €
      </span>
    </div>
    <div className="h-3 rounded-full bg-muted overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ease-out ${
          variant === "danger" ? "bg-destructive/60" : "bg-gradient-to-r from-secondary to-secondary/70"
        }`}
        style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
      />
    </div>
  </div>
);

interface CostComparisonProps {
  onStartFlow: () => void;
}

/**
 * Vertaa tyypillisiä yllätyskorjauksia (kaikenlaiset autot, ei vain sähkö)
 * Jatkoturvan kuukausihintaan.
 */
const CostComparison = ({ onStartFlow }: CostComparisonProps) => (
  <section className="py-20 px-6 relative">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-destructive/3 blur-[100px]" />
    <div className="max-w-4xl mx-auto relative">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-destructive bg-destructive/10 mb-4">
          Tiesitkö?
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
          Yksi yllätyskorjaus maksaa enemmän kuin koko sopimuskausi
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Olipa kyseessä polttomoottori-, hybridi- tai sähköauto — kallein yksittäinen
          vika voi pyyhkiä vuosien säästöt. Jatkoturva siirtää riskin Fragukselle.
        </p>
      </div>
      <div className="glass-card rounded-2xl p-8 md:p-10">
        <div className="space-y-6">
          <CostBar label="Moottoriremontti — bensiini/diesel"        value={6500}  max={20000} variant="danger" />
          <CostBar label="Vaihteistovaurio — automaattivaihteisto"   value={4800}  max={20000} variant="danger" />
          <CostBar label="Sähköauton korkeajänniteakku"              value={12000} max={20000} variant="danger" />
          <CostBar label="Lataushybridin invertteri ja sähkömoottori" value={7500}  max={20000} variant="danger" />
          <div className="border-t border-border pt-6">
            <CostBar label="Jatkoturva 36 kk — kerralla alkaen" value={540} max={20000} variant="success" />
            <p className="text-secondary font-bold text-sm mt-2">eli alkaen 15 € kuukaudessa</p>
          </div>
        </div>
        <div className="mt-8 p-4 rounded-xl bg-secondary/5 border border-secondary/20 flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-foreground">Murto-osa yllätyskorjauksen hinnasta</p>
            <p className="text-sm text-muted-foreground mt-1">
              Jatkoturva kattaa Fraguksen virallisen sopimusehdon mukaiset osat — moottori,
              vaihteisto, voimansiirto, ohjainlaitteet ja sähköautoissa myös korkeajänniteakku.
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Button
            size="lg"
            className="h-14 px-10 rounded-full text-base font-bold bg-gradient-to-r from-primary to-primary/80 btn-glow hover:scale-[1.03] transition-all duration-200"
            onClick={onStartFlow}
          >
            Näe hinta autollesi <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
          <div className="mt-3 space-y-0.5">
            <p className="text-xs text-muted-foreground">✔ Et sitoudu ennen maksua</p>
            <p className="text-xs text-muted-foreground">✔ Voit maksaa kuukausittain</p>
            <p className="text-xs text-muted-foreground">✔ Vie alle 2 minuuttia</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CostComparison;
