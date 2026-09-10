import type { Metadata } from "next";
import { CheckoutForm } from "@/components/order/CheckoutForm";

export const metadata: Metadata = {
  title: "Afrekenen",
  description: "Rond je demo-bestelling af bij Fresh & Tasty Dordrecht.",
  alternates: { canonical: "/checkout" },
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-orange">Afrekenen</p>
      <h1 className="mt-1 font-display text-3xl font-bold text-forest sm:text-4xl">
        Rond je bestelling af
      </h1>
      <div className="mt-8">
        <CheckoutForm />
      </div>
    </div>
  );
}
