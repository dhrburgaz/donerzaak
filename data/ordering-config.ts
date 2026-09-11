/**
 * Central demo ordering config. All values are DEMO placeholders the owner
 * must confirm before production — see PRODUCTION_CHECKLIST.md. Amounts are
 * in euros (see lib/format.ts), rounded to cents via Math.round(x*100)/100
 * wherever they're combined with percentages, matching lib/coupons.ts.
 */
export const orderingConfig = {
  minimumDeliveryOrder: 15,
  deliveryFee: 2.95,
  freeDeliveryFrom: 35,
  pickupFee: 0,
  estimatedPickupMinutes: [20, 30] as [number, number],
  estimatedDeliveryMinutes: [35, 50] as [number, number],
};
