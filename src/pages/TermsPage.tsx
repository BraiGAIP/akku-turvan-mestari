import { Link } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import SeoHead from "@/components/SeoHead";

const TermsPage = () => (
  <div className="min-h-screen bg-background">
    <SeoHead
      title="Käyttöehdot | Jatkoturva"
      description="Jatkoturvan palvelun käyttöehdot. Lue sopimusehdot ennen akkuturvan ostamista."
      canonical="https://akkuturva.fi/kayttoehdot"
    />

    <nav className="fixed top-0 left-0 right-0 z-40 glass">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-extrabold text-gradient">Jatkoturva</span>
        </Link>
      </div>
    </nav>

    <article className="pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Etusivulle
        </Link>

        <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-8">Käyttöehdot</h1>
        <p className="text-xs text-muted-foreground mb-8">Päivitetty: 11.4.2026</p>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Yleistä</h2>
            <p>Nämä käyttöehdot koskevat Jatkoturva-palvelun käyttöä. Palvelun tarjoaa Jatkoturva yhteistyössä Fragus Group AB:n kanssa. Käyttämällä palvelua hyväksyt nämä ehdot.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Palvelun kuvaus</h2>
            <p>Jatkoturva tarjoaa sähköautojen akkujen suojatuotteita, jotka kattavat akun viat, kapasiteetin laskun ja muut ongelmat valitun turvatason mukaisesti. Turvatuotteet ovat vakuutustyylisiä sopimuksia, jotka Fragus Group AB hallinnoi.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Sopimuksen syntyminen</h2>
            <p>Sopimus syntyy, kun asiakas:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Täyttää ajoneuvotiedot ja yhteystiedot</li>
              <li>Valitsee turvatason</li>
              <li>Suorittaa maksun onnistuneesti</li>
              <li>Saa tilausvahvistuksen sähköpostiin</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Hinnat ja maksaminen</h2>
            <p>Hinnat näytetään sivustolla euroissa ja sisältävät ALV:n. Maksu suoritetaan valitulla maksutavalla (korttimaksu, Klarna tai Svea). Rahoitusvaihtoehdoissa korot ja ehdot ilmoitetaan ennen maksun vahvistamista.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Peruutusoikeus</h2>
            <p>Kuluttajalla on 14 päivän peruutusoikeus etämyyntilain mukaisesti. Peruutus tehdään ilmoittamalla siitä kirjallisesti osoitteeseen peruutus@akkuturva.fi. Maksettu summa palautetaan 14 päivän kuluessa peruutusilmoituksen vastaanottamisesta.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Turvan kattavuus ja rajoitukset</h2>
            <p>Turva astuu voimaan 30 päivän kuluttua ostopäivästä (odotusaika). Turva ei kata:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Tahallisesti aiheutettuja vahinkoja</li>
              <li>Valmistajan takuun piiriin kuuluvia vikoja</li>
              <li>Luvattomista muutostöistä aiheutuneita ongelmia</li>
              <li>Kosmeettisia vaurioita</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. Korvauksen hakeminen</h2>
            <p>Korvauksen hakeminen tapahtuu ottamalla yhteyttä asiakaspalveluun. Korvaus edellyttää valtuutetun korjaamon arviota ja dokumentointia. Korvaus maksetaan suoraan korjaamolle tai asiakkaalle turvatason ehtojen mukaisesti.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">8. Vastuunrajoitus</h2>
            <p>Jatkoturva ei vastaa välillisistä vahingoista. Korvauksen enimmäismäärä määräytyy valitun turvatason mukaan. Palveluntarjoaja ei vastaa force majeure -tilanteista johtuvista viivästyksistä.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">9. Sovellettava laki ja riidanratkaisu</h2>
            <p>Sopimukseen sovelletaan Suomen lakia. Erimielisyydet pyritään ratkaisemaan neuvottelemalla. Kuluttaja voi viedä asian kuluttajariitalautakunnan (KRIL) käsiteltäväksi. Viimesijaisena riidat ratkaistaan Helsingin käräjäoikeudessa.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">10. Ehtojen muutokset</h2>
            <p>Jatkoturva pidättää oikeuden muuttaa näitä ehtoja. Olennaisista muutoksista ilmoitetaan asiakkaille sähköpostitse vähintään 30 päivää ennen muutosten voimaantuloa.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">11. Yhteystiedot</h2>
            <p>Jatkoturva<br />
            asiakaspalvelu@akkuturva.fi<br />
            Yhteistyössä Fragus Group AB</p>
          </section>
        </div>
      </div>
    </article>

    <footer className="py-10 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center"><Shield className="w-4 h-4 text-primary-foreground" /></div>
          <span className="font-bold text-foreground">Jatkoturva</span>
        </Link>
        <p className="text-xs text-muted-foreground">© 2026 Jatkoturva</p>
      </div>
    </footer>
  </div>
);

export default TermsPage;
