import type { OrderPayload, OrderResult, OrderProvider } from "@/types";
import { siteMode } from "@/data/business";

/**
 * Demo order provider. Generates a local order number and never sends
 * the order anywhere or charges money. Forbidden in production mode —
 * see validateProductionContent() and PRODUCTION_CHECKLIST.md.
 */
export class DemoOrderProvider implements OrderProvider {
  async submitOrder(order: OrderPayload): Promise<OrderResult> {
    if (siteMode === "production") {
      throw new Error(
        "DemoOrderProvider cannot be used in production mode. Integrate a real OrderProvider (custom API, Uber Eats/external order URL, or a payment provider such as Mollie/Stripe/iDEAL) before launch."
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 600));

    const orderNumber = `DEMO-${Date.now().toString(36).toUpperCase()}`;

    console.debug("[demo-order]", orderNumber, order);

    return {
      success: true,
      orderNumber,
      demo: true,
    };
  }
}

/**
 * Placeholder adapter for a future real provider. Wire this up to a
 * custom API, Uber Eats/external order URL, or a payment provider
 * (Mollie/Stripe/iDEAL) before production. It intentionally throws so a
 * misconfigured production build fails loudly instead of silently
 * pretending to place an order.
 */
export class RealOrderProvider implements OrderProvider {
  async submitOrder(): Promise<OrderResult> {
    throw new Error(
      "RealOrderProvider is not configured. Connect a real ordering backend before using this provider."
    );
  }
}

export function getOrderProvider(): OrderProvider {
  return siteMode === "production" ? new RealOrderProvider() : new DemoOrderProvider();
}
