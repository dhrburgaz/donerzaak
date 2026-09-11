import type { CreatePaymentInput, PaymentProvider, PaymentResult } from "@/types";
import { siteMode } from "@/data/business";

const PAY_AT_PICKUP_METHODS = new Set(["pin", "contant"]);

/**
 * Simulates a payment without contacting any real payment network. No card,
 * bank, or wallet credentials are collected or transmitted. See
 * MOLLIE_INTEGRATION_GUIDE.md for what replaces this in production.
 */
export class DemoPaymentProvider implements PaymentProvider {
  async createPayment(input: CreatePaymentInput): Promise<PaymentResult> {
    if (siteMode === "production") {
      throw new Error(
        "DemoPaymentProvider cannot be used in production mode. Configure NEXT_PUBLIC_PAYMENT_PROVIDER=mollie and a real MolliePaymentProvider before launch."
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const payAtPickup = PAY_AT_PICKUP_METHODS.has(input.method);

    return {
      success: true,
      status: payAtPickup ? "pending" : "paid",
      reference: `DEMO-PAY-${Date.now().toString(36).toUpperCase()}`,
    };
  }
}
