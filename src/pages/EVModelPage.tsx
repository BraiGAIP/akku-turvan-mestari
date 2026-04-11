import { useParams, Link, useNavigate } from "react-router-dom";
import { getEVBySlug, getSlug, getAllEVSlugs } from "@/data/seoData";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";
import { Shield, Check, ChevronDown, ArrowRight, Battery, Clock, Zap, Star, ArrowLeft, Car } from "lucide-react";

const EVModelPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const ev = slug ? getEVBySlug(slug) : null;

  if (!ev) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center glass-strong rounded-3xl p-10 shadow-premium-lg max-w-md">
          <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-black text-foreground mb-2">Autoa ei löytynyt</h1>
          <p className="text-muted-foreground mb-6">Tarkista osoite tai selaa kaikkia malleja.</p>
          <Link to="/akkuturva"><Button variant="hero" className="rounded-full">Selaa kaikkia malleja</Button></Link>
        </div>
      </div>
    );
  }

  const fullName = `${ev.brand} ${ev.model}`;
  const title = `${fullName} akkuturva – Suojaa akkusi | AkkuTurva`;
  const description = `${fullName} akun vaihto maksaa jopa ${ev.avgReplacementCost.toLocaleString("fi-FI")} €. AkkuTurva suojaa akkusi alkaen 490 €. 14 pv peruutusoikeus.`;
  const basePrice = Math.round(490 * (ev.batteryCapacity / 60));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${fullName} AkkuTurva`,
    description,
    brand: { "@type": "Brand", name: "AkkuTurva" },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: basePrice,
      availability: "https://schema.org/InStock",
    },
  };

  const faqs = [
    { q: `Kannattaako ${fullName} akkuturva?`, a: `${fullName} akun vaihto maksaa keskimäärin ${ev.avgReplacementCost.toLocaleString("fi-FI")} €. AkkuTurva suojaa tältä riskiltä alkaen ${basePrice} €, mikä on murto-osa korjauskustannuksista.` },
    { q: `Mitä ${fullName} akkuturva kattaa?`, a: `Turva kattaa akun kapasiteetin laskun, akkumoduulien viat, BMS-järjestelmän ongelmat ja latausjärjestelmän viat turvatasosta riippuen.` },
    { q: `Kuinka kauan ${fullName} akku kestää?`, a: `${fullName} akun kapasiteetti (${ev.batteryCapacity} kWh) säilyy tyypillisesti 80 %:ssa noin 150 000 km tai 8–10 vuoden ajan. Suomen kylmät olosuhteet voivat nopeuttaa kulumista.` },
    { q: "Voinko peruuttaa turvan?", a: "Kyllä, sinulla on 14 päivän peruutusoikeus ilman syytä." },
  ];

  const allSlugs = getAllEVSlugs();
  const sameBrand = allSlugs.filter(e => e.brand === ev.brand && e.slug !== slug);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead title={title} description={description} canonical={`https://akkuturva.fi/akkuturva/${slug}`} jsonLd={jsonLd} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-extrabold text-gradient">AkkuTurva</span>
          </Link>
          <Button variant="hero" size="sm" className="rounded-full" onClick={() => navigate("/")}>
            Tarkista turva
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-28 pb-20 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-20 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] animate-blob" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-secondary/10 blur-[100px] animate-blob" style={{ animationDelay: '3s' }} />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <Link to="/akkuturva" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Kaikki mallit
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-4 animate-fade-up">
            {fullName} <span className="text-gradient">akkuturva</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 animate-fade-up-delay">
            Suojaa {fullName} akku ({ev.batteryCapacity} kWh) odottamattomilta kuluilta. Akun vaihto voi maksaa jopa {ev.avgReplacementCost.toLocaleString("fi-FI")} € – AkkuTurvalla alkaen {basePrice} €.
          </p>
          <Button variant="hero" size="lg" className="h-14 px-10 rounded-full text-base animate-fade-up-delay-2" onClick={() => navigate("/")}>
            Tarkista {fullName} turva <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </section>

      {/* Key stats */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Battery, value: `${ev.batteryCapacity} kWh`, label: "Akun kapasiteetti" },
            { icon: Zap, value: `${ev.avgReplacementCost.toLocaleString("fi-FI")} €`, label: "Vaihdon hinta" },
            { icon: Shield, value: `alk. ${basePrice} €`, label: "Turvan hinta" },
            { icon: Clock, value: `${ev.years[0]}–${ev.years[ev.years.length - 1]}`, label: "Vuosimallit" },
          ].map(s => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center shadow-premium">
              <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xl font-black text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-8">Miksi {fullName} tarvitsee akkuturvan?</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: "Kallis akun vaihto", desc: `${fullName} akun vaihto maksaa keskimäärin ${ev.avgReplacementCost.toLocaleString("fi-FI")} €. Ilman suojaa tämä tulee omasta taskusta.` },
              { title: "Suomen pakkanen rasittaa", desc: `${ev.batteryCapacity} kWh akku kärsii kylmässä. Pakkanen voi laskea kapasiteettia ja nopeuttaa kulumista.` },
              { title: "Takuu ei kata kaikkea", desc: "Valmistajan takuu kattaa vain tietyt viat tietyn ajan. AkkuTurva laajentaa suojaa merkittävästi." },
              { title: "Mielenrauha joka päivä", desc: "Aja huoletta tietäen, että odottamattomat akkuongelmat on katettu – aina." },
            ].map(b => (
              <div key={b.title} className="glass-strong rounded-2xl p-6 shadow-premium">
                <h3 className="font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage tiers */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 gradient-hero-subtle" />
        <div className="relative max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-8">Turvatasot – {fullName}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: "Perus", price: `${basePrice} €`, duration: "3 v", features: ["Kapasiteetin lasku < 70%", "Akkumoduulin viat", "BMS-suoja", "Maks. 5 000 € korvaus"] },
              { name: "Premium", price: `${Math.round(basePrice * 1.6)} €`, duration: "5 v", highlighted: true, features: ["Kaikki Perus-edut", "Kapasiteetti < 80%", "Lämpötilanhallinta", "Latausjärjestelmä", "Maks. 15 000 € korvaus"] },
              { name: "Laajennettu", price: `${Math.round(basePrice * 2.2)} €`, duration: "8 v", features: ["Kaikki Premium-edut", "Täysi akun vaihto", "Sähkömoottori", "Rajaton korvaus", "Sijaisauto"] },
            ].map(tier => (
              <div key={tier.name} className={`glass-strong rounded-2xl p-6 ${tier.highlighted ? "ring-2 ring-primary shadow-premium-lg" : "shadow-premium"}`}>
                {tier.highlighted && <div className="text-xs font-bold text-primary mb-2 flex items-center gap-1"><Star className="w-3.5 h-3.5" /> Suosituin</div>}
                <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                <p className="text-2xl font-black text-foreground mt-1">{tier.price}</p>
                <p className="text-xs text-muted-foreground mb-4">{tier.duration}</p>
                <ul className="space-y-2">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="w-3.5 h-3.5 text-secondary flex-shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="hero" size="lg" className="h-14 px-10 rounded-full" onClick={() => navigate("/")}>
              Osta {fullName} akkuturva <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-8">{fullName} akkuturva – UKK</h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group glass-strong rounded-2xl p-5 cursor-pointer shadow-premium">
                <summary className="flex items-center justify-between font-semibold text-foreground list-none">
                  {q}
                  <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related models */}
      {sameBrand.length > 0 && (
        <section className="py-16 px-6 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-4">Muut {ev.brand}-mallit</h3>
            <div className="flex flex-wrap gap-3">
              {sameBrand.map(e => (
                <Link key={e.slug} to={`/akkuturva/${e.slug}`} className="px-4 py-2 rounded-full glass text-sm font-medium text-foreground hover:bg-primary/10 transition-colors">
                  {e.brand} {e.model}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center"><Shield className="w-4 h-4 text-primary-foreground" /></div>
            <span className="font-bold text-foreground">AkkuTurva</span>
          </Link>
          <p className="text-xs text-muted-foreground">© 2026 AkkuTurva. Yhteistyössä Fragus.</p>
        </div>
      </footer>
    </div>
  );
};

export default EVModelPage;
