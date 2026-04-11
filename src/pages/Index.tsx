import { useState } from "react";
import { Button } from "@/components/ui/button";
import QualificationFlow, { QualificationData } from "@/components/QualificationFlow";
import PricingResult from "@/components/PricingResult";
import { Shield, Zap, Clock, Car, Check, ChevronDown, BadgeEuro, ArrowRight, Battery, Sparkles, Star } from "lucide-react";

const Index = () => {
  const [showFlow, setShowFlow] = useState(false);
  const [qualificationData, setQualificationData] = useState<QualificationData | null>(null);

  if (qualificationData) {
    return <PricingResult data={qualificationData} onBack={() => setQualificationData(null)} />;
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-extrabold text-gradient">AkkuTurva</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#miten" className="hover:text-foreground transition-colors duration-300">Miten toimii</a>
            <a href="#turva" className="hover:text-foreground transition-colors duration-300">Turvatasot</a>
            <a href="#faq" className="hover:text-foreground transition-colors duration-300">UKK</a>
          </div>
          <Button variant="hero" size="sm" className="rounded-full" onClick={() => setShowFlow(true)}>
            Tarkista turva
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-blob" />
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px] animate-blob" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[140px] animate-blob" style={{ animationDelay: '4s' }} />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-up">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Suomen johtava sähköauton akkuturva</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[1.08] tracking-tight mb-6 animate-fade-up-delay">
              Suojaa akkusi{" "}
              <span className="text-gradient">tuhansien eurojen</span>{" "}
              korjauksilta
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up-delay-2">
              AkkuTurva suojaa sähköautosi kalleinta osaa – akkua. Kattava turvasuunnitelma yhdellä maksulla tai joustavilla kuukausierillä.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-3">
              <Button variant="hero" size="lg" className="h-14 px-10 text-base rounded-full" onClick={() => setShowFlow(true)}>
                Tarkista turva heti
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
              <Button variant="heroOutline" size="lg" className="h-14 px-8 rounded-full" onClick={() => document.getElementById('miten')?.scrollIntoView({ behavior: 'smooth' })}>
                Miten se toimii
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 mt-10 text-sm text-muted-foreground animate-fade-up-delay-3">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-secondary" /> 14 pv peruutusoikeus</span>
              <span className="hidden sm:flex items-center gap-1.5"><Check className="w-4 h-4 text-secondary" /> Yli 10 000 suojattua</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-secondary" /> Fragus-kumppani</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "10 000+", label: "Suojattua autoa", icon: Car },
              { value: "5–15k €", label: "Akun vaihtohinta", icon: Battery },
              { value: "3–8 v", label: "Turva-aika", icon: Clock },
              { value: "< 3 min", label: "Tarjous valmiina", icon: Zap },
            ].map((s, i) => (
              <div key={s.label} className="glass rounded-2xl p-6 text-center shadow-premium hover:shadow-premium-lg transition-all duration-500 hover:-translate-y-1" style={{ animationDelay: `${i * 0.1}s` }}>
                <s.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <p className="text-2xl md:text-3xl font-black text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="miten" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 mb-4">Näin se toimii</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">Kolme askelta turvaan</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Car, step: "01", title: "Kerro autosi tiedot", desc: "Syötä merkki, malli, vuosimalli ja ajokilometrit. Kestää alle minuutin." },
              { icon: Shield, step: "02", title: "Valitse turvataso", desc: "Saat räätälöidyn tarjouksen kolmella eri turvatasolla – valitse sinulle sopivin." },
              { icon: BadgeEuro, step: "03", title: "Maksa ja nauti turvasta", desc: "Maksa kertamaksulla tai kuukausierillä. Turva alkaa välittömästi." },
            ].map(({ icon: Icon, step, title, desc }, i) => (
              <div key={title} className="group relative glass rounded-3xl p-8 shadow-premium hover:shadow-premium-lg transition-all duration-500 hover:-translate-y-2">
                <span className="text-6xl font-black text-primary/10 absolute top-4 right-6">{step}</span>
                <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage tiers */}
      <section id="turva" className="py-24 px-6 relative">
        <div className="absolute inset-0 gradient-hero-subtle" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 mb-4">Turvatasot</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">Valitse sinulle sopiva turva</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">Kaikki suunnitelmat sisältävät Fragus-kumppanin varmuuden ja 14 päivän peruutusoikeuden.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Perus", price: "alk. 490 €", duration: "3 vuotta", features: ["Kapasiteetin lasku alle 70%", "Akkumoduulin vika", "BMS-viat", "Enintään 5 000 € korvaus"] },
              { name: "Premium", price: "alk. 790 €", duration: "5 vuotta", features: ["Kaikki Perus-edut", "Kapasiteetin lasku alle 80%", "Lämpötilanhallinta", "Latausjärjestelmä", "Enintään 15 000 € korvaus", "Hinauspalvelu"], highlighted: true },
              { name: "Laajennettu", price: "alk. 1 090 €", duration: "8 vuotta", features: ["Kaikki Premium-edut", "Täysi akun vaihto", "Sähkömoottori", "Tehoelektroniikka", "Rajaton korvaus", "Sijaisauto", "24/7 hätäpalvelu"] },
            ].map((tier, i) => (
              <div key={tier.name} className={`relative glass-strong rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 ${tier.highlighted ? "ring-2 ring-primary shadow-premium-lg scale-[1.02]" : "shadow-premium hover:shadow-premium-lg"}`}>
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 gradient-hero text-primary-foreground text-xs font-bold px-5 py-1.5 rounded-full flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5" /> Suosituin
                  </div>
                )}
                <h3 className="text-2xl font-bold text-foreground">{tier.name}</h3>
                <p className="text-3xl font-black text-foreground mt-3">{tier.price}</p>
                <p className="text-sm text-muted-foreground mb-6">{tier.duration}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <Button variant={tier.highlighted ? "hero" : "outline"} className="w-full h-12 rounded-xl" onClick={() => setShowFlow(true)}>
                  Valitse {tier.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 mb-4">UKK</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">Usein kysytyt kysymykset</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "Kannattaako akkuturva?", a: "Sähköauton akun vaihto maksaa tyypillisesti 5 000–20 000 €. AkkuTurva suojaa sinua tältä riskiltä murto-osalla kustannuksista." },
              { q: "Mitä jos akku hajoaa?", a: "Ilmoita vahingosta meille, ja hoidamme korjauksen tai vaihdon kumppaniverkostomme kautta. Sinulle ei koidu lisäkuluja turvatason mukaisesti." },
              { q: "Voinko peruuttaa?", a: "Kyllä! Sinulla on 14 päivän peruutusoikeus ilman kuluja." },
              { q: "Sopiiko käytetyille autoille?", a: "Kyllä, kunhan auto on enintään 8 vuotta vanha ja ajokilometrit alle 150 000 km." },
              { q: "Kuka on Fragus?", a: "Fragus on johtava eurooppalainen ajoneuvojen suojatuotteiden tarjoaja, jolla on yli 20 vuoden kokemus." },
            ].map(({ q, a }) => (
              <details key={q} className="group glass-strong rounded-2xl p-5 cursor-pointer shadow-premium hover:shadow-premium-lg transition-all duration-300">
                <summary className="flex items-center justify-between font-semibold text-foreground list-none text-lg">
                  {q}
                  <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <p className="mt-4 text-muted-foreground leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero animate-gradient opacity-90" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-primary-foreground/10 blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-primary-foreground/5 blur-[60px]" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-primary-foreground mb-5 tracking-tight">Turvaa akkusi nyt</h2>
          <p className="text-primary-foreground/80 mb-10 text-lg leading-relaxed">Tarkista autosi kelpoisuus ja saat tarjouksen alle 3 minuutissa. Ei sitoumuksia.</p>
          <Button
            size="lg"
            className="h-14 px-10 text-base rounded-full bg-primary-foreground text-foreground font-bold hover:bg-primary-foreground/90 transition-all duration-300 hover:scale-105 shadow-lg"
            onClick={() => setShowFlow(true)}
          >
            Aloita tästä <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">AkkuTurva</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors duration-300">Tietosuoja</a>
            <a href="#" className="hover:text-foreground transition-colors duration-300">Käyttöehdot</a>
            <a href="#" className="hover:text-foreground transition-colors duration-300">Evästeet</a>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 AkkuTurva. Yhteistyössä Fragus.</p>
        </div>
      </footer>

      {/* Sticky CTA mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-4 glass">
        <Button variant="hero" className="w-full h-13 rounded-full text-base" onClick={() => setShowFlow(true)}>
          Osta akkuturva nyt <Shield className="w-5 h-5" />
        </Button>
      </div>

      {/* Qualification Flow Modal */}
      {showFlow && (
        <QualificationFlow
          onComplete={(d) => {
            setQualificationData(d);
            setShowFlow(false);
          }}
          onClose={() => setShowFlow(false)}
        />
      )}
    </div>
  );
};

export default Index;
