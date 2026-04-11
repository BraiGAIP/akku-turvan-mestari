import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  onStartFlow: () => void;
}

const CTASection = ({ onStartFlow }: CTASectionProps) => (
  <section className="py-20 px-6 bg-primary">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-black text-primary-foreground mb-4 tracking-tight">
        Tarkista hinta autollesi
      </h2>
      <p className="text-primary-foreground/80 mb-8 text-lg leading-relaxed">
        Syötä auton tiedot ja saat tarjouksen heti. Ei sitoumuksia – 14 päivän peruutusoikeus.
      </p>
      <Button
        size="lg"
        className="h-14 px-10 text-base rounded-full bg-primary-foreground text-foreground font-bold hover:bg-primary-foreground/90 transition-colors"
        onClick={onStartFlow}
      >
        Aloita tästä <ArrowRight className="w-5 h-5 ml-1" />
      </Button>
      <p className="text-primary-foreground/60 text-xs mt-6">
        Hinta perustuu ajoneuvon tietoihin · Lopullinen hinta määräytyy auton iän, kilometrien ja kunnon mukaan
      </p>
    </div>
  </section>
);

export default CTASection;
