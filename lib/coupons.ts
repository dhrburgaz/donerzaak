import type { AppliedCoupon, FulfillmentMethod } from "@/types";
import { demoCoupons } from "@/data/coupons.demo";

const FIRST_ORDER_FLAG_KEY = "freshtasty-has-ordered";

export function hasOrderedBefore(): boolean {
  try {
    return window.localStorage.getItem(FIRST_ORDER_FLAG_KEY) === "1";
  } catch {
    return false;
  }
}

export function markOrderPlaced(): void {
  try {
    window.localStorage.setItem(FIRST_ORDER_FLAG_KEY, "1");
  } catch {
    // localStorage unavailable — first-order tracking simply won't persist.
  }
}

type ValidateArgs = {
  subtotal: number;
  fulfillment: FulfillmentMethod;
};

export function validateCoupon(
  rawCode: string,
  { subtotal, fulfillment }: ValidateArgs
): { coupon: AppliedCoupon } | { error: string } {
  const code = rawCode.trim().toUpperCase();
  if (!code) return { error: "Vul een couponcode in." };

  const coupon = demoCoupons.find((c) => c.code === code);
  if (!coupon) return { error: "Deze couponcode is niet geldig." };

  if (coupon.expiresAt && new Date(coupon.expiresAt).getTime() < Date.now()) {
    return { error: "Deze coupon is verlopen." };
  }

  if (coupon.minOrder && subtotal < coupon.minOrder) {
    return {
      error: `Deze coupon geldt vanaf een bestelling van ${coupon.minOrder.toFixed(2).replace(".", ",")} euro.`,
    };
  }

  if (coupon.firstOrderOnly && hasOrderedBefore()) {
    return { error: "Deze coupon geldt alleen bij je eerste bestelling." };
  }

  if (coupon.type === "free-delivery" && fulfillment !== "bezorgen") {
    return { error: "Deze coupon geldt alleen bij bezorgen." };
  }

  let discountAmount = 0;
  if (coupon.type === "percentage") {
    discountAmount = Math.round(subtotal * (coupon.value / 100) * 100) / 100;
  } else if (coupon.type === "fixed") {
    discountAmount = Math.min(coupon.value, subtotal);
  }

  return {
    coupon: {
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      description: coupon.description,
      discountAmount,
    },
  };
}
