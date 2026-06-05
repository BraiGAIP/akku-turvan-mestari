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
  <section className="relative min-h-[92vh] flex items-center pt-16 noise-bg overflow-hidden">
    {/* Background image with heavy dark overlay */}
    <div className="absolute inset-0">
      <img
        src={evHeroImg}
        alt="Moderni sähköauto"
        className="w-full h-full object-cover object-center opacity-20"
        width={1920}
        height={1024}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/90" />
      {/* Radial glow behind headline */}
      <div className="absolute top-[20%] left-[15%] w-[700px] h-[500px] rounded-full bg-primary/8 blur-[150px] animate-glow" />
      {/* Secondary glow */}
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[300px] rounded-full bg-secondary/5 blur-[120px] animate-glow" style={{ animationDelay: "1.5s" }} />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 w-full">
      <div className="max-w-2xl mb-14">
        {/* Trust badge with gold accent */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
          <Zap className="w-4 h-4 text-accent" />
          <span className="text-sm font-semibold text-accent">Virallinen Fragus-kumppani Suomessa</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-foreground leading-[1.05] tracking-tight uppercase mb-4">
          Kun tehdastakuu päättyy —{" "}
          <span className="text-brand-gradient">me jatkamme.</span>
        </h1>
        <p className="text-xl md:text-2xl font-bold text-foreground/85 leading-snug mb-6">
          Fraguksen jatkoturva suojaa sinua jopa 20 000 € yllätyskorjauksilta.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["Ei omavastuuta", "Päätös tunnissa", "Kotimainen palvelu"].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gradient-soft border border-[#FF4D9D]/30 text-sm font-bold text-foreground"
            >
              <Check className="w-4 h-4 text-[#FF4D9D]" strokeWidth={3} />
              {label}
            </span>
          ))}
        </div>

        {/* Pain amplifier */}
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl px-5 py-3 mb-6 inline-block">
          <p className="text-base md:text-lg font-bold text-destructive">
            Moottorin, vaihteiston tai akun korjaus 3 000–20 000 €
          </p>
          <p className="text-sm text-brand-gradient font-bold mt-1">
            Jatkoturva alkaen vain 19 €/kk
          </p>
        </div>

        {/* Primary CTA */}
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <Button
            size="lg"
            className="h-14 px-8 text-base btn-brand"
            onClick={onStartFlow}
          >
            Hanki turva nyt
            <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
          <a
            href="#turva"
            className="text-sm font-bold text-foreground/80 hover:text-foreground underline-offset-4 hover:underline"
          >
            Katso turvatasot →
          </a>
        </div>
      </div>

      {/* 3-step process */}
      <div id="miten" className="glass-card rounded-2xl p-6 md:p-8">
        <div className="grid md:grid-cols-3 gap-5 mb-6">
          {steps.map(({ icon: Icon, step, title, desc }) => (
            <div key={title} className="relative bg-muted/40 rounded-xl border border-border/50 p-6 hover:border-secondary/30 hover:translate-y-[-2px] transition-all duration-300 group">
              <span className="text-5xl font-black text-primary/8 absolute top-3 right-5">{step}</span>
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-4 shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow">
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
          <div className="flex flex-col items-center sm:items-end gap-2">
            <Button
              size="lg"
              className="h-14 px-10 text-base rounded-full bg-gradient-to-r from-primary to-primary/80 btn-glow hover:scale-[1.03] hover:translate-y-[-1px] transition-all duration-200"
              onClick={onStartFlow}
            >
              Laske hinta heti
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <div className="flex flex-col items-center sm:items-end gap-0.5">
              <p className="text-xs text-muted-foreground">
                ✔ Et sitoudu ennen maksua
              </p>
              <p className="text-xs text-muted-foreground">
                ✔ Voit maksaa kuukausittain
              </p>
              <p className="text-xs text-muted-foreground">
                ✔ Turva alkaa heti
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm font-medium text-destructive/70 text-center md:text-left">
        Ilman suojaa yksi vika voi maksaa tuhansia euroja
      </p>
    </div>
  </section>
);

export default HeroSection;
