import { Link } from "react-router-dom";
import { getAllEVSlugs } from "@/data/seoData";
import { evDatabase, getBrands } from "@/data/evDatabase";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";
import { Shield, ArrowRight, Battery, Car } from "lucide-react";

const EVDirectoryPage = () => {
  const brands = getBrands();
  const allSlugs = getAllEVSlugs();

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Sähköautojen akkuturva – Kaikki mallit | AkkuTurva"
        description="Selaa kaikkien sähköautojen akkuturva-sivut. Tesla, VW, BMW, Hyundai ja muut – löydä omalle autollesi sopiva turva."
        canonical="https://akkuturva.fi/akkuturva"
      />

      <nav className="fixed top-0 left-0 right-0 z-40 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-extrabold text-gradient">AkkuTurva</span>
          </Link>
          <Link to="/"><Button variant="default" size="sm" className="rounded-full">Tarkista turva</Button></Link>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4 animate-fade-up">
            Sähköautojen <span className="text-gradient">akkuturva</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl animate-fade-up-delay">
            Selaa kaikki sähköautomallit ja löydä omalle autollesi räätälöity akkuturva. Hinnat alkaen 490 €.
          </p>

          {brands.map(brand => {
            const models = evDatabase.filter(ev => ev.brand === brand);
            return (
              <div key={brand} className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">{brand}</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {models.map(ev => {
                    const slug = allSlugs.find(s => s.brand === ev.brand && s.model === ev.model)?.slug;
                    const basePrice = Math.round(490 * (ev.batteryCapacity / 60));
                    return (
                      <Link key={slug} to={`/akkuturva/${slug}`} className="glass-strong rounded-2xl p-5 shadow-premium hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-1 group">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{ev.model}</h3>
                            <p className="text-xs text-muted-foreground">{ev.years[0]}–{ev.years[ev.years.length - 1]}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Battery className="w-3 h-3" /> {ev.batteryCapacity} kWh</span>
                          <span className="font-bold text-foreground">alk. {basePrice} €</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center"><Shield className="w-4 h-4 text-primary-foreground" /></div>
            <span className="font-bold text-foreground">AkkuTurva</span>
          </Link>
          <p className="text-xs text-muted-foreground">© 2026 AkkuTurva</p>
        </div>
      </footer>
    </div>
  );
};

export default EVDirectoryPage;
