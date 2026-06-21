-- =====================================================
-- product_prices: hintamatriisi tuote × tehoryhmä × kausi
-- =====================================================
CREATE TABLE public.product_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text NOT NULL,
  power_tier text CHECK (power_tier IN ('A', 'B')),
  term_months integer NOT NULL CHECK (term_months IN (12, 24, 36)),
  wholesale_price_net numeric(10,2) NOT NULL CHECK (wholesale_price_net >= 0),
  consumer_price_gross numeric(10,2) NOT NULL CHECK (consumer_price_gross >= 0),
  vat_rate numeric(5,4) NOT NULL DEFAULT 0.2550,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (product_id, power_tier, term_months)
);

GRANT SELECT ON public.product_prices TO anon, authenticated;
GRANT ALL ON public.product_prices TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.product_prices TO authenticated;

ALTER TABLE public.product_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read prices"
  ON public.product_prices FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert prices"
  ON public.product_prices FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update prices"
  ON public.product_prices FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete prices"
  ON public.product_prices FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_product_prices_updated_at
  BEFORE UPDATE ON public.product_prices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- pricing_settings: avain-arvo (osamaksun parametrit)
-- =====================================================
CREATE TABLE public.pricing_settings (
  key text PRIMARY KEY,
  value_numeric numeric(10,4),
  value_text text,
  description text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.pricing_settings TO anon, authenticated;
GRANT ALL ON public.pricing_settings TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.pricing_settings TO authenticated;

ALTER TABLE public.pricing_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read pricing settings"
  ON public.pricing_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can modify pricing settings"
  ON public.pricing_settings FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_pricing_settings_updated_at
  BEFORE UPDATE ON public.pricing_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- Seed: hinnat (sisäänosto ALV 0% → kuluttaja × 2 × 1,255)
-- =====================================================
-- Basic (Ryhmä A vain, <250kW). Ei sovi: LandRover, Jaguar, Porsche.
INSERT INTO public.product_prices (product_id, power_tier, term_months, wholesale_price_net, consumer_price_gross, notes) VALUES
  ('gosafe-basic', 'A', 12, 131.58, ROUND(131.58 * 2 * 1.255, 2), 'Alle 250 kW. Ei sovi: LandRover, Jaguar, Porsche.'),
  ('gosafe-basic', 'A', 24, 213.18, ROUND(213.18 * 2 * 1.255, 2), 'Alle 250 kW. Ei sovi: LandRover, Jaguar, Porsche.'),
  ('gosafe-basic', 'A', 36, 294.78, ROUND(294.78 * 2 * 1.255, 2), 'Alle 250 kW. Ei sovi: LandRover, Jaguar, Porsche.'),

-- Premium (Ryhmä A <200kW, B >200kW). Lataushybridi: polttom. + 60 kW.
  ('gosafe-premium', 'A', 12, 275.40, ROUND(275.40 * 2 * 1.255, 2), 'Alle 200 kW. Lataushybridi: polttomoottori + 60 kW.'),
  ('gosafe-premium', 'A', 24, 440.64, ROUND(440.64 * 2 * 1.255, 2), 'Alle 200 kW.'),
  ('gosafe-premium', 'A', 36, 606.90, ROUND(606.90 * 2 * 1.255, 2), 'Alle 200 kW.'),
  ('gosafe-premium', 'B', 12, 377.40, ROUND(377.40 * 2 * 1.255, 2), 'Yli 200 kW.'),
  ('gosafe-premium', 'B', 24, 542.64, ROUND(542.64 * 2 * 1.255, 2), 'Yli 200 kW.'),
  ('gosafe-premium', 'B', 36, 708.90, ROUND(708.90 * 2 * 1.255, 2), 'Yli 200 kW.'),

-- Electric (sähköautot, vain Ryhmä A). Järjestelmän kokonaisteho.
  ('gosafe-electric', 'A', 12, 377.40, ROUND(377.40 * 2 * 1.255, 2), 'Sähköautot. Järjestelmän kokonaisteho.'),
  ('gosafe-electric', 'A', 24, 542.64, ROUND(542.64 * 2 * 1.255, 2), 'Sähköautot.'),
  ('gosafe-electric', 'A', 36, 708.90, ROUND(708.90 * 2 * 1.255, 2), 'Sähköautot.'),

-- Premium & Battery (Ryhmä A <200kW, B >200kW). Lataushybridi: polttom. + 60 kW.
  ('gosafe-premium-battery', 'A', 12, 377.40, ROUND(377.40 * 2 * 1.255, 2), 'Alle 200 kW. Lataushybridi: polttomoottori + 60 kW.'),
  ('gosafe-premium-battery', 'A', 24, 644.64, ROUND(644.64 * 2 * 1.255, 2), 'Alle 200 kW.'),
  ('gosafe-premium-battery', 'A', 36, 912.90, ROUND(912.90 * 2 * 1.255, 2), 'Alle 200 kW.'),
  ('gosafe-premium-battery', 'B', 12, 479.40, ROUND(479.40 * 2 * 1.255, 2), 'Yli 200 kW.'),
  ('gosafe-premium-battery', 'B', 24, 746.64, ROUND(746.64 * 2 * 1.255, 2), 'Yli 200 kW.'),
  ('gosafe-premium-battery', 'B', 36, 1014.90, ROUND(1014.90 * 2 * 1.255, 2), 'Yli 200 kW.');

-- Seed: osamaksun parametrit
INSERT INTO public.pricing_settings (key, value_numeric, description) VALUES
  ('installment_annual_interest_rate', 0.0990, 'Osamaksun vuosikorko (9,9%)'),
  ('installment_handling_fee_per_invoice_gross', 14.99, 'Käsittelymaksu per lasku, sis. ALV 25,5% (€)'),
  ('vat_rate', 0.2550, 'Suomen yleinen arvonlisäverokanta (25,5%)');