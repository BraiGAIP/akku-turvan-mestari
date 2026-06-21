import { Link } from "react-router-dom";
import Logo from "@/components/brand/Logo";

const SiteFooter = () => (
  <footer className="py-10 px-6 border-t border-border/30 bg-[#0A1220]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <Logo variant="full" theme="dark" tagline size={34} />
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
      <p className="text-xs text-muted-foreground text-center md:text-right">
        © {new Date().getFullYear()} Jatkoturva
        <br />
        <span className="opacity-60">Sopimukset hallinnoi Fragus Warranty Finland Oy</span>
      </p>
    </div>
  </footer>
);

export default SiteFooter;
