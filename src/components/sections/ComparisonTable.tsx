import { Check, X, Minus } from "lucide-react";

const rows: Array<{ feature: string; us: string; them: string }> = [
  { feature: "Ei omavastuuta",         us: "yes",  them: "no" },
  { feature: "Päätös tunnissa",        us: "yes",  them: "no" },
  { feature: "Kotimainen tuki",        us: "yes",  them: "varies" },
  { feature: "Sopimus siirrettävissä", us: "yes",  them: "dash" },
  { feature: "Korvausraja jopa 20 000 €", us: "yes", them: "no" },
  { feature: "14 päivän peruutusoikeus", us: "yes", them: "varies" },
];

const Cell = ({ kind }: { kind: string }) => {
  if (kind === "yes") return <Check className="w-5 h-5 text-[#FF4D9D] mx-auto" strokeWidth={3} />;
  if (kind === "no")  return <X className="w-5 h-5 text-muted-foreground/60 mx-auto" />;
  if (kind === "dash") return <Minus className="w-5 h-5 text-muted-foreground/60 mx-auto" />;
  return <span className="text-xs text-muted-foreground">Vaihtelee</span>;
};

const ComparisonTable = () => (
  <section className="py-20 px-6 bg-background">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-gradient bg-brand-gradient-soft mb-4">
          Vertailu
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
          Miksi Jatkoturva?
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
          Selkeät edut tyypilliseen korjaamoturvaan tai laajennettuun takuuseen verrattuna.
        </p>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/40">
              <th className="text-left p-4 font-bold text-foreground">Ominaisuus</th>
              <th className="p-4 text-center">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white btn-brand">
                  Jatkoturva
                </span>
              </th>
              <th className="p-4 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Tyypillinen korjaamo
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.feature} className={i % 2 === 0 ? "bg-white/[0.015]" : ""}>
                <td className="p-4 text-foreground/90 font-medium">{row.feature}</td>
                <td className="p-4 text-center"><Cell kind={row.us} /></td>
                <td className="p-4 text-center"><Cell kind={row.them} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

export default ComparisonTable;
