import type { PaymentProvider } from "@/types";
import { siteMode } from "@/data/business";
import { DemoPaymentProvider } from "./demo-provider";
import { MolliePaymentProvider } from "./mollie-provider";

/**
 * Config-driven provider selection so the UI never talks to Mollie
 * directly. Set NEXT_PUBLIC_PAYMENT_PROVIDER=mollie once a real backend
 * and MolliePaymentProvider implementation exist — see
 * MOLLIE_INTEGRATION_GUIDE.md.
 */
const configuredProvider = process.env.NEXT_PUBLIC_PAYMENT_PROVIDER || "demo";

export function getPaymentProvider(): PaymentProvider {
  if (siteMode === "production" && configuredProvider !== "mollie") {
    throw new Error(
      "Production mode requires NEXT_PUBLIC_PAYMENT_PROVIDER=mollie (with a configured backend). " +
        "Refusing to fall back to the demo payment provider in production."
    );
  }

  return configuredProvider === "mollie" ? new MolliePaymentProvider() : new DemoPaymentProvider();
}

export type { PaymentProvider };
