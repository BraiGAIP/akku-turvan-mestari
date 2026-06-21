import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Calculator, Info, Loader2, ShieldCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products as productCatalog } from "@/data/productData";

// ---------- Types ----------
interface PriceRow {
  product_id: string;
  power_tier: "A" | "B" | null;
  term_months: 12 | 24 | 36;
  consumer_price_gross: number;
  wholesale_price_net: number;
  notes: string | null;
}

interface SettingsMap {
  installment_annual_interest_rate: number; // e.g. 0.099
  installment_handling_fee_per_invoice_gross: number; // e.g. 14.99
  vat_rate: number; // e.g. 0.255
}

type PaymentMode = "once" | "installment";

interface Props {
  onStartFlow?: () => void;
}

// ---------- Helpers ----------
const formatEUR = (n: number) =>
  new Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(n);

/**
 * Annuity (kk-erä, korollinen tasaerä).
 *   M = P * r / (1 - (1 + r)^-n)
 *   r = vuosikorko / 12, n = kuukausien määrä
 * Palauttaa pelkän pääoma+korko-osuuden (ei käsittelymaksua).
 */
const annuityMonthly = (principal: number, annualRate: number, months: number) => {
  if (months <= 0) return 0;
  const r = annualRate / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
};

// Tehoryhmien ihmisluettavat selitteet tuotteittain
const tierLabel = (productId: string, tier: "A" | "B") => {
  if (productId === "gosafe-basic") {
    return tier === "A" ? "Alle 250 kW (polttomoottori)" : "Yli 250 kW";
  }
  // Premium & Premium&Battery
  return tier === "A" ? "Alle 200 kW" : "Yli 200 kW (suuritehoiset)";
};

// ---------- Component ----------
const PriceCalculator = ({ onStartFlow }: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prices, setPrices] = useState<PriceRow[]>([]);
  const [settings, setSettings] = useState<SettingsMap | null>(null);

  // Form state
  const [productId, setProductId] = useState<string>("gosafe-premium");
  const [tier, setTier] = useState<"A" | "B">("A");
  const [term, setTerm] = useState<12 | 24 | 36>(36);
  const [mode, setMode] = useState<PaymentMode>("installment");
  const [installmentMonths, setInstallmentMonths] = useState<number>(12);

  // ----- Load data -----
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [pricesRes, settingsRes] = await Promise.all([
          supabase
            .from("product_prices")
            .select("product_id, power_tier, term_months, consumer_price_gross, wholesale_price_net, notes")
            .order("product_id")
            .order("power_tier", { nullsFirst: true })
            .order("term_months"),
          supabase.from("pricing_settings").select("key, value_numeric"),
        ]);

        if (cancelled) return;

        if (pricesRes.error) throw pricesRes.error;
        if (settingsRes.error) throw settingsRes.error;

        setPrices(pricesRes.data as PriceRow[]);

        const s: Partial<SettingsMap> = {};
        for (const row of settingsRes.data ?? []) {
          if (row.key === "installment_annual_interest_rate")
            s.installment_annual_interest_rate = Number(row.value_numeric);
          if (row.key === "installment_handling_fee_per_invoice_gross")
            s.installment_handling_fee_per_invoice_gross = Number(row.value_numeric);
          if (row.key === "vat_rate") s.vat_rate = Number(row.value_numeric);
        }
        setSettings({
          installment_annual_interest_rate: s.installment_annual_interest_rate ?? 0.099,
          installment_handling_fee_per_invoice_gross:
            s.installment_handling_fee_per_invoice_gross ?? 14.99,
          vat_rate: s.vat_rate ?? 0.255,
        });
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Hintojen lataus epäonnistui";
        if (!cancelled) setError(msg);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Tuotteilla joilla on vain Ryhmä A → lukitse tier
  const availableTiersForProduct = useMemo(() => {
    const tiers = new Set(
      prices
        .filter((p) => p.product_id === productId && p.power_tier)
        .map((p) => p.power_tier as "A" | "B")
    );
    return Array.from(tiers).sort();
  }, [prices, productId]);

  // Korjaa tier jos tuotteenvaihdon jälkeen valittu tier ei ole olemassa
  useEffect(() => {
    if (availableTiersForProduct.length && !availableTiersForProduct.includes(tier)) {
      setTier(availableTiersForProduct[0]);
    }
  }, [availableTiersForProduct, tier]);

  // Etsi valittu hinta
  const selectedPrice = useMemo(() => {
    return prices.find(
      (p) =>
        p.product_id === productId &&
        p.term_months === term &&
        (availableTiersForProduct.length === 0 ? true : p.power_tier === tier)
    );
  }, [prices, productId, term, tier, availableTiersForProduct]);

  // Laskelmat
  const calc = useMemo(() => {
    if (!selectedPrice || !settings) return null;

    const principal = Number(selectedPrice.consumer_price_gross);

    if (mode === "once") {
      return {
        principal,
        monthlyInstallment: 0,
        handlingFee: 0,
        totalMonths: 0,
        total: principal,
        totalInterest: 0,
        totalHandling: 0,
      };
    }

    const n = installmentMonths;
    const monthlyPI = annuityMonthly(
      principal,
      settings.installment_annual_interest_rate,
      n
    );
    const handlingFee = settings.installment_handling_fee_per_invoice_gross;
    const monthlyTotal = monthlyPI + handlingFee;
    const total = monthlyTotal * n;
    const totalInterest = monthlyPI * n - principal;
    const totalHandling = handlingFee * n;

    return {
      principal,
      monthlyInstallment: monthlyTotal,
      monthlyPI,
      handlingFee,
      totalMonths: n,
      total,
      totalInterest,
      totalHandling,
    };
  }, [selectedPrice, settings, mode, installmentMonths]);

  // ----- UI -----
  if (loading) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" /> Ladataan hintoja…
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto rounded-2xl border border-destructive/30 bg-destructive/10 p-6 text-destructive">
          <div className="flex items-center gap-2 font-bold mb-1">
            <AlertTriangle className="w-5 h-5" /> Hintoja ei voitu ladata
          </div>
          <p className="text-sm">{error}</p>
        </div>
      </section>
    );
  }

  const productMeta = productCatalog.find((p) => p.id === productId);

  return (
    <section id="hintalaskuri" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-gradient bg-brand-gradient-soft mb-4">
            <Calculator className="w-3.5 h-3.5" /> Hintalaskuri
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
            Laske oman Jatkoturvasi hinta
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Valitse turvapaketti, sopimuksen pituus ja maksutapa. Hinnat sisältävät ALV 25,5 %.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 grid lg:grid-cols-2 gap-8">
          {/* ----- Inputs ----- */}
          <div className="space-y-6">
            {/* Tuote */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                Turvapaketti
              </label>
              <div className="grid grid-cols-1 gap-2">
                {productCatalog.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setProductId(p.id)}
                    className="admin-chip justify-start text-left"
                    data-selected={productId === p.id}
                  >
                    <span className="font-bold">{p.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{p.subtitle}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tehoryhmä */}
            {availableTiersForProduct.length > 1 && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                  Auton tehoryhmä
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableTiersForProduct.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTier(t)}
                      className="admin-chip justify-center text-center flex-col py-3"
                      data-selected={tier === t}
                    >
                      <span className="font-black text-base">Ryhmä {t}</span>
                      <span className="text-[11px] text-muted-foreground mt-0.5">
                        {tierLabel(productId, t)}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground mt-2 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  Lataushybridi: polttomoottorin tehoon lisätään 60 kW. Sähköautoilla
                  järjestelmän kokonaisteho.
                </p>
              </div>
            )}

            {/* Sopimuksen pituus */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                Sopimuksen pituus
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[12, 24, 36].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTerm(t as 12 | 24 | 36)}
                    className="admin-chip justify-center text-center"
                    data-selected={term === t}
                  >
                    <span className="font-black">{t} kk</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Maksutapa */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">
                Maksutapa
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode("once")}
                  className="admin-chip justify-center text-center"
                  data-selected={mode === "once"}
                >
                  <span className="font-bold">Kerralla</span>
                </button>
                <button
                  onClick={() => setMode("installment")}
                  className="admin-chip justify-center text-center"
                  data-selected={mode === "installment"}
                >
                  <span className="font-bold">Osamaksu</span>
                </button>
              </div>

              {mode === "installment" && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-muted-foreground">
                      Osamaksun pituus
                    </label>
                    <span className="text-lg font-black text-brand-gradient">
                      {installmentMonths} kk
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={36}
                    step={1}
                    value={installmentMonths}
                    onChange={(e) => setInstallmentMonths(Number(e.target.value))}
                    className="w-full accent-[#C44579]"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>3 kk</span><span>12 kk</span><span>24 kk</span><span>36 kk</span>
                  </div>
                  {settings && (
                    <p className="text-[11px] text-muted-foreground mt-3 flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      Vuosikorko {(settings.installment_annual_interest_rate * 100)
                        .toFixed(1)
                        .replace(".", ",")} %, käsittelymaksu{" "}
                      {formatEUR(settings.installment_handling_fee_per_invoice_gross)} /
                      lasku (sis. ALV).
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ----- Results ----- */}
          <div className="space-y-4">
            {!selectedPrice ? (
              <div className="rounded-xl border border-border/50 p-6 bg-muted/30 text-muted-foreground text-sm">
                Tälle valinnalle ei löydy hintaa. Tarkista tehoryhmä ja sopimuksen pituus.
              </div>
            ) : (
              <>
                <div className="rounded-xl border border-border/50 p-5 bg-muted/30">
                  <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-1">
                    {productMeta?.name} · {term} kk
                    {availableTiersForProduct.length > 1 && ` · Ryhmä ${tier}`}
                  </p>
                  <p className="text-3xl font-black text-foreground">
                    {formatEUR(Number(selectedPrice.consumer_price_gross))}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Kuluttajahinta, sis. ALV 25,5 %
                  </p>
                </div>

                {mode === "once" && calc && (
                  <div className="rounded-xl p-5 bg-brand-gradient-soft border border-[#C44579]/30">
                    <p className="text-xs uppercase tracking-wider font-bold text-brand-gradient mb-1">
                      Maksat kerralla
                    </p>
                    <p className="text-4xl font-black text-foreground">
                      {formatEUR(calc.total)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ei korkoja, ei käsittelymaksuja.
                    </p>
                  </div>
                )}

                {mode === "installment" && calc && (
                  <>
                    <div className="rounded-xl p-5 bg-brand-gradient-soft border border-[#C44579]/30">
                      <p className="text-xs uppercase tracking-wider font-bold text-brand-gradient mb-1">
                        Osamaksuerä {installmentMonths} kk
                      </p>
                      <p className="text-4xl font-black text-foreground">
                        {formatEUR(calc.monthlyInstallment)}{" "}
                        <span className="text-base font-bold text-muted-foreground">/ kk</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Sis. pääoma {formatEUR(calc.monthlyPI ?? 0)} + käsittely{" "}
                        {formatEUR(calc.handlingFee)}
                      </p>
                    </div>

                    <div className="rounded-xl border border-border/50 p-4 bg-card/50 text-sm">
                      <div className="flex justify-between py-1.5 border-b border-border/30">
                        <span className="text-muted-foreground">Sopimushinta</span>
                        <span className="font-semibold">{formatEUR(calc.principal)}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-border/30">
                        <span className="text-muted-foreground">Korot yhteensä</span>
                        <span className="font-semibold">{formatEUR(calc.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-border/30">
                        <span className="text-muted-foreground">
                          Käsittelymaksut ({installmentMonths} lasku)
                        </span>
                        <span className="font-semibold">{formatEUR(calc.totalHandling)}</span>
                      </div>
                      <div className="flex justify-between py-2 mt-1">
                        <span className="font-bold">Kokonaiskustannus</span>
                        <span className="font-black text-brand-gradient">
                          {formatEUR(calc.total)}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {onStartFlow && (
                  <Button
                    size="lg"
                    className="w-full h-12 rounded-full text-base btn-brand"
                    onClick={onStartFlow}
                  >
                    <ShieldCheck className="w-4 h-4 mr-1" />
                    Aloita tilaus
                  </Button>
                )}
              </>
            )}

            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Hinnoittelu perustuu valittuun tehoryhmään. Asiakas vastaa antamiensa tietojen
              oikeellisuudesta — jos auton todellinen teho on suurempi kuin sopimukseen
              merkitty, sopimuksen mukainen korvaus voidaan evätä. Tarkista auton kW-luku rekisteriotteesta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
