import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Shield, Award } from "lucide-react";
import evHeroImg from "@/assets/ev-hero.jpg";

interface HeroSectionProps {
  onStartFlow: () => void;
}

const HeroSection = ({ onStartFlow }: HeroSectionProps) => (
  <section className="relative min-h-[85vh] flex items-center pt-16">
    {/* Background image with overlay */}
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={evHeroImg}
        alt="Moderni sähköauto"
        className="w-full h-full object-cover object-center"
        width={1920}
        height={1024}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28 w-full">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Award className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Virallinen Fragus-kumppani</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight mb-6">
          Suojaa sähköautosi akku{" "}
          <span className="text-primary">yllättäviltä kuluilta</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
          Sähköauton akun vaihto voi maksaa 5 000–20 000 €. AkkuTurva suojaa
          auton kriittisimmän osan – alkaen 490 €/vuosi.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" className="h-14 px-10 text-base rounded-full" onClick={onStartFlow}>
            Tarkista hinta autollesi
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

        <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-primary" />
            <span>14 pv peruutusoikeus</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-primary" />
            <span>Ei piilokuluja</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
