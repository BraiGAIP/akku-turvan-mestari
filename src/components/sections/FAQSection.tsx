import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Mitkä tuotteet Jatkoturva myy?",
    a: "Jatkoturva on Fragus Warranty Finland Oy:n virallinen jälleenmyyjä ja myy KAIKKI neljä GOSafe-kunnossapitosopimusta: Basic (edullinen perusturva), Premium (kattava polttomoottori- ja hybridiautoille), Electric (täyssähköautot, sisältää korkeajänniteakun), sekä Premium & Battery (Premium-suoja yhdistettynä akkuturvaan lataushybrideille).",
  },
  {
    q: "Mikä on Basic- ja Premium-turvan ero?",
    a: "Basic kattaa moottorin ja voimansiirron sisäiset osat ja maksaa vähemmän — korjauskatto on 2 500–4 000 € sopimuskaudesta riippuen, eikä omavastuuta ole. Premium kattaa lisäksi ohjainlaitteet, turbon, polttoaine- ja pakokaasujärjestelmän, jäähdytyksen ja sähkölaitteet, korjauskatto on 6 000–15 000 € ja omavastuu 100 € / vika. Premium soveltuu useimmille — Basic on järkevä vanhempaan tai edullisempaan autoon.",
  },
  {
    q: "Kenelle GOSafe Electric on tarkoitettu?",
    a: "Täyssähköauton (BEV) omistajalle. Se kattaa sähköajomoottorin, ohjainlaitteen, korkeajänniteakun (myös kapasiteetin laskun alle 70 %), latausjärjestelmän, DC/DC- ja DC/AC-muuntimet, akun jäähdytyksen, turvalaitteet ja jarrut. Akun kapasiteetin laskua varten Fragus tekee kirjallisen kapasiteettitestin sopimuksen alkaessa.",
  },
  {
    q: "Mikä on Premium & Battery -tuote?",
    a: "Se yhdistää Premium-turvan ja sähköauton korkeajänniteakun yhteen pakettiin. Tarkoitettu lataushybridille (PHEV) tai sähköautolle, jossa on myös polttomoottorikomponentteja. Saat samalla kertaa täyden polttomoottoripuolen turvan ja akkuturvan.",
  },
  {
    q: "Onko omavastuuta?",
    a: "Basic-turvassa ei ole omavastuuta lainkaan. Premium-, Electric- ja Premium & Battery -tuotteissa omavastuu on 100 € per vika ja se maksetaan korjaamolle. Kaikissa muissa kuluissa Fragus maksaa hyväksytyn korjauksen suoraan korjaamolle korjauskattoon saakka.",
  },
  {
    q: "Mitkä ovat korjauskatot sopimuskausittain?",
    a: "Basic: 12 kk 2 500 €, 24 kk 3 000 €, 36 kk 4 000 €. Premium / Electric / Premium & Battery (alle 10-vuotias, alle 200 000 km): 12 kk 6 000 €, 24 kk 10 000 €, 36 kk 15 000 €. Vanhemmille autoille tai yli 200 000 km ajaneille sovelletaan rajoitettua sisältöä ja matalampia kattoja (3 000–5 000 €).",
  },
  {
    q: "Mille autoille turva sopii?",
    a: "Auto saa olla enintään 20 vuotta vanha ja siinä saa olla enintään 300 000 km. Täysi sisältö koskee alle 10-vuotiaita autoja, joissa on alle 200 000 km. Tämän jälkeen sovelletaan rajoitettua sisältöä (B-osat). Auton on oltava vikaton sopimuksen alkaessa eikä se saa olla vakuutusyhtiön lunastama (Premium/Electric/Premium & Battery).",
  },
  {
    q: "Miten toimin kun auto vikaantuu?",
    a: "Tee vikailmoitus Fraguksen verkkolomakkeen kautta ENNEN auton viemistä korjaamolle. Fragus osoittaa korjaamon, missä korjaus tehdään. Korjaamo saa laskutusluvan Frakselta — sinun ei tarvitse maksaa muuta kuin mahdollinen omavastuu (100 € Premium/Electric/Premium & Battery -tuotteissa).",
  },
  {
    q: "Voinko siirtää sopimuksen uudelle omistajalle?",
    a: "Kyllä. Sopimus seuraa ajoneuvoa ja siirtyy uudelle omistajalle yksityiskaupassa. Tämä nostaa auton jälleenmyyntiarvoa. Sopimus päättyy kuitenkin, jos ajoneuvo myydään elinkeinonharjoittajalle tai vakuutusyhtiö lunastaa sen.",
  },
  {
    q: "Onko sopimus voimassa ulkomailla?",
    a: "Kyllä. Sopimus on voimassa koko Euroopassa. Korvattavat korjaukset hyväksytään ulkomailla samalla periaatteella kuin Suomessa — vikailmoitus tehdään aina ensin Fragukselle.",
  },
  {
    q: "Mitä turva EI kata?",
    a: "Kuluvia osia (jarrupalat, renkaat, hihnojen kulumat), normaalia huoltoa, kolarivaurioita, ilkivaltaa, vesivaurioita, käyttövirheitä, rakenne- tai ohjelmistomuutoksia, vakuutusten/tehdastakuun piiriin kuuluvia vikoja, eikä vikoja jotka olivat olemassa ennen sopimuksen alkua. Välilliset kulut (sijaisauto, hinaus, majoitus) eivät sisälly, mutta sijaisauto ja hinaus voi liittää sopimukseen maksullisena lisäpalveluna.",
  },
  {
    q: "Voinko peruuttaa sopimuksen?",
    a: "Kyllä. Sinulla on 14 päivän peruutusoikeus etämyyntilain mukaisesti, ilman kuluja ja ilman syytä.",
  },
  {
    q: "Milloin sopimus alkaa?",
    a: "Sopimus alkaa heti maksun jälkeen. Jos auton tehdastakuu on vielä voimassa, sopimus alkaa tehdastakuun päättyessä. Sopimusta EI voi aktivoida takautuvasti.",
  },
];

const FAQSection = () => (
  <section id="faq" className="py-20 px-6">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 mb-4">
          UKK
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
          Usein kysytyt kysymykset Fragus GOSafe -lisäturvasta
        </h2>
      </div>
      <div className="space-y-2">
        {faqs.map(({ q, a }) => (
          <details key={q} className="group glass-card rounded-xl p-5 cursor-pointer hover:border-primary/30 transition-all">
            <summary className="flex items-center justify-between font-semibold text-foreground list-none">
              <h3 className="text-base font-semibold">{q}</h3>
              <ChevronDown className="w-5 h-5 text-primary group-open:rotate-180 transition-transform duration-200 flex-shrink-0 ml-4" />
            </summary>
            <p className="mt-3 text-muted-foreground leading-relaxed text-sm">{a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default FAQSection;
