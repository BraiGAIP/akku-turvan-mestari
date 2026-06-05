import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Shield, Clock, CreditCard, Lock, AlertTriangle } from "lucide-react";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";


interface CTASectionProps {
  onStartFlow: () => void;
}

const valuePoints = [
  "Suoja auton kalleimmalle osalle",
  "Ei yllättäviä kustannuksia",
  "Voimassa heti maksun jälkeen",
  "Voit maksaa kuukausittain",
];

const trustPoints = [
  { icon: Lock, text: "Turvallinen maksu" },
  { icon: Shield, text: "14 päivän peruutusoikeus" },
  { icon: CreditCard, text: "Ei piilokuluja" },
];

const CTASection = ({ onStartFlow }: CTASectionProps) => (
  <section className="py-20 px-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-secondary/5" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full bg-primary/8 blur-[140px]" />

    <div className="max-w-3xl mx-auto relative">
      {/* Main sales card */}
      <div className="glass-card rounded-2xl p-8 md:p-10">
        {/* Headline */}
        <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2 tracking-tight text-center">
          Jatkoturva suojaa sinua jopa 20 000 € korjauskuluilta
        </h2>
        <p className="text-secondary text-xl font-black text-center mb-8">
          Alkaen vain 41 € / kk
        </p>

        {/* Value list */}
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {valuePoints.map((point) => (
            <div key={point} className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/5 border border-secondary/10">
              <Check className="w-4 h-4 text-secondary flex-shrink-0" />
              <span className="text-sm font-medium text-foreground">{point}</span>
            </div>
          ))}
        </div>

        {/* Objection handling */}
        <div className="rounded-xl bg-muted/50 border border-border p-5 mb-8">
          <h3 className="font-bold text-foreground text-sm mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-accent" />
            Miksi asiakkaat ottavat akkuturvan?
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Sähköauton akun korjaus voi maksaa tuhansia euroja.
            Useimmat ottavat turvan ennen kuin ongelmia ilmenee – silloin se on halvin.
          </p>
        </div>

        {/* Trust elements */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {trustPoints.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon className="w-3.5 h-3.5 text-secondary" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Final push */}
        <p className="text-center text-sm text-muted-foreground mb-4 flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-secondary" />
          Tämä vie alle 2 minuuttia – suoja alkaa heti
        </p>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="h-14 px-12 text-base rounded-full bg-gradient-to-r from-primary to-primary/80 btn-glow font-bold transition-all duration-200 hover:scale-[1.03]"
            onClick={onStartFlow}
          >
            Osta akkuturva <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
          <div className="mt-3 space-y-0.5">
            <p className="text-xs text-muted-foreground">✔ Et sitoudu ennen maksua</p>
            <p className="text-xs text-muted-foreground">✔ Voit maksaa kuukausittain</p>
            <p className="text-xs text-muted-foreground">✔ Turva alkaa heti</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
