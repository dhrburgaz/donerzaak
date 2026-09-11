import { openingHours } from "@/data/opening-hours";

export type TimeSlot = { value: string; label: string };

const SLOT_INTERVAL_MINUTES = 15;
const FALLBACK_WINDOW_HOURS = 2;
const MIN_LEAD_MINUTES = 15;

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function formatMinutes(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  return `${pad(h)}:${pad(m)}`;
}

/**
 * True only when today's opening hours are actually configured — the
 * owner hasn't confirmed real hours yet (see data/opening-hours.ts), so
 * generatePlannedSlots() falls back to an honest "next couple of hours"
 * window instead of inventing closing times.
 */
export function hasVerifiedHoursToday(now = new Date()): boolean {
  const day = openingHours.find((d) => d.day === now.getDay());
  return !!day && !day.closed && day.ranges.length > 0;
}

export function generatePlannedSlots(now = new Date()): TimeSlot[] {
  const day = openingHours.find((d) => d.day === now.getDay());
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const earliest = nowMinutes + MIN_LEAD_MINUTES;

  const windows: { start: number; end: number }[] =
    day && !day.closed && day.ranges.length > 0
      ? day.ranges.map((r) => ({ start: toMinutes(r.open), end: toMinutes(r.close) }))
      : [{ start: earliest, end: earliest + FALLBACK_WINDOW_HOURS * 60 }];

  const slots: TimeSlot[] = [];
  for (const w of windows) {
    let t = Math.ceil(Math.max(w.start, earliest) / SLOT_INTERVAL_MINUTES) * SLOT_INTERVAL_MINUTES;
    while (t < w.end) {
      const label = formatMinutes(t);
      slots.push({ value: label, label });
      t += SLOT_INTERVAL_MINUTES;
    }
  }
  return slots;
}
