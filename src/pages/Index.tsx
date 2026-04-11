import { useState, useEffect, useCallback } from "react";
import HeroSection from "@/components/sections/HeroSection";
import PartnerBanner from "@/components/sections/PartnerBanner";
import CostComparison from "@/components/sections/CostComparison";

import CoverageSection from "@/components/sections/CoverageSection";
import PricingTiersSection from "@/components/sections/PricingTiersSection";
import TrustSection from "@/components/sections/TrustSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import SiteFooter from "@/components/sections/SiteFooter";
import QualificationFlow, { type VehicleData } from "@/components/QualificationFlow";
import PricingResult from "@/components/PricingResult";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Index = () => {
  const [showFlow, setShowFlow] = useState(false);
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);

  const startFlow = useCallback(() => setShowFlow(true), []);

  // Listen for chatbot's "start flow" event
  useEffect(() => {
    const handler = () => startFlow();
    window.addEventListener("startQualificationFlow", handler);
    return () => window.removeEventListener("startQualificationFlow", handler);
  }, [startFlow]);

  if (vehicleData) {
    return <PricingResult data={vehicleData} onBack={() => setVehicleData(null)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onStartFlow={() => setShowFlow(true)} />
      <HeroSection onStartFlow={() => setShowFlow(true)} />
      <PartnerBanner />
      <CostComparison onStartFlow={() => setShowFlow(true)} />
      <CoverageSection />
      <PricingTiersSection onStartFlow={() => setShowFlow(true)} />
      <TrustSection />
      <FAQSection />
      <CTASection onStartFlow={() => setShowFlow(true)} />
      <SiteFooter />

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-4 bg-background/90 backdrop-blur-md border-t border-border/50">
        <Button className="w-full h-12 rounded-full text-base shadow-lg shadow-primary/25" onClick={() => setShowFlow(true)}>
          Selvitä hintasi 30 sekunnissa <Shield className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {showFlow && (
        <QualificationFlow
          onComplete={(d) => { setVehicleData(d); setShowFlow(false); }}
          onClose={() => setShowFlow(false)}
        />
      )}
    </div>
  );
};

export default Index;
