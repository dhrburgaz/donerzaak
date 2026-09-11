import { items } from "@/data/menu";
import type { CartLine } from "@/types";

export type ReorderResult = {
  addedCount: number;
  skipped: string[];
};

/** Restores previous cart lines, skipping items that no longer exist or are unavailable. */
export function reorderLines(
  lines: CartLine[],
  addLine: (line: Omit<CartLine, "lineId">) => void
): ReorderResult {
  const skipped: string[] = [];
  let addedCount = 0;

  for (const line of lines) {
    const menuItem = items.find((i) => i.id === line.itemId);
    if (!menuItem || !menuItem.available) {
      skipped.push(line.name);
      continue;
    }
    addLine({
      itemId: line.itemId,
      name: line.name,
      unitPrice: line.unitPrice,
      quantity: line.quantity,
      notes: line.notes,
      selections: line.selections,
    });
    addedCount++;
  }

  return { addedCount, skipped };
}
