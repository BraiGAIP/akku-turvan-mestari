import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Zap, Car, Shield, BadgeEuro, Clock } from "lucide-react";
import evHeroImg from "@/assets/ev-hero.jpg";

interface HeroSectionProps {
  onStartFlow: () => void;
}

const steps = [
  {
    icon: Car,
    step: "01",
    title: "Syötä rekisterinumero",
    desc: "Syötä tiedot ja näe hinta heti.",
  },
  {
    icon: Shield,
    step: "02",
    title: "Valitse sopiva turva",
    desc: "Vertaile vaihtoehdot ja valitse sinulle sopiva.",
  },
  {
    icon: BadgeEuro,
    step: "03",
    title: "Osta – suoja alkaa heti",
    desc: "Maksa turvallisesti. Turva voimassa välittömästi.",
  },
];

const HeroSection = ({ onStartFlow }: HeroSectionProps) => (
  <section className="relative min-h-[90vh] flex items-center pt-16 noise-bg">
    {/* Background image with dark overlay */}
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={evHeroImg}
        alt="Moderni sähköauto"
        className="w-full h-full object-cover object-center opacity-30"
        width={1920}
        height={1024}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />
      {/* Radial glow behind headline */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] rounded-full bg-primary/10 blur-[120px] animate-glow" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 w-full">
      <div className="max-w-2xl mb-14">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Zap className="w-4 h-4 text-secondary" />
          <span className="text-sm font-semibold text-foreground">Virallinen Fragus-kumppani Suomessa</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight mb-3">
          Sähköauton akku voi hajota yllättäen
        </h1>
        <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-secondary leading-tight mb-6">
          Suojaa itsesi jopa 20 000 € kustannuksilta
        </p>

        {/* Pain amplifier */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl px-5 py-3 mb-8 inline-block">
          <p className="text-base md:text-lg font-bold text-destructive">
            Akun vaihto maksaa 5 000–20 000 € — AkkuTurva alkaen 490 €/vuosi
          </p>
        </div>

        {/* Value stack */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-6">
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
      </div>

      {/* 3-step process */}
      <div id="miten" className="glass-card rounded-2xl p-6 md:p-8">
        <div className="grid md:grid-cols-3 gap-5 mb-6">
          {steps.map(({ icon: Icon, step, title, desc }) => (
            <div key={title} className="relative bg-muted/50 rounded-xl border border-border p-6 hover:border-primary/40 hover:translate-y-[-2px] transition-all duration-300">
              <span className="text-5xl font-black text-primary/10 absolute top-3 right-5">{step}</span>
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                <Icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-1">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-secondary" />
            <span>Koko prosessi vie alle 2 minuuttia</span>
          </div>
          <div className="flex flex-col items-center sm:items-end gap-1">
            <Button
              size="lg"
              className="h-14 px-10 text-base rounded-full bg-gradient-to-r from-primary to-primary/80 btn-glow hover:translate-y-[-1px] transition-all"
              onClick={onStartFlow}
            >
              Näe hinta autollesi
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <p className="text-xs text-muted-foreground">
              Et sitoudu ostamaan – näet hinnan ensin
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm font-medium text-destructive/80 text-center md:text-left">
        Ilman suojaa yksi vika voi maksaa tuhansia euroja
      </p>
    </div>
  </section>
);

export default HeroSection;
