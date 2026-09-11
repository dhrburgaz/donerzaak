import type { PaymentProvider, PaymentResult } from "@/types";

/**
 * Placeholder adapter. A real Mollie integration needs a server (this project
 * is currently a static export with no backend) to call the Mollie API with
 * a private API key and handle the webhook — see MOLLIE_INTEGRATION_GUIDE.md.
 * This intentionally throws so a misconfigured production build fails loudly
 * instead of silently pretending a payment succeeded.
 */
export class MolliePaymentProvider implements PaymentProvider {
  async createPayment(): Promise<PaymentResult> {
    throw new Error(
      "MolliePaymentProvider is not configured. This app is currently a static export with no server — " +
        "add a backend (e.g. /api/payments/create) that calls the Mollie API with a private key, then wire " +
        "this adapter to call that endpoint. See MOLLIE_INTEGRATION_GUIDE.md."
    );
  }
}
