import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/sections/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import HeroSection from "@/components/sections/HeroSection";
import PartnerBanner from "@/components/sections/PartnerBanner";
import CostComparison from "@/components/sections/CostComparison";
import CoverageSection from "@/components/sections/CoverageSection";
import PricingTiersSection from "@/components/sections/PricingTiersSection";
import TrustSection from "@/components/sections/TrustSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import SiteFooter from "@/components/sections/SiteFooter";
import Testimonials from "@/components/sections/Testimonials";
import ComparisonTable from "@/components/sections/ComparisonTable";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import CompetitiveAdvantageSection from "@/components/sections/CompetitiveAdvantageSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import PriceCalculatorModal from "@/components/PriceCalculatorModal";
import PricingResult from "@/components/PricingResult";
import type { VehicleData } from "@/components/QualificationFlow";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
      <ScrollReveal className="section-dark-mid"><PartnerBanner /></ScrollReveal>
      <ScrollReveal className="section-light" delay={50}><ComparisonTable /></ScrollReveal>
      <ScrollReveal className="section-light-alt" delay={50}><CostComparison onStartFlow={startFlow} /></ScrollReveal>
      <ScrollReveal className="section-light" delay={50}><SavingsCalculator onStartFlow={startFlow} /></ScrollReveal>
      <ScrollReveal className="section-dark-deep" delay={100}><CoverageSection /></ScrollReveal>
      <ScrollReveal className="section-light" delay={50}><PricingTiersSection onStartFlow={startFlow} /></ScrollReveal>
      <ScrollReveal className="section-light-alt"><Testimonials /></ScrollReveal>
      <ScrollReveal className="section-dark-mid"><TrustSection /></ScrollReveal>
      <ScrollReveal className="section-light" delay={50}><FAQSection /></ScrollReveal>
      <ScrollReveal className="section-dark-deep"><CTASection onStartFlow={startFlow} /></ScrollReveal>
      <SiteFooter />

      <WhatsAppButton />

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-4 bg-background/95 backdrop-blur-xl border-t border-border/30">
        <Button className="w-full h-12 rounded-full text-base font-bold btn-brand" onClick={startFlow}>
          Hanki turva nyt <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
        <p className="text-center text-[10px] text-muted-foreground mt-1.5">Et sitoudu · Vie alle 2 min · Turva alkaa heti</p>
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
