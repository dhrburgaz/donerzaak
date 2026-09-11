import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderDetail } from "@/components/order/OrderDetail";

export const metadata: Metadata = {
  title: "Bestelstatus",
  robots: { index: false },
};

export default function OrderDetailPage() {
  return (
    <Suspense fallback={null}>
      <OrderDetail />
    </Suspense>
  );
}
