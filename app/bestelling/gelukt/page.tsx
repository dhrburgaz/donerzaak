import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderConfirmation } from "@/components/order/OrderConfirmation";

export const metadata: Metadata = {
  title: "Bestelling geplaatst",
  robots: { index: false },
};

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={null}>
      <OrderConfirmation />
    </Suspense>
  );
}
