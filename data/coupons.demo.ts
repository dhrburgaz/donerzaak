import type { Coupon } from "@/types";

/**
 * DEMO COUPONS — for the sales demo only, validated entirely client-side.
 * There is no backend to enforce real redemption limits across devices;
 * "first order only" and usage limits are approximated via
 * localStorage (see lib/coupons.ts). Replace with a real, server-validated
 * coupon system before production — see PRODUCTION_CHECKLIST.md.
 */
export const demoCoupons: Coupon[] = [
  {
    code: "WELKOM10",
    type: "percentage",
    value: 10,
    description: "10% korting op je eerste bestelling",
    firstOrderOnly: true,
  },
  {
    code: "GRATISBEZORGING",
    type: "free-delivery",
    value: 0,
    description: "Gratis bezorging",
    minOrder: 15,
  },
  {
    code: "FRESH5",
    type: "fixed",
    value: 5,
    description: "€5 korting",
    minOrder: 20,
  },
];
