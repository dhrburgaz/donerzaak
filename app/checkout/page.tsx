import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutForm } from "@/components/order/CheckoutForm";

export const metadata: Metadata = {
  title: "Afrekenen",
  description: "Rond je demo-bestelling af bij Fresh & Tasty Dordrecht.",
  alternates: { canonical: "/checkout" },
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-10 sm:px-6 lg:px-8 lg:pb-10">
      <Link
        href="/bestellen"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal/70 hover:text-forest"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Terug naar je bestelling
      </Link>
      <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-orange">Afrekenen</p>
      <h1 className="mt-1 font-display text-3xl font-bold text-forest sm:text-4xl">
        Rond je bestelling af
      </h1>
      <div className="mt-8">
        <CheckoutForm />
      </div>
    </div>
  );
}
