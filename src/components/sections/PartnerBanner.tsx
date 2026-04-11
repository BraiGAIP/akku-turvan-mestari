import { Award, Shield } from "lucide-react";

const PartnerBanner = () => (
  <section className="py-10 px-6 border-y border-border/30">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Award className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Virallinen kumppani</p>
          <p className="text-xl font-black text-foreground">Fragus Group</p>
        </div>
      </div>
      <div className="h-px w-16 bg-border hidden md:block" />
      <p className="text-muted-foreground text-center md:text-left max-w-md">
        Eurooppalainen toimija ajoneuvoturvassa – yli{" "}
        <span className="font-semibold text-foreground">20 vuoden kokemus</span>{" "}
        ajoneuvojen suojatuotteissa.
      </p>
      <div className="h-px w-16 bg-border hidden md:block" />
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
        <Shield className="w-4 h-4 text-secondary" />
        <span className="text-sm font-bold text-foreground">Yli 1 000 suojattua autoa Suomessa</span>
      </div>
    </div>
  </section>
);

export default PartnerBanner;
