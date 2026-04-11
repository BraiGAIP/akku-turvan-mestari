import { Shield, Award, Lock, FileText, Phone, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const TrustSection = () => (
  <section className="py-16 px-6">
    <div className="max-w-5xl mx-auto">
      {/* Trust badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-16">
        {[
          { icon: Lock, label: "Turvallinen maksu", desc: "SSL-suojattu" },
          { icon: Award, label: "Fragus-kumppani", desc: "Virallinen jälleenmyyjä" },
          { icon: Shield, label: "14 pv peruutus", desc: "Riskitön kokeilu" },
          { icon: FileText, label: "Selkeät ehdot", desc: "Ei piilokuluja" },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <p className="font-semibold text-foreground text-sm">{label}</p>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      {/* Company info */}
      <div className="bg-card rounded-2xl border border-border p-8">
        <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          Tietoja palveluntarjoajasta
        </h3>
        <div className="grid sm:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-0.5">Tuote</p>
              <p className="text-foreground">Fragus GoSafe Electric -akkuturva</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-0.5">Kumppani</p>
              <p className="text-foreground">Fragus Group – Euroopan johtava ajoneuvosuojatuotteiden tarjoaja</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-0.5">Asiakaspalvelu</p>
              <p className="text-foreground flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-primary" /> info@akkuturva.fi</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-0.5">Ehdot</p>
              <div className="flex gap-4">
                <Link to="/kayttoehdot" className="text-primary hover:underline">Käyttöehdot</Link>
                <Link to="/tietosuoja" className="text-primary hover:underline">Tietosuoja</Link>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
          Akkuturva perustuu Fraguksen GoSafe Electric -tuotteeseen. Kaikki sopimusehdot noudattavat Fraguksen virallisia ehtoja.
        </p>
      </div>
    </div>
  </section>
);

export default TrustSection;
