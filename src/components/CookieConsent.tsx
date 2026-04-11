import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Settings, X } from "lucide-react";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const CONSENT_KEY = "akkuturva_cookie_consent";

const getStoredConsent = (): CookiePreferences | null => {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
};

const saveConsent = (prefs: CookiePreferences) => {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
};

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = getStoredConsent();
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => { saveConsent({ necessary: true, analytics: true, marketing: true, timestamp: new Date().toISOString() }); setVisible(false); };
  const handleRejectAll = () => { saveConsent({ necessary: true, analytics: false, marketing: false, timestamp: new Date().toISOString() }); setVisible(false); };
  const handleSaveCustom = () => { saveConsent({ necessary: true, analytics, marketing, timestamp: new Date().toISOString() }); setVisible(false); };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 pointer-events-none">
      <div className="w-full max-w-2xl pointer-events-auto animate-fade-up">
        <div className="bg-card rounded-2xl border border-border shadow-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground">Evästeasetukset</h3>
            </div>
            <button onClick={handleRejectAll} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Käytämme evästeitä parantaaksemme käyttökokemustasi.{" "}
            <a href="/tietosuoja" className="text-primary hover:underline">Lue lisää.</a>
          </p>

          {showCustomize && (
            <div className="space-y-3 mb-5 p-4 rounded-lg bg-muted/50">
              <label className="flex items-center justify-between">
                <div><p className="text-sm font-medium text-foreground">Välttämättömät</p><p className="text-xs text-muted-foreground">Sivuston perustoiminnot</p></div>
                <div className="w-10 h-5 rounded-full bg-primary flex items-center justify-end px-0.5"><div className="w-4 h-4 rounded-full bg-primary-foreground" /></div>
              </label>
              <label className="flex items-center justify-between cursor-pointer" onClick={() => setAnalytics(!analytics)}>
                <div><p className="text-sm font-medium text-foreground">Analytiikka</p><p className="text-xs text-muted-foreground">Käytön seuranta</p></div>
                <div className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${analytics ? "bg-primary justify-end" : "bg-muted-foreground/30 justify-start"}`}><div className="w-4 h-4 rounded-full bg-primary-foreground" /></div>
              </label>
              <label className="flex items-center justify-between cursor-pointer" onClick={() => setMarketing(!marketing)}>
                <div><p className="text-sm font-medium text-foreground">Markkinointi</p><p className="text-xs text-muted-foreground">Kohdennettu mainonta</p></div>
                <div className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${marketing ? "bg-primary justify-end" : "bg-muted-foreground/30 justify-start"}`}><div className="w-4 h-4 rounded-full bg-primary-foreground" /></div>
              </label>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            {showCustomize ? (
              <Button onClick={handleSaveCustom} className="rounded-full flex-1">Tallenna valinnat</Button>
            ) : (
              <>
                <Button onClick={handleAcceptAll} className="rounded-full flex-1">Hyväksy kaikki</Button>
                <Button onClick={handleRejectAll} variant="outline" className="rounded-full flex-1">Hylkää valinnaiset</Button>
                <Button onClick={() => setShowCustomize(true)} variant="ghost" className="rounded-full gap-1.5"><Settings className="w-4 h-4" /> Muokkaa</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
