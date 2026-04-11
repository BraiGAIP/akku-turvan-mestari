import { Zap, Car, Shield, Battery, Sparkles, Thermometer, PlugZap, ShieldCheck, Wind, Cpu, Check } from "lucide-react";

const categories = [
  { icon: Zap, title: "Sähköajomoottori", desc: "Sähkömoottori ja sen komponentit turvattu" },
  { icon: Cpu, title: "Moottorin ohjainlaitteet", desc: "Ohjauselektroniikka ja invertteri suojattu" },
  { icon: Car, title: "Voimansiirto", desc: "Vaihteisto ja kriittiset osat katettu" },
  { icon: Shield, title: "Jarru- ja ohjausjärjestelmä", desc: "Keskeiset jarru- ja ohjauskomponentit" },
  { icon: Battery, title: "Korkeajänniteakku (HV)", desc: "Sähköauton kallein osa turvattu" },
  { icon: PlugZap, title: "Latausjärjestelmä", desc: "Sisäinen laturi ja muuntimet" },
  { icon: Thermometer, title: "Akun jäähdytys", desc: "Lämpötilanhallinta ja jäähdytyspiiri" },
  { icon: ShieldCheck, title: "Turvalaitteet", desc: "Airbag ja turvajärjestelmät" },
  { icon: Wind, title: "Lämmitys ja jäähdytys", desc: "Ilmastointijärjestelmä suojattu" },
  { icon: Sparkles, title: "Mukavuustoiminnot", desc: "Sähköiset lisävarusteet" },
];

const CoverageSection = () => (
  <>
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 mb-4">
            GoSafe Electric
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">Mitä akkuturva kattaa?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kattava turva sähköauton kaikille kriittisille komponenteille.
            Perustuu Fraguksen virallisiin sopimusehtoihin.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {categories.map((c) => (
            <div key={c.title} className="bg-card rounded-xl border border-border p-4 hover:border-primary/30 transition-colors">
              <c.icon className="w-5 h-5 text-primary mb-2" />
              <h3 className="font-semibold text-foreground text-sm mb-1">{c.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6">
          Korvaa tekniset viat ja rikkoutumiset – ei normaalia kulumista · Perustuu Fraguksen virallisiin ehtoihin
        </p>
      </div>
    </section>

    {/* Battery capacity highlight */}
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto rounded-2xl p-8 border-2 border-secondary/30 bg-secondary/5">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
            <Battery className="w-7 h-7 text-secondary" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-foreground mb-3">
              Kattaa myös akun kapasiteetin heikkenemisen
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Sähköauton akun kapasiteetti laskee ajan myötä. AkkuTurva korvaa,
              jos kapasiteetti laskee merkittävästi.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2 text-sm text-foreground bg-background rounded-lg p-3 border border-border">
                <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                <span>
                  Korvaa kapasiteetin laskun <strong>alle 70 %</strong>
                </span>
              </div>
              <div className="flex items-start gap-2 text-sm text-foreground bg-background rounded-lg p-3 border border-border">
                <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                <span>
                  Seuranta: alenema <strong>yli 6 % / 12 kk</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default CoverageSection;
