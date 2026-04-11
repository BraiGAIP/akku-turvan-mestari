import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

interface CTASectionProps {
  onStartFlow: () => void;
}

const CTASection = ({ onStartFlow }: CTASectionProps) => (
  <section className="py-20 px-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-secondary/5" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full bg-primary/8 blur-[140px]" />
    <div className="max-w-2xl mx-auto text-center relative">
      <h2 className="text-3xl md:text-4xl font-black text-foreground mb-2 tracking-tight">
        Suojaa sähköautosi arvokkain osa
      </h2>
      <p className="text-secondary text-xl font-bold mb-4">
        Alkaen vain 41 € / kk
      </p>
      <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
        Syötä auton tiedot ja saat tarjouksen heti. Et sitoudu ostamaan – näet hinnan ensin.
      </p>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-sm text-foreground/80">
        {["Ei sitoutumista ennen ostoa", "Maksa kuukausittain", "Turva alkaa heti"].map((t) => (
          <span key={t} className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-secondary" /> {t}
          </span>
        ))}
      </div>
      <Button
        size="lg"
        className="h-14 px-10 text-base rounded-full bg-gradient-to-r from-primary to-primary/80 btn-glow font-bold transition-all duration-200 hover:scale-[1.03]"
        onClick={onStartFlow}
      >
        Osta akkuturva <ArrowRight className="w-5 h-5 ml-1" />
      </Button>
      <p className="text-muted-foreground text-xs mt-6">
        Ilman suojaa yksi vika voi maksaa tuhansia euroja
      </p>
    </div>
  </section>
);

export default CTASection;
