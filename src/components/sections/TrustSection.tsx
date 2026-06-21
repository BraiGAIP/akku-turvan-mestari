import { Shield, Award, Lock, FileText, Phone, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const TrustSection = () => (
  <section className="py-16 px-6">
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-16">
        {[
          { icon: Lock, label: "Turvallinen maksu", desc: "SSL-suojattu" },
          { icon: Award, label: "Virallinen toimija", desc: "Suomalainen palvelu" },
          { icon: Shield, label: "14 pv peruutus", desc: "Riskitön kokeilu" },
          { icon: FileText, label: "Selkeät ehdot", desc: "Ei piilokuluja" },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-secondary" />
            </div>
            <p className="font-semibold text-foreground text-sm">{label}</p>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-8">
        <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          Kuka on Jatkoturvan takana?
        </h3>
        <div className="grid sm:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-0.5">Tuote</p>
              <p className="text-foreground">Jatkoturvan kunnossapitosopimukset</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-0.5">Tuotelinjat</p>
              <p className="text-foreground">Perusturva · Premium · Sähköturva · Akkuturva</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1">Yhteystiedot</p>
              <div className="space-y-1.5 text-foreground">
                <a href="tel:+358401234567" className="flex items-center gap-2 hover:text-brand-gradient">
                  <Phone className="w-3.5 h-3.5 text-[#FF4D9D]" /> 040 123 4567
                </a>
                <a href="mailto:info@jatkoturva.fi" className="flex items-center gap-2 hover:text-brand-gradient">
                  <span className="text-[#FF4D9D]">@</span> info@jatkoturva.fi
                </a>
                <a href="https://wa.me/358401234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-gradient">
                  <span className="text-[#25D366] font-bold text-xs">WA</span> WhatsApp 040 123 4567
                </a>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-0.5">Ehdot</p>
              <div className="flex gap-4">
                <Link to="/kayttoehdot" className="text-brand-gradient font-bold hover:underline">Käyttöehdot</Link>
                <Link to="/tietosuoja" className="text-brand-gradient font-bold hover:underline">Tietosuoja</Link>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
          Jatkoturva on Fragus Warranty Finland Oy:n virallinen jälleenmyyjä Suomessa. Kaikki sopimukset noudattavat Fraguksen virallisia GOSafe-ehtoja (Basic, Premium, Electric, Premium & Battery).
        </p>
      </div>
    </div>
  </section>
);

export default TrustSection;
