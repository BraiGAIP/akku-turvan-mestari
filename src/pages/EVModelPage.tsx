import { useParams, Link, useNavigate } from "react-router-dom";
import { getEVBySlug, getAllEVSlugs } from "@/data/seoData";
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
        <div className="text-center bg-card rounded-2xl border border-border p-10 max-w-md">
          <Car className="w-14 h-14 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-black text-foreground mb-2">Autoa ei löytynyt</h1>
          <p className="text-muted-foreground mb-6">Tarkista osoite tai selaa kaikkia malleja.</p>
          <Link to="/akkuturva"><Button className="rounded-full">Selaa kaikkia malleja</Button></Link>
        </div>
      </div>
    );
  }

  const fullName = `${ev.brand} ${ev.model}`;
  const title = `${fullName} akkuturva – Suojaa akkusi | Jatkoturva`;
  const description = `${fullName} akun vaihto maksaa jopa ${ev.avgReplacementCost.toLocaleString("fi-FI")} €. Jatkoturva suojaa akkusi alkaen 490 €. 14 pv peruutusoikeus.`;
  const basePrice = Math.round(490 * (ev.batteryCapacity / 60));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${fullName} Jatkoturva`,
    description,
    brand: { "@type": "Brand", name: "Jatkoturva" },
    offers: { "@type": "Offer", priceCurrency: "EUR", price: basePrice, availability: "https://schema.org/InStock" },
  };

  const faqs = [
    { q: `Kannattaako ${fullName} akkuturva?`, a: `${fullName} akun vaihto maksaa keskimäärin ${ev.avgReplacementCost.toLocaleString("fi-FI")} €. Jatkoturva suojaa tältä riskiltä alkaen ${basePrice} €.` },
    { q: `Mitä ${fullName} akkuturva kattaa?`, a: `Turva kattaa akun kapasiteetin laskun, akkumoduulien viat, BMS-järjestelmän ongelmat ja latausjärjestelmän viat turvatasosta riippuen.` },
    { q: `Kuinka kauan ${fullName} akku kestää?`, a: `${fullName} akun kapasiteetti (${ev.batteryCapacity} kWh) säilyy tyypillisesti 80 %:ssa noin 150 000 km tai 8–10 vuoden ajan.` },
    { q: "Voinko peruuttaa turvan?", a: "Kyllä, sinulla on 14 päivän peruutusoikeus ilman syytä." },
  ];

  const allSlugs = getAllEVSlugs();
  const sameBrand = allSlugs.filter(e => e.brand === ev.brand && e.slug !== slug);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead title={title} description={description} canonical={`https://akkuturva.fi/akkuturva/${slug}`} jsonLd={jsonLd} />

      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-extrabold text-foreground">Jatkoturva</span>
          </Link>
          <Button size="sm" className="rounded-full bg-gradient-to-r from-primary to-primary/80 btn-glow font-bold" onClick={() => navigate("/")}>Laske hinta heti</Button>
        </div>
      </nav>

      <section className="pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/akkuturva" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Kaikki mallit
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            {fullName} <span className="text-primary">akkuturva</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            Suojaa {fullName} akku ({ev.batteryCapacity} kWh) odottamattomilta kuluilta. Akun vaihto voi maksaa jopa {ev.avgReplacementCost.toLocaleString("fi-FI")} € – Jatkoturvalla alkaen {basePrice} €.
          </p>
          <Button size="lg" className="h-14 px-10 rounded-full text-base" onClick={() => navigate("/")}>
            Tarkista {fullName} turva <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Battery, value: `${ev.batteryCapacity} kWh`, label: "Akun kapasiteetti" },
            { icon: Zap, value: `${ev.avgReplacementCost.toLocaleString("fi-FI")} €`, label: "Vaihdon hinta" },
            { icon: Shield, value: `alk. ${basePrice} €`, label: "Turvan hinta" },
            { icon: Clock, value: `${ev.years[0]}–${ev.years[ev.years.length - 1]}`, label: "Vuosimallit" },
          ].map(s => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-5 text-center">
              <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xl font-black text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6">Miksi {fullName} tarvitsee akkuturvan?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Kallis akun vaihto", desc: `${fullName} akun vaihto maksaa keskimäärin ${ev.avgReplacementCost.toLocaleString("fi-FI")} €.` },
              { title: "Suomen pakkanen rasittaa", desc: `${ev.batteryCapacity} kWh akku kärsii kylmässä. Pakkanen voi nopeuttaa kulumista.` },
              { title: "Takuu ei kata kaikkea", desc: "Valmistajan takuu kattaa vain tietyt viat. Jatkoturva laajentaa suojaa." },
              { title: "Mielenrauha joka päivä", desc: "Aja huoletta tietäen, että odottamattomat akkuongelmat on katettu." },
            ].map(b => (
              <div key={b.title} className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6">Turvatasot – {fullName}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "12 kk", price: `alk. ${basePrice} €`, features: ["Kapasiteetin lasku < 70 %", "Akkumoduulin viat", "Korvausraja 6 000 €"] },
              { name: "24 kk", price: `alk. ${Math.round(basePrice * 1.7)} €`, highlighted: true, features: ["Kaikki 12 kk edut", "Voimansiirto", "Korvausraja 10 000 €"] },
              { name: "36 kk", price: `alk. ${Math.round(basePrice * 2.3)} €`, features: ["Kaikki 24 kk edut", "Mukavuustoiminnot", "Korvausraja 15 000 €"] },
            ].map(tier => (
              <div key={tier.name} className={`bg-card rounded-xl border p-6 ${tier.highlighted ? "border-primary ring-1 ring-primary" : "border-border"}`}>
                {tier.highlighted && <div className="text-xs font-bold text-primary mb-2 flex items-center gap-1"><Star className="w-3.5 h-3.5" /> Suosituin</div>}
                <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
                <p className="text-2xl font-black text-foreground mt-1">{tier.price}</p>
                <ul className="space-y-2 mt-4">
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
            <Button size="lg" className="h-13 px-10 rounded-full" onClick={() => navigate("/")}>
              Osta {fullName} akkuturva <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6">{fullName} akkuturva – UKK</h2>
          <div className="space-y-2">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group bg-card rounded-xl border border-border p-5 cursor-pointer hover:border-primary/30 transition-colors">
                <summary className="flex items-center justify-between font-semibold text-foreground list-none">
                  {q}
                  <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform duration-200 flex-shrink-0 ml-4" />
                </summary>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {sameBrand.length > 0 && (
        <section className="py-12 px-6 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-foreground mb-4">Muut {ev.brand}-mallit</h3>
            <div className="flex flex-wrap gap-2">
              {sameBrand.map(e => (
                <Link key={e.slug} to={`/akkuturva/${e.slug}`} className="px-4 py-2 rounded-full bg-muted text-sm font-medium text-foreground hover:bg-primary/10 transition-colors">
                  {e.brand} {e.model}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"><Shield className="w-4 h-4 text-primary-foreground" /></div>
            <span className="font-bold text-foreground">Jatkoturva</span>
          </Link>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Jatkoturva · Perustuu Fragus GoSafe Electric -tuotteeseen</p>
        </div>
      </footer>
    </div>
  );
};

export default EVModelPage;
