import type { DayHours } from "@/types";

export const TIMEZONE = "Europe/Amsterdam";

/**
 * No verified opening hours exist yet for Fresh & Tasty Dordrecht (see
 * PRODUCTION_CHECKLIST.md). Leave this array empty rather than inventing
 * hours — the UI falls back to a "bekijk actuele openingstijden" link.
 * Once the owner confirms hours, fill this in, e.g.:
 *
 * export const openingHours: DayHours[] = [
 *   { day: 1, ranges: [{ open: "11:00", close: "21:30" }] }, // Monday
 *   { day: 2, ranges: [{ open: "11:00", close: "21:30" }] },
 *   ...
 *   { day: 0, closed: true }, // Sunday
 * ];
 */
export const openingHours: DayHours[] = [];

const DAY_NAMES_NL = [
  "zondag",
  "maandag",
  "dinsdag",
  "woensdag",
  "donderdag",
  "vrijdag",
  "zaterdag",
] as const;

function nowInAmsterdam(): Date {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(new Date());
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);
  return new Date(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second")
  );
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function getDay(dayIndex: number): DayHours | undefined {
  return openingHours.find((d) => d.day === dayIndex);
}

export function getTodayHours(): DayHours | undefined {
  const now = nowInAmsterdam();
  return getDay(now.getDay());
}

export function isOpenNow(): boolean {
  if (openingHours.length === 0) return false;
  const now = nowInAmsterdam();
  const today = getDay(now.getDay());
  if (!today || today.closed) return false;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return today.ranges.some(
    (r) => nowMinutes >= toMinutes(r.open) && nowMinutes < toMinutes(r.close)
  );
}

export function getClosingTime(): string | null {
  if (openingHours.length === 0) return null;
  const now = nowInAmsterdam();
  const today = getDay(now.getDay());
  if (!today || today.closed) return null;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const activeRange = today.ranges.find(
    (r) => nowMinutes >= toMinutes(r.open) && nowMinutes < toMinutes(r.close)
  );
  return activeRange?.close ?? null;
}

export function getNextOpeningTime(): { day: string; time: string } | null {
  if (openingHours.length === 0) return null;
  const now = nowInAmsterdam();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  for (let offset = 0; offset < 8; offset++) {
    const dayIndex = (now.getDay() + offset) % 7;
    const day = getDay(dayIndex);
    if (!day || day.closed) continue;
    const candidate = day.ranges.find((r) =>
      offset === 0 ? toMinutes(r.open) > nowMinutes : true
    );
    if (candidate) {
      return {
        day: offset === 0 ? "vandaag" : offset === 1 ? "morgen" : DAY_NAMES_NL[dayIndex],
        time: candidate.open,
      };
    }
  }
  return null;
}
