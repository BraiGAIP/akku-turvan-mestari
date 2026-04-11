import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Shield, Check, Zap } from "lucide-react";
import evHeroImg from "@/assets/ev-hero.jpg";

interface HeroSectionProps {
  onStartFlow: () => void;
}

const HeroSection = ({ onStartFlow }: HeroSectionProps) => (
  <section className="relative min-h-[90vh] flex items-center pt-16">
    {/* Background image with stronger overlay */}
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={evHeroImg}
        alt="Moderni sähköauto"
        className="w-full h-full object-cover object-center"
        width={1920}
        height={1024}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/98 to-background/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28 w-full">
      <div className="max-w-2xl">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Virallinen Fragus-kumppani Suomessa</span>
        </div>

        {/* Problem line */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight mb-3">
          Sähköauton akku voi hajota yllättäen
        </h1>
        {/* Solution line – primary color, bigger impact */}
        <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary leading-tight mb-6">
          Suojaa itsesi jopa 20 000 € kustannuksilta
        </p>

        {/* Pain amplifier */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl px-5 py-3 mb-8 inline-block">
          <p className="text-base md:text-lg font-bold text-destructive">
            Akun vaihto maksaa 5 000–20 000 € — AkkuTurva alkaen 490 €/vuosi
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Button size="lg" className="h-14 px-10 text-base rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all" onClick={onStartFlow}>
            Selvitä hintasi 30 sekunnissa
            <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 px-8 rounded-full"
            onClick={() => document.getElementById("miten")?.scrollIntoView({ behavior: "smooth" })}
          >
            Miten se toimii
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Microcopy – remove hesitation */}
        <p className="text-sm text-muted-foreground mb-6">
          Et sitoudu ostamaan – näet hinnan ensin
        </p>

        {/* Value stack */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {[
            "Suoja kalleimmalle autonosalle",
            "Ei piilokuluja",
            "Voimassa heti",
            "14 päivän peruutusoikeus",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-foreground">
              <Check className="w-4 h-4 text-secondary flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Urgency line */}
        <p className="mt-6 text-sm font-medium text-destructive/80">
          Ilman suojaa yksi vika voi maksaa tuhansia euroja
        </p>
      </div>
    </div>
  </section>
);

export default HeroSection;
