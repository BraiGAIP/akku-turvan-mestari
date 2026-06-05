import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo, { BrandShield } from "@/components/brand/Logo";

interface NavbarProps {
  onStartFlow: () => void;
}

const Navbar = ({ onStartFlow }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="Jatkoturva etusivulle">
          {/* Mobile: symbol only. Desktop: full wordmark logo on dark navbar */}
          <span className="sm:hidden"><BrandShield size={34} /></span>
          <span className="hidden sm:block"><Logo variant="full" theme="dark" tagline={false} size={32} /></span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#miten" className="hover:text-foreground transition-colors">Miten toimii</a>
          <a href="#turva" className="hover:text-foreground transition-colors">Turvatasot</a>
          <Link to="/akkuturva" className="hover:text-foreground transition-colors">Mallit</Link>
          <Link to="/blogi" className="hover:text-foreground transition-colors">Blogi</Link>
          <a href="#faq" className="hover:text-foreground transition-colors">UKK</a>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" className="rounded-full hidden sm:inline-flex btn-brand font-bold px-5" onClick={onStartFlow}>
            Laske hinta heti
          </Button>
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center text-muted-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-6 py-4 space-y-3">
          <a href="#miten" className="block text-sm font-medium text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>Miten toimii</a>
          <a href="#turva" className="block text-sm font-medium text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>Turvatasot</a>
          <Link to="/akkuturva" className="block text-sm font-medium text-muted-foreground hover:text-foreground">Mallit</Link>
          <Link to="/blogi" className="block text-sm font-medium text-muted-foreground hover:text-foreground">Blogi</Link>
          <a href="#faq" className="block text-sm font-medium text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>UKK</a>
          <Button size="sm" className="w-full rounded-full mt-2 btn-brand font-bold" onClick={() => { onStartFlow(); setMobileOpen(false); }}>
            Laske hinta heti
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
