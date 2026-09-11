/**
 * Minimal analytics adapter. No analytics provider is wired up yet — this
 * currently only logs to the console in development. Swap the body of
 * `track` for a GA4 (or other) call once a real measurement ID exists.
 * Never hardcode a fake measurement ID here.
 */
export type AnalyticsEvent =
  | "order_clicked"
  | "bestellen_clicked"
  | "menu_clicked"
  | "menu_item_viewed"
  | "modifier_selected"
  | "add_to_cart"
  | "cart_viewed"
  | "cart_opened"
  | "cart_item_edited"
  | "cart_item_removed"
  | "checkout_started"
  | "fulfillment_selected"
  | "address_completed"
  | "timeslot_selected"
  | "payment_method_selected"
  | "promo_applied"
  | "tip_selected"
  | "order_reviewed"
  | "demo_order_submitted"
  | "demo_order_completed"
  | "reorder_clicked"
  | "checkout_error"
  | "phone_clicked"
  | "route_clicked"
  | "catering_started"
  | "catering_submitted"
  | "google_reviews_clicked"
  | "feedback_submitted";

export function track(event: AnalyticsEvent, data?: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event, data ?? {});
  }
}
