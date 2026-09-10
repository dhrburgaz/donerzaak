/**
 * Minimal analytics adapter. No analytics provider is wired up yet — this
 * currently only logs to the console in development. Swap the body of
 * `track` for a GA4 (or other) call once a real measurement ID exists.
 * Never hardcode a fake measurement ID here.
 */
export type AnalyticsEvent =
  | "order_clicked"
  | "menu_clicked"
  | "menu_item_viewed"
  | "add_to_cart"
  | "cart_viewed"
  | "checkout_started"
  | "demo_order_completed"
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
