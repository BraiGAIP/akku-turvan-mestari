import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const SiteFooter = () => (
  <footer className="py-10 px-6 border-t border-border/30">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
          <Shield className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-bold text-foreground">AkkuTurva</span>
      </div>
      <div className="flex gap-6 text-sm text-muted-foreground">
        <Link to="/tietosuoja" className="hover:text-foreground transition-colors">Tietosuoja</Link>
        <Link to="/kayttoehdot" className="hover:text-foreground transition-colors">Käyttöehdot</Link>
        <button
          onClick={() => { localStorage.removeItem("akkuturva_cookie_consent"); window.location.reload(); }}
          className="hover:text-foreground transition-colors"
        >
          Evästeet
        </button>
      </div>
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} AkkuTurva · Perustuu Fragus GoSafe Electric -tuotteeseen
      </p>
    </div>
  </footer>
);

export default SiteFooter;
