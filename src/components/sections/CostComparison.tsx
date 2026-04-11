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
          variant === "danger" ? "bg-destructive/70" : "bg-secondary"
        }`}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  </div>
);

interface CostComparisonProps {
  onStartFlow: () => void;
}

const CostComparison = ({ onStartFlow }: CostComparisonProps) => (
  <section className="py-20 px-6 relative">
    {/* Radial glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-primary/5 blur-[100px]" />
    <div className="max-w-4xl mx-auto relative">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-destructive bg-destructive/10 mb-4">
          Tiesitkö?
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
          Akun vaihto voi maksaa omaisuuden
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Sähköauton akku on auton kallein yksittäinen osa. Ilman suojaa korjauslasku voi yllättää.
        </p>
      </div>
      <div className="glass-card rounded-2xl p-8 md:p-10">
        <div className="space-y-6">
          <CostBar label="Tesla Model 3 – akun vaihto" value={12000} max={20000} variant="danger" />
          <CostBar label="BMW iX – akun vaihto" value={20000} max={20000} variant="danger" />
          <CostBar label="VW ID.4 – akun vaihto" value={13000} max={20000} variant="danger" />
          <div className="border-t border-border pt-6">
            <CostBar label="AkkuTurva – suoja alkaen" value={490} max={20000} variant="success" />
          </div>
        </div>
        <div className="mt-8 p-4 rounded-xl bg-secondary/5 border border-secondary/20 flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-foreground">Murto-osa akun vaihtokustannuksista</p>
            <p className="text-sm text-muted-foreground mt-1">
              AkkuTurva suojaa sähköautosi kriittisimmät osat ilman riskiä – 14 päivän peruutusoikeus.
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Button size="lg" className="h-13 px-10 rounded-full text-base bg-gradient-to-r from-primary to-primary/80 btn-glow" onClick={onStartFlow}>
            Selvitä hintasi 30 sekunnissa <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
          <p className="text-sm text-muted-foreground mt-3">Et sitoudu ostamaan – näet hinnan ensin</p>
        </div>
      </div>
    </div>
  </section>
);

export default CostComparison;
