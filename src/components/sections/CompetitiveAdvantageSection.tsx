import { useCallback } from "react";
import { Car, Globe, Handshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompetitiveAdvantageSectionProps {
  onStartFlow?: () => void;
}

const cards = [
  {
    icon: Car,
    title: "Auto jo sinulla?",
    text: "Ei haittaa. Hanki turva autoon joka sinulla on jo alla — autoliikettä ei tarvita.",
  },
  {
    icon: Globe,
    title: "Tuontiauto?",
    text: "Ulkomailta tuotuun autoon ei saa lisäturvaa muualta. Meiltä saat.",
  },
  {
    icon: Handshake,
    title: "Yksityiskauppa?",
    text: "Ostetko auton yksityiseltä? Hanki turva verkosta heti kaupan jälkeen — ilman välikäsiä.",
  },
];

export default function CompetitiveAdvantageSection({ onStartFlow }: CompetitiveAdvantageSectionProps) {
  const handleCta = useCallback(() => {
    onStartFlow?.();
  }, [onStartFlow]);

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #6A3DF0, #FF4D9D)",
      }}
      className="w-full py-12 md:py-16"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Label */}
        <p
          className="text-center uppercase font-semibold mb-4"
          style={{
            fontSize: "13px",
            letterSpacing: "3px",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          AINOA SUOMESSA
        </p>

        {/* Headline */}
        <h2
          className="text-center font-bold text-white leading-tight mb-5 mx-auto"
          style={{
            fontSize: "clamp(28px, 5vw, 36px)",
            maxWidth: "700px",
          }}
        >
          Lisäturva kenelle tahansa — ilman autoliikettä
        </h2>

        {/* Subtext */}
        <p
          className="text-center mx-auto mb-10 md:mb-12"
          style={{
            fontSize: "17px",
            color: "rgba(255,255,255,0.9)",
            maxWidth: "600px",
            lineHeight: 1.6,
          }}
        >
          Muut myyvät lisäturvaa vain omille asiakkailleen auton oston yhteydessä. Me myymme sen suoraan sinulle — milloin tahansa, mihin autoon tahansa.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className="p-6 flex flex-col items-center text-center"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "12px",
              }}
            >
              <card.icon className="w-8 h-8 text-white mb-3" strokeWidth={1.8} />
              <h3 className="text-white font-bold text-lg mb-2">{card.title}</h3>
              <p
                className="text-white text-sm leading-relaxed"
                style={{ opacity: 0.92 }}
              >
                {card.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Button
            onClick={handleCta}
            className="h-12 px-7 font-bold w-full md:w-auto rounded-lg"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#6A3DF0",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.9)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#FFFFFF";
            }}
          >
            Katso hinta autollesi
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
