import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Zap, Car, Shield, BadgeEuro, Clock } from "lucide-react";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";


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
  <section
    className="relative min-h-[85vh] md:min-h-screen flex items-center pt-16 overflow-hidden"
    style={{
      backgroundImage: 'url(/hero-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
    }}
  >
    {/* Dark, neutral overlay — image recedes into the background */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'linear-gradient(135deg, rgba(10,15,25,0.92) 0%, rgba(10,15,25,0.78) 55%, rgba(10,15,25,0.62) 100%)',
        zIndex: 1,
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(10,15,25,0.35)',
        zIndex: 1,
      }}
    />




    <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 w-full" style={{ position: 'relative', zIndex: 2 }}>
      <div className="max-w-2xl mb-14">
        {/* Trust badge — restrained */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/15 mb-6">
          <Zap className="w-4 h-4 text-foreground/80" />
          <span className="text-sm font-semibold text-foreground/85">Suomalainen auton lisäturva verkosta</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-foreground leading-[1.05] tracking-tight uppercase mb-4">
          Auton kunnossapitosopimus <span className="text-secondary">käytetylle autolle</span>
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-foreground/80 leading-snug mb-3">
          Kun tehdastakuu päättyy — me jatkamme.
        </p>
        <p className="text-base md:text-lg text-foreground/65 leading-snug mb-6">
          Jatkoturva suojaa sinua jopa 20 000 € yllätyskorjauksilta.
        </p>

        <h2 className="sr-only">Jatkoturva – Suomen selkein lisäturva</h2>


        {/* Trust badges — calmer, no gradient fill */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["Ei omavastuuta", "Päätös tunnissa", "Kotimainen palvelu"].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/[0.04] border border-foreground/12 text-sm font-semibold text-foreground/90"
            >
              <Check className="w-4 h-4 text-secondary" strokeWidth={3} />
              {label}
            </span>
          ))}
        </div>

        {/* Pain amplifier — dark card, calm contrast */}
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-xl px-5 py-3 mb-6 inline-block shadow-lg">
          <p className="text-base md:text-lg font-bold text-foreground">
            Moottorin, vaihteiston tai akun korjaus 3 000–20 000 €
          </p>
          <p className="text-sm text-secondary font-semibold mt-1">
            Jatkoturva alkaen 21 €/kk (sis. ALV 25,5 %)
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
              className="h-14 px-10 text-base rounded-full btn-brand hover:translate-y-[-1px] transition-all duration-200"
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

      <p className="mt-6 text-sm font-medium text-muted-foreground text-center md:text-left">
        Ilman suojaa yksi vika voi maksaa tuhansia euroja
      </p>
    </div>
  </section>
);

export default HeroSection;
