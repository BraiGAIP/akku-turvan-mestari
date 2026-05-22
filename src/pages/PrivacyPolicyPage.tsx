import { Link } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import SeoHead from "@/components/SeoHead";

const PrivacyPolicyPage = () => (
  <div className="min-h-screen bg-background">
    <SeoHead
      title="Tietosuojaseloste | Jatkoturva"
      description="Jatkoturvan tietosuojaseloste. Lue miten käsittelemme henkilötietojasi GDPR:n mukaisesti."
      canonical="https://akkuturva.fi/tietosuoja"
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

        <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-8">Tietosuojaseloste</h1>
        <p className="text-xs text-muted-foreground mb-8">Päivitetty: 11.4.2026</p>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Rekisterinpitäjä</h2>
            <p>Jatkoturva (yhteistyössä Fragus Group AB:n kanssa)<br />
            Sähköposti: tietosuoja@akkuturva.fi</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Kerättävät tiedot</h2>
            <p>Keräämme seuraavia henkilötietoja:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Nimi ja yhteystiedot (sähköposti, puhelinnumero)</li>
              <li>Ajoneuvon tiedot (merkki, malli, vuosimalli, rekisterinumero)</li>
              <li>Maksutiedot (käsitellään kolmannen osapuolen maksunvälittäjän kautta)</li>
              <li>Evästetiedot ja sivuston käyttödata (analytiikka)</li>
              <li>AI-avustajan keskusteluhistoria</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. Tietojen käyttötarkoitus</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Jatkoturvapalvelun tarjoaminen ja hallinta</li>
              <li>Tilausten käsittely ja asiakaspalvelu</li>
              <li>Palvelun kehittäminen ja parantaminen</li>
              <li>Lakisääteisten velvoitteiden täyttäminen</li>
              <li>Markkinointi (vain suostumuksella)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Oikeusperuste (GDPR Art. 6)</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong className="text-foreground">Sopimus</strong> – Palvelun tuottaminen asiakkaalle</li>
              <li><strong className="text-foreground">Suostumus</strong> – Markkinointi ja analytiikkaevästeet</li>
              <li><strong className="text-foreground">Oikeutettu etu</strong> – Palvelun kehittäminen ja tietoturva</li>
              <li><strong className="text-foreground">Lakisääteinen velvoite</strong> – Kirjanpito ja verotus</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Tietojen säilytys</h2>
            <p>Henkilötietoja säilytetään niin kauan kuin asiakassuhde on voimassa ja sen jälkeen lakisääteisten velvoitteiden edellyttämän ajan (tyypillisesti 6 vuotta kirjanpitolain mukaan). Evästetiedot poistetaan 12 kuukauden kuluessa.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Tietojen siirto ja luovutus</h2>
            <p>Tietoja voidaan siirtää seuraaville tahoille:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Fragus Group AB – vakuutuskumppani</li>
              <li>Maksunvälittäjät (Klarna, Svea)</li>
              <li>Analytiikkapalvelut (anonymisoitu data)</li>
            </ul>
            <p className="mt-2">Tietoja ei siirretä EU/ETA-alueen ulkopuolelle ilman asianmukaisia suojatoimia (GDPR Art. 46).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. Rekisteröidyn oikeudet</h2>
            <p>Sinulla on oikeus:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Tarkastaa sinusta kerätyt tiedot</li>
              <li>Pyytää tietojen oikaisua tai poistamista</li>
              <li>Rajoittaa tietojen käsittelyä</li>
              <li>Siirtää tietosi toiselle palveluntarjoajalle</li>
              <li>Peruuttaa suostumuksesi milloin tahansa</li>
              <li>Tehdä valitus tietosuojavaltuutetulle (tietosuoja.fi)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">8. Evästeet</h2>
            <p>Käytämme seuraavia evästetyyppejä:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong className="text-foreground">Välttämättömät</strong> – Sivuston perustoiminnot (aina käytössä)</li>
              <li><strong className="text-foreground">Analytiikka</strong> – Käyttäjäkokemuksen parantaminen (suostumuksella)</li>
              <li><strong className="text-foreground">Markkinointi</strong> – Kohdennettu mainonta (suostumuksella)</li>
            </ul>
            <p className="mt-2">Voit hallita evästeasetuksiasi milloin tahansa sivuston evästebannerin kautta.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">9. Tietoturva</h2>
            <p>Suojaamme tietojasi teknisillä ja organisatorisilla toimenpiteillä, mukaan lukien tietojen salaus, pääsynhallinta ja säännölliset tietoturva-auditoinnit.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">10. Yhteydenotto</h2>
            <p>Tietosuojaan liittyvät tiedustelut:<br />
            tietosuoja@akkuturva.fi</p>
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

export default PrivacyPolicyPage;
