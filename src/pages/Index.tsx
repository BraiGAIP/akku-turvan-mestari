import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import PartnerBanner from "@/components/sections/PartnerBanner";
import CostComparison from "@/components/sections/CostComparison";
import CoverageSection from "@/components/sections/CoverageSection";
import PricingTiersSection from "@/components/sections/PricingTiersSection";
import TrustSection from "@/components/sections/TrustSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import SiteFooter from "@/components/sections/SiteFooter";
import PriceCalculatorModal from "@/components/PriceCalculatorModal";
import PricingResult from "@/components/PricingResult";
import type { VehicleData } from "@/components/QualificationFlow";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const Index = () => {
  const [showFlow, setShowFlow] = useState(false);
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);

  const startFlow = useCallback(() => setShowFlow(true), []);

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
      <Navbar onStartFlow={startFlow} />
      <HeroSection onStartFlow={startFlow} />
      <PartnerBanner />
      <CostComparison onStartFlow={startFlow} />
      <CoverageSection />
      <PricingTiersSection onStartFlow={startFlow} />
      <TrustSection />
      <FAQSection />
      <CTASection onStartFlow={startFlow} />
      <SiteFooter />

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-4 bg-background/95 backdrop-blur-xl border-t border-border/30">
        <Button className="w-full h-12 rounded-full text-base font-bold bg-gradient-to-r from-primary to-primary/80 btn-glow" onClick={startFlow}>
          Osta akkuturva <Shield className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Price Calculator Modal */}
      <PriceCalculatorModal
        open={showFlow}
        onComplete={(d) => { setVehicleData(d); setShowFlow(false); }}
        onClose={() => setShowFlow(false)}
      />
    </div>
  );
};

export default Index;
