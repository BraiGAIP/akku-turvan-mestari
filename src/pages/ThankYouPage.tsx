import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Mail, Phone, ArrowRight, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/sections/Navbar";
import SiteFooter from "@/components/sections/SiteFooter";

const steps = [
  { icon: Mail, title: "Vahvistus sähköpostiin", desc: "Saat tilausvahvistuksen ja turvakirjan sähköpostiisi muutaman minuutin sisällä." },
  { icon: FileText, title: "Turvakirja aktivoituu", desc: "Jatkoturvasi on voimassa heti maksun jälkeen – ei odotusaikaa." },
  { icon: Phone, title: "Tarvitsetko apua?", desc: "Ota yhteyttä asiakaspalveluumme milloin tahansa. Autamme mielellämme." },
];

const ThankYouPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onStartFlow={() => {}} />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success icon */}
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-secondary" />
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-3">
            Kiitos tilauksestasi!
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Jatkoturvasi on nyt aktiivinen.
          </p>
          <p className="text-sm text-muted-foreground/70 mb-10">
            Suojaat sähköautosi kalleinta osaa – fiksu päätös.
          </p>

          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-12">
            <Shield className="w-4 h-4" /> Maksu vastaanotettu turvallisesti
          </div>

          {/* Next steps */}
          <div className="space-y-4 text-left">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="glass-card rounded-xl p-6 flex items-start gap-4"
                style={{
                  opacity: 0,
                  animation: `fade-in 0.5s ease-out ${200 + i * 150}ms forwards`,
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 space-y-3">
            <Button asChild className="h-12 px-8 rounded-full text-base font-bold bg-gradient-to-r from-primary to-primary/80 btn-glow">
              <Link to="/">
                Takaisin etusivulle <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground">
              Kysyttävää? <a href="mailto:tuki@akkuturva.fi" className="text-primary hover:underline">tuki@akkuturva.fi</a>
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ThankYouPage;
