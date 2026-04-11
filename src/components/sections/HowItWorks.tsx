import { Car, Shield, BadgeEuro } from "lucide-react";

const steps = [
  {
    icon: Car,
    step: "01",
    title: "Syötä autosi tiedot",
    desc: "Merkki, malli, vuosimalli ja ajokilometrit. Saat tarjouksen heti.",
  },
  {
    icon: Shield,
    step: "02",
    title: "Valitse turvataso",
    desc: "Kolme vaihtoehtoa: 12, 24 tai 36 kuukautta. Vertaile ja valitse.",
  },
  {
    icon: BadgeEuro,
    step: "03",
    title: "Maksa ja nauti turvasta",
    desc: "Maksa kertamaksulla tai kuukausierillä. Turva alkaa heti.",
  },
];

const HowItWorks = () => (
  <section id="miten" className="py-20 px-6 bg-muted/30">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 mb-4">
          Näin se toimii
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">Kolme askelta turvaan</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map(({ icon: Icon, step, title, desc }) => (
          <div key={title} className="relative bg-card rounded-2xl border border-border p-8 hover:border-primary/30 transition-colors duration-300">
            <span className="text-5xl font-black text-primary/10 absolute top-4 right-6">{step}</span>
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-5">
              <Icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
