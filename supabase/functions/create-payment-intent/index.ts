import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@17.5.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const secretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!secretKey) {
      console.error("STRIPE_SECRET_KEY not configured");
      return json({ error: "Maksupalvelua ei ole konfiguroitu" }, 500);
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return json({ error: "Virheellinen JSON" }, 400);
    }

    const { amount, currency, productName, customerEmail } = body ?? {};

    if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
      return json({ error: "amount on virheellinen" }, 400);
    }
    if (typeof currency !== "string" || currency.length !== 3) {
      return json({ error: "currency on virheellinen" }, 400);
    }
    if (typeof productName !== "string" || !productName.trim()) {
      return json({ error: "productName puuttuu" }, 400);
    }
    if (
      typeof customerEmail !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)
    ) {
      return json({ error: "customerEmail on virheellinen" }, 400);
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: "2024-11-20.acacia",
      httpClient: Stripe.createFetchHttpClient(),
    });

    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: currency.toLowerCase(),
      receipt_email: customerEmail,
      description: productName,
      automatic_payment_methods: { enabled: true },
      metadata: { productName, customerEmail },
    });

    if (!intent.client_secret) {
      return json({ error: "PaymentIntentin luonti epäonnistui" }, 500);
    }

    return json({ clientSecret: intent.client_secret });
  } catch (e) {
    console.error("create-payment-intent error:", e);
    const message =
      e instanceof Error ? e.message : "Tuntematon virhe";
    return json({ error: message }, 500);
  }
});
