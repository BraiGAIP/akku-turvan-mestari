## Hallintapaneeli (Admin Dashboard)

Rakennan suojatun hallintapaneelin osoitteeseen `/admin`, jossa on autentikaatio, roolipohjainen pääsynvalvonta ja perus-CRM.

### URL
- **Kirjautuminen:** `/admin/login`
- **Hallintapaneeli:** `/admin` (vaatii admin-roolin)
- Pääsy vain käyttäjille joilla on `admin`-rooli.

### Backend (Lovable Cloud)

**Autentikaatio**
- Email + salasana (auto-confirm päällä, jotta admin pääsee heti sisään ilman sähköpostivahvistusta)
- Ensimmäinen rekisteröitynyt käyttäjä saa automaattisesti `admin`-roolin (trigger)

**Taulut**
- `profiles` — käyttäjäprofiilit (display_name)
- `user_roles` — roolit erillisessä taulussa (`admin`, `user`), `has_role()` security definer -funktio
- `leads` — liidit: nimi, sähköposti, puhelin, ajoneuvo, status (`new`/`contacted`/`qualified`/`lost`/`won`), muistiinpanot, lähde
- `orders` — tilaukset: asiakas, tuote (productId), kk-hinta, kokonaissumma, status (`pending`/`paid`/`active`/`cancelled`), maksutapa
- `customers` — asiakkaat: nimi, email, puhelin, osoite

**RLS**
- Kaikki taulut: vain admin näkee ja muokkaa (käyttäen `has_role(auth.uid(), 'admin')`)
- `leads` INSERT sallittu kaikille (jotta julkiset lomakkeet voivat luoda liidejä)

### Frontend

**Layout**
- Sidebar-navigaatio: Yleiskatsaus, Liidit, Tilaukset, Asiakkaat, Asetukset
- Mobile-responsiivinen, collapsible sidebar
- Tumma teema joka sopii AkkuTurvan brändiin

**Sivut**
1. **Overview** — KPI-kortit (uudet liidit tänään, avoimet tilaukset, kuukauden liikevaihto, konversio-%) + viimeaikaiset liidit/tilaukset
2. **Leads** — taulukko, suodatus statuksen mukaan, statuksen muutos, muistiinpanojen lisäys, poisto
3. **Orders** — taulukko, statuksen päivitys, asiakas- ja tuotetiedot
4. **Customers** — taulukko, haku, yhteystietojen muokkaus
5. **Login** — admin-kirjautuminen

### Tekniset yksityiskohdat
- shadcn `sidebar`, `table`, `dialog`, `badge`, `select` komponentit
- React Router: `/admin/*` lisätään `App.tsx`:ään, suojattu `ProtectedRoute`-komponentilla joka tarkistaa session + admin-roolin
- Supabase `onAuthStateChange` ennen `getSession()`:ä
- Käytetään olemassa olevia `productData.ts`-tietoja tilauksissa

### Mitä EI tehdä tässä vaiheessa
- Ei Stripe-integraatiota tilausten luontiin (käytetään manuaalista syöttöä + olemassa olevaa checkout-flowta)
- Ei sähköposti-ilmoituksia
- Ei edistynyttä analytiikkaa/kaavioita (voidaan lisätä myöhemmin)

Hyväksytkö suunnitelman? Sen jälkeen luon tietokantamuutokset ja koodin.