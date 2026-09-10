/**
 * Demo digital stamp card — entirely client-side (localStorage), no
 * account or backend required. Configurable defaults per the masterplan:
 * 10 qualifying orders = a demo reward. Replace with a real, server-backed
 * loyalty system (tied to paid/completed orders, with fraud protection and
 * admin correction/audit log) before production — see
 * PRODUCTION_CHECKLIST.md.
 */
export const STAMPS_REQUIRED = 10;
export const REWARD_DESCRIPTION = "€10 korting op je bestelling";

const STAMP_STORAGE_KEY = "freshtasty-loyalty-stamps";

function readTotal(): number {
  try {
    const raw = window.localStorage.getItem(STAMP_STORAGE_KEY);
    const value = raw ? parseInt(raw, 10) : 0;
    return Number.isFinite(value) && value >= 0 ? value : 0;
  } catch {
    return 0;
  }
}

function toCardCount(total: number): number {
  if (total <= 0) return 0;
  const remainder = total % STAMPS_REQUIRED;
  return remainder === 0 ? STAMPS_REQUIRED : remainder;
}

/** Current card's stamp count (1..STAMPS_REQUIRED, 0 if none yet). A full
 * card (STAMPS_REQUIRED) means the reward is ready to redeem. */
export function getStampCount(): number {
  return toCardCount(readTotal());
}

/** Increments the stamp count after a completed demo order and returns
 * the new count within the current card. */
export function incrementStamp(): number {
  try {
    const next = readTotal() + 1;
    window.localStorage.setItem(STAMP_STORAGE_KEY, String(next));
    return toCardCount(next);
  } catch {
    return 0;
  }
}
