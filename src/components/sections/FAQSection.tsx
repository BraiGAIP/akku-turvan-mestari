import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Kannattaako akkuturva?", a: "Sähköauton akun vaihto maksaa tyypillisesti 5 000–20 000 €. Akkuturva suojaa sinua tältä riskiltä murto-osalla kustannuksista. Korvausraja on jopa 15 000 € sopimuskauden aikana." },
  { q: "Mitä akkuturva kattaa?", a: "GoSafe Electric kattaa sähköajomoottorin, ohjainlaitteet, voimansiirron, jarru- ja ohjausjärjestelmän, korkeajänniteakun, latausjärjestelmän, akun jäähdytyksen, turvalaitteet, lämmitys- ja jäähdytysjärjestelmän sekä sähköiset mukavuustoiminnot." },
  { q: "Kattaako turva akun kapasiteetin laskun?", a: "Kyllä. Turva korvaa, jos akun kapasiteetti laskee alle 70 % alkuperäisestä tai alenema ylittää 6 % 12 kuukauden aikana." },
  { q: "Miten korjaus toimii?", a: "Ilmoita viasta meille. Saat ohjeet korjaamolle, Fragus hyväksyy korjauksen ja maksaa suoraan korjaamolle." },
  { q: "Sopiiko käytetyille autoille?", a: "Kyllä. Täysi turva alle 10-vuotiaille autoille, joissa on alle 200 000 km. Rajoitettu turva 10–20-vuotiaille autoille tai 200 000–300 000 km." },
  { q: "Voinko peruuttaa?", a: "Kyllä. Sinulla on 14 päivän peruutusoikeus ilman kuluja ja ilman syytä." },
  { q: "Milloin sopimus alkaa?", a: "Sopimus alkaa tehdastakuun jälkeen eikä ole takautuva. Sopimus päättyy, kun auto täyttää 20 vuotta tai saavuttaa 300 000 km." },
  { q: "Kuka on Fragus?", a: "Fragus Group on eurooppalainen ajoneuvojen suojatuotteiden tarjoaja yli 20 vuoden kokemuksella. Akkuturva perustuu Fraguksen virallisiin GoSafe Electric -sopimusehtoihin." },
];

const FAQSection = () => (
  <section id="faq" className="py-20 px-6">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 mb-4">
          UKK
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
          Usein kysytyt kysymykset
        </h2>
      </div>
      <div className="space-y-2">
        {faqs.map(({ q, a }) => (
          <details key={q} className="group glass-card rounded-xl p-5 cursor-pointer hover:border-primary/30 transition-all">
            <summary className="flex items-center justify-between font-semibold text-foreground list-none">
              {q}
              <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform duration-200 flex-shrink-0 ml-4" />
            </summary>
            <p className="mt-3 text-muted-foreground leading-relaxed text-sm">{a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default FAQSection;
