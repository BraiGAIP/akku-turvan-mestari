
-- 1) Block any non-admin from inserting into user_roles (restrictive)
DROP POLICY IF EXISTS "Only admins can insert roles" ON public.user_roles;
CREATE POLICY "Only admins can insert roles"
ON public.user_roles
AS RESTRICTIVE
FOR INSERT
TO anon, authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- 2) Tighten public INSERT on leads with basic validation
DROP POLICY IF EXISTS "Anyone can create leads" ON public.leads;
CREATE POLICY "Anyone can create leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(name) BETWEEN 1 AND 100
  AND (email IS NULL OR length(email) <= 255)
  AND (phone IS NULL OR length(phone) <= 40)
  AND (vehicle IS NULL OR length(vehicle) <= 120)
  AND (product_id IS NULL OR length(product_id) <= 80)
  AND (notes IS NULL OR length(notes) <= 2000)
  AND (source IS NULL OR length(source) <= 60)
);

-- 3) Tighten public INSERT on orders with basic validation
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
CREATE POLICY "Anyone can create orders"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(customer_name) BETWEEN 1 AND 120
  AND (customer_email IS NULL OR length(customer_email) <= 255)
  AND length(product_id) BETWEEN 1 AND 80
  AND length(product_name) BETWEEN 1 AND 160
  AND (notes IS NULL OR length(notes) <= 2000)
  AND (payment_method IS NULL OR length(payment_method) <= 40)
  AND (monthly_price IS NULL OR (monthly_price >= 0 AND monthly_price <= 100000))
  AND (total_price IS NULL OR (total_price >= 0 AND total_price <= 1000000))
);
