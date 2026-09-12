import type { CartLine } from "@/types";
import { items } from "@/data/menu";

export type UnavailableLine = {
  line: CartLine;
  reason: "removed" | "unavailable";
};

/**
 * The cart persists in localStorage, so a line added on an earlier visit
 * can outlive a menu update: the item may since have been marked
 * unavailable, or removed from the menu entirely. Cross-check against the
 * current menu data before letting checkout proceed.
 */
export function findUnavailableLines(lines: CartLine[]): UnavailableLine[] {
  return lines.flatMap((line): UnavailableLine[] => {
    const current = items.find((i) => i.id === line.itemId);
    if (!current) return [{ line, reason: "removed" }];
    if (!current.available) return [{ line, reason: "unavailable" }];
    return [];
  });
}
