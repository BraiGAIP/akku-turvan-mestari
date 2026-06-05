import { Star } from "lucide-react";

const reviews = [
  {
    name: "Mikko, Espoo",
    car: "Volkswagen Passat 2019",
    text: "Vaihteiston vika tuli yllättäen — Jatkoturva korvasi 4 800 € korjauksen ilman omavastuuta. Asiat hoituivat parissa päivässä.",
  },
  {
    name: "Anni, Tampere",
    car: "Tesla Model 3 2021",
    text: "Sain päätöksen alle tunnissa ja korjaamo sai luvan korjaukseen suoraan. Selkein vakuutuskokemus ikinä.",
  },
  {
    name: "Jukka, Oulu",
    car: "BMW X3 2018",
    text: "Suosittelen lämpimästi. Suomenkielinen asiakaspalvelu vastasi heti, ei ulkomaisia puhelinjonoja.",
  },
  {
    name: "Sari, Turku",
    car: "Hyundai Tucson Hybrid 2020",
    text: "Ostin Jatkoturvan netistä kahdessa minuutissa. Hinta oli puolet halvempi kuin merkkihuollon takuujatkossa.",
  },
];

const Testimonials = () => (
  <section className="py-20 px-6 bg-background">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-gradient bg-brand-gradient-soft mb-4">
          Asiakaskokemukset
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
          Tuhansien suomalaisten luottamus
        </h2>

        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full glass-card">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#FF4D9D] text-[#FF4D9D]" />
            ))}
          </div>
          <span className="font-bold text-foreground">4.9 ★ Google-arviot</span>
          <span className="text-xs text-muted-foreground">· 380+ arvostelua</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {reviews.map((r) => (
          <div key={r.name} className="glass-card rounded-2xl p-6 flex flex-col">
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#FF4D9D] text-[#FF4D9D]" />
              ))}
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed mb-4 flex-1">
              "{r.text}"
            </p>
            <div className="pt-3 border-t border-border/40">
              <p className="font-bold text-sm text-foreground">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.car}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
