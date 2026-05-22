import { useState, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, ArrowLeft, ShieldCheck } from "lucide-react";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? ""
);

interface StripeCheckoutProps {
  amount: number;
  productName: string;
  clientSecret: string;
  onSuccess: () => void;
  onCancel: () => void;
}

function PaymentForm({
  amount,
  productName,
  onSuccess,
  onCancel,
}: {
  amount: number;
  productName: string;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      setIsSubmitting(true);
      setErrorMessage(null);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.href,
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message ?? "Maksun käsittelyssä tapahtui virhe.");
        setIsSubmitting(false);
      } else {
        onSuccess();
      }
    },
    [stripe, elements, onSuccess]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product summary */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
        <div>
          <p className="text-sm font-semibold text-foreground">{productName}</p>
          <p className="text-xs text-muted-foreground">Fraguksen jatkoturva</p>
        </div>
        <p className="text-lg font-black text-foreground">
          {amount.toLocaleString("fi-FI")} €
        </p>
      </div>

      {/* Payment element */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">
            Maksutiedot
          </h3>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <PaymentElement
            options={{
              layout: "tabs",
              defaultValues: {
                billingDetails: {
                  name: "",
                  email: "",
                  phone: "",
                },
              },
            }}
          />
        </div>
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
          {errorMessage}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="w-full h-12 rounded-xl text-base btn-glow"
        disabled={!stripe || !elements || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Vahvistetaan maksua...
          </>
        ) : (
          <>
            <ShieldCheck className="w-5 h-5" />
            Maksa turvallisesti {amount.toLocaleString("fi-FI")} €
          </>
        )}
      </Button>

      {/* Cancel */}
      <button
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
      >
        <ArrowLeft className="w-4 h-4" />
        Peruuta ja palaa takaisin
      </button>

      {/* Trust signals */}
      <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
          PCI-yhteensopiva
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
          SSL-salattu
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
          14 pv peruutusoikeus
        </span>
      </div>
    </form>
  );
}

export default function StripeCheckout({
  amount,
  productName,
  clientSecret,
  onSuccess,
  onCancel,
}: StripeCheckoutProps) {
  if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
    return (
      <div className="p-6 rounded-xl bg-card border border-border text-center">
        <p className="text-sm text-destructive">
          Stripe-julkinen avain puuttuu. Lisää se .env-tiedostoon.
        </p>
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: "night" as const,
      variables: {
        colorPrimary: "hsl(221 83% 53%)",
        colorBackground: "hsl(224 40% 10%)",
        colorText: "hsl(210 40% 96%)",
        colorDanger: "hsl(0 84% 60%)",
        borderRadius: "12px",
        spacingUnit: "4px",
      },
      rules: {
        ".Input": {
          borderColor: "hsl(224 20% 16%)",
          backgroundColor: "hsl(225 50% 6%)",
          color: "hsl(210 40% 96%)",
        },
        ".Input:focus": {
          borderColor: "hsl(221 83% 53%)",
          boxShadow: "0 0 0 2px hsl(221 83% 53% / 0.3)",
        },
        ".Label": {
          color: "hsl(218 15% 55%)",
          fontSize: "12px",
          fontWeight: "600",
        },
        ".Tab": {
          borderColor: "hsl(224 20% 16%)",
          backgroundColor: "hsl(225 50% 6%)",
          color: "hsl(210 40% 96%)",
        },
        ".Tab--selected": {
          borderColor: "hsl(221 83% 53%)",
          backgroundColor: "hsl(221 83% 53% / 0.1)",
          color: "hsl(210 40% 96%)",
        },
      },
    },
    loader: "auto" as const,
  };

  return (
    <Elements
      stripe={stripePromise}
      options={options}
      onReady={() => setStripeError(null)}
      onError={(error) => {
        if (error && "message" in error) {
          setStripeError(error.message ?? "Stripea ei voitu ladata.");
        }
      }}
    >
      <div className="w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-black text-foreground">
            Viimeistele maksu
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Turvallinen maksu Stripe-suojauksella
          </p>
        </div>

        {/* Card */}
        <div className="p-6 rounded-xl bg-card border border-border shadow-sm">
          {stripeError ? (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive text-center">
              {stripeError}
            </div>
          ) : (
            <PaymentForm
              amount={amount}
              productName={productName}
              onSuccess={onSuccess}
              onCancel={onCancel}
            />
          )}
        </div>
      </div>
    </Elements>
  );
}
