import { useState } from "react";
import { Button } from "@/components/ui/button";
import QualificationFlow, { QualificationData } from "@/components/QualificationFlow";
import PricingResult from "@/components/PricingResult";
import heroImage from "@/assets/hero-ev.jpg";
import { Shield, Zap, Clock, Car, Check, ChevronDown, BadgeEuro, Phone } from "lucide-react";

const Index = () => {
  const [showFlow, setShowFlow] = useState(false);
  const [qualificationData, setQualificationData] = useState<QualificationData | null>(null);

  if (qualificationData) {
    return <PricingResult data={qualificationData} onBack={() => setQualificationData(null)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-primary" />
            <span className="text-xl font-extrabold text-gradient">AkkuTurva</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#miten" className="hover:text-foreground transition-colors">Miten toimii</a>
            <a href="#turva" className="hover:text-foreground transition-colors">Turvatasot</a>
            <a href="#faq" className="hover:text-foreground transition-colors">UKK</a>
          </div>
          <Button variant="hero" size="sm" onClick={() => setShowFlow(true)}>
            Tarkista turva
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-16 min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Sähköauto suomalaisessa talvimaisemassa" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/20" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight mb-6 animate-fade-up">
              Suojaa sähköautosi akku jopa tuhansien eurojen korjauksilta
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fade-up-delay">
              AkkuTurva suojaa sähköautosi kalleinta osaa – akkua. Kattava turvasuunnitelma yhdellä maksulla tai kuukausierillä.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up-delay-2">
              <Button variant="hero" size="lg" className="h-14 px-10 text-lg" onClick={() => setShowFlow(true)}>
                Tarkista turva heti <Zap className="w-5 h-5" />
              </Button>
              <Button variant="heroOutline" size="lg" className="h-14 px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Katso lisää <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-8 text-primary-foreground/70 text-sm animate-fade-up-delay-2">
              <span className="flex items-center gap-1"><Check className="w-4 h-4" /> 14 pv peruutusoikeus</span>
              <span className="flex items-center gap-1"><Check className="w-4 h-4" /> Yli 10 000 suojattua</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="gradient-hero py-6">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-primary-foreground">
          {[
            { value: "10 000+", label: "Suojattua autoa" },
            { value: "5–15 000 €", label: "Akun vaihtohinta" },
            { value: "3–8 v", label: "Turva-aika" },
            { value: "< 3 min", label: "Tarjous valmiina" },
          ].map(s => (
            <div key={s.label}>
              <p className="text-2xl md:text-3xl font-black">{s.value}</p>
              <p className="text-sm opacity-80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="miten" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-12">Miten AkkuTurva toimii?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Car, title: "1. Kerro autosi tiedot", desc: "Syötä auton merkki, malli, vuosimalli ja ajokilometrit. Kestää alle minuutin." },
              { icon: Shield, title: "2. Valitse turvataso", desc: "Saat räätälöidyn tarjouksen kolmella eri turvatasolla – Perus, Premium tai Laajennettu." },
              { icon: BadgeEuro, title: "3. Maksa ja nauti turvasta", desc: "Maksa kertamaksulla tai kuukausierillä. Turva alkaa välittömästi." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6 rounded-2xl gradient-card border border-border hover:glow-primary transition-shadow duration-300">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl gradient-hero flex items-center justify-center">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage tiers overview */}
      <section id="turva" className="py-20 px-4 bg-muted/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-4">Turvatasot</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Valitse sinulle sopiva turvataso. Kaikki suunnitelmat sisältävät Fragus-kumppanin varmuuden.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Perus", price: "alk. 490 €", duration: "3 vuotta", features: ["Kapasiteetin lasku alle 70%", "Akkumoduulin vika", "BMS-viat", "Enintään 5 000 € korvaus"] },
              { name: "Premium", price: "alk. 790 €", duration: "5 vuotta", features: ["Kaikki Perus-edut", "Kapasiteetin lasku alle 80%", "Lämpötilanhallinta", "Latausjärjestelmä", "Enintään 15 000 € korvaus", "Hinauspalvelu"], highlighted: true },
              { name: "Laajennettu", price: "alk. 1 090 €", duration: "8 vuotta", features: ["Kaikki Premium-edut", "Täysi akun vaihto", "Sähkömoottori", "Tehoelektroniikka", "Rajaton korvaus", "Sijaisauto", "24/7 hätäpalvelu"] },
            ].map(tier => (
              <div key={tier.name} className={`rounded-2xl p-6 border-2 bg-card ${tier.highlighted ? "border-primary glow-primary relative" : "border-border"}`}>
                {tier.highlighted && <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-hero text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">Suosituin</div>}
                <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                <p className="text-2xl font-black text-foreground mt-2">{tier.price}</p>
                <p className="text-sm text-muted-foreground mb-4">{tier.duration}</p>
                <ul className="space-y-2">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <Button variant={tier.highlighted ? "hero" : "outline"} className="w-full mt-6 h-11" onClick={() => setShowFlow(true)}>
                  Valitse {tier.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-12">Usein kysytyt kysymykset</h2>
          <div className="space-y-4">
            {[
              { q: "Kannattaako akkuturva?", a: "Sähköauton akun vaihto maksaa tyypillisesti 5 000–20 000 €. AkkuTurva suojaa sinua tältä riskiltä murto-osalla kustannuksista." },
              { q: "Mitä jos akku hajoaa?", a: "Ilmoita vahingosta meille, ja hoidamme korjauksen tai vaihdon kumppaniverkostomme kautta. Sinulle ei koidu lisäkuluja turvatason mukaisesti." },
              { q: "Voinko peruuttaa?", a: "Kyllä! Sinulla on 14 päivän peruutusoikeus ilman kuluja." },
              { q: "Sopiiko käytetyille autoille?", a: "Kyllä, kunhan auto on enintään 8 vuotta vanha ja ajokilometrit alle 150 000 km." },
              { q: "Kuka on Fragus?", a: "Fragus on johtava eurooppalainen ajoneuvojen suojatuotteiden tarjoaja, jolla on yli 20 vuoden kokemus." },
            ].map(({ q, a }) => (
              <details key={q} className="group rounded-xl border border-border bg-card p-4 cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-foreground list-none">
                  {q}
                  <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-3 text-muted-foreground text-sm">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 gradient-hero text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">Turvaa akkusi nyt</h2>
          <p className="text-primary-foreground/80 mb-8">Tarkista autosi kelpoisuus ja saat tarjouksen alle 3 minuutissa.</p>
          <Button
            variant="heroOutline"
            size="lg"
            className="h-14 px-10 text-lg border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setShowFlow(true)}
          >
            Aloita tästä <Zap className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-foreground text-primary-foreground/60">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-bold text-primary-foreground">AkkuTurva</span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-primary-foreground transition-colors">Tietosuoja</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Käyttöehdot</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">Evästeet</a>
          </div>
          <p className="text-xs">© 2026 AkkuTurva. Yhteistyössä Fragus.</p>
        </div>
      </footer>

      {/* Sticky CTA mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-4 bg-card/90 backdrop-blur-lg border-t border-border">
        <Button variant="hero" className="w-full h-12" onClick={() => setShowFlow(true)}>
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
