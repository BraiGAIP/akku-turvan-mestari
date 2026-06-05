import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Mitä sopimus kattaa?", a: "Jatkoturva kattaa auton kalleimmat tekniset osat: moottorin, vaihteiston, voimansiirron, ohjainlaitteet, jarru- ja ohjausjärjestelmän, jäähdytyksen sekä sähköiset järjestelmät. Sähkö- ja hybridiautoissa myös korkeajänniteakun, latausjärjestelmän ja akun jäähdytyksen. Tarkka kattavuus riippuu valitusta turvatasosta." },
  { q: "Onko omavastuuta?", a: "Ei. Jatkoturvassa ei ole omavastuuta — korvattavat korjaukset maksetaan kokonaan korvausrajaan saakka (jopa 20 000 € sopimuskauden aikana)." },
  { q: "Miten toimin kun auto vikaantuu?", a: "Soita meille tai jätä ilmoitus verkkosivulla. Saat päätöksen tyypillisesti tunnissa. Vie auto haluamallesi korjaamolle Suomessa — me hyväksymme korjauksen ja maksamme suoraan korjaamolle. Sinun ei tarvitse maksaa mitään etukäteen." },
  { q: "Voinko siirtää sopimuksen uudelle omistajalle?", a: "Kyllä. Jatkoturva on siirrettävissä auton mukana uudelle omistajalle, mikä nostaa auton jälleenmyyntiarvoa. Ilmoita vain omistajanvaihdoksesta meille." },
  { q: "Onko sopimus voimassa ulkomailla?", a: "Kyllä. Sopimus on voimassa koko EU-alueella sekä muutamassa lähimaassa. Korvattavat korjaukset hyväksytään ulkomailla samalla periaatteella kuin Suomessa." },
  { q: "Kannattaako jatkoturva?", a: "Yksi yllättävä korjaus (moottori, vaihteisto, akku) maksaa tyypillisesti 3 000–20 000 €. Jatkoturva alkaen 19 €/kk on murto-osa tästä — ja korvausraja on jopa 20 000 € sopimuskauden aikana." },
  { q: "Mitä jatkoturva ei kata?", a: "Sopimus ei kata kuluvia osia (jarrupalat, renkaat), huoltoja, kolarivaurioita, ilkivaltaa, eikä vikoja, jotka ovat olleet olemassa ennen sopimuksen alkua. Tarkat rajoitukset löytyvät sopimusehdoista." },
  { q: "Sopiiko jatkoturva käytetylle autolle?", a: "Kyllä. Täysi turva alle 10-vuotiaille autoille, joissa on alle 200 000 km. Rajoitettu turva 10–20-vuotiaille autoille tai 200 000–300 000 km ajetuille." },
  { q: "Voinko peruuttaa sopimuksen?", a: "Kyllä. Sinulla on 14 päivän peruutusoikeus ilman kuluja ja ilman syytä." },
  { q: "Milloin sopimus alkaa?", a: "Sopimus alkaa heti maksun jälkeen tai tehdastakuun päättyessä. Sopimus ei ole takautuva, ja se päättyy viimeistään kun auto täyttää 20 vuotta tai saavuttaa 300 000 km." },
];

const FAQSection = () => (
  <section id="faq" className="py-20 px-6">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 mb-4">
          UKK
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
          Usein kysytyt kysymykset lisäturvasta
        </h2>

      </div>
      <div className="space-y-2">
        {faqs.map(({ q, a }) => (
          <details key={q} className="group glass-card rounded-xl p-5 cursor-pointer hover:border-primary/30 transition-all">
            <summary className="flex items-center justify-between font-semibold text-foreground list-none">
              <h3 className="text-base font-semibold">{q}</h3>
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
