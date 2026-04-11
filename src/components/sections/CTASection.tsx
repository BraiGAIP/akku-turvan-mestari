import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

interface CTASectionProps {
  onStartFlow: () => void;
}

const CTASection = ({ onStartFlow }: CTASectionProps) => (
  <section className="py-20 px-6 bg-primary">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-black text-primary-foreground mb-4 tracking-tight">
        Selvitä hintasi 30 sekunnissa
      </h2>
      <p className="text-primary-foreground/80 mb-6 text-lg leading-relaxed">
        Syötä auton tiedot ja saat tarjouksen heti. Et sitoudu ostamaan – näet hinnan ensin.
      </p>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-sm text-primary-foreground/90">
        {["Ei piilokuluja", "Voimassa heti", "14 pv peruutusoikeus"].map((t) => (
          <span key={t} className="flex items-center gap-1.5">
            <Check className="w-4 h-4" /> {t}
          </span>
        ))}
      </div>
      <Button
        size="lg"
        className="h-14 px-10 text-base rounded-full bg-primary-foreground text-foreground font-bold hover:bg-primary-foreground/90 transition-colors shadow-lg"
        onClick={onStartFlow}
      >
        Aloita tästä <ArrowRight className="w-5 h-5 ml-1" />
      </Button>
      <p className="text-primary-foreground/60 text-xs mt-6">
        Ilman suojaa yksi vika voi maksaa tuhansia euroja
      </p>
    </div>
  </section>
);

export default CTASection;
