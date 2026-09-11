import type { OrderPayload, OrderResult, PaymentResult } from "@/types";

const HISTORY_KEY = "freshtasty-orders";
const MAX_STORED_ORDERS = 20;

export type StoredOrder = {
  payload: OrderPayload;
  result: OrderResult;
  payment: PaymentResult;
  createdAt: string;
};

type HistoryMap = Record<string, StoredOrder>;

function readHistory(): HistoryMap {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as HistoryMap;
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function writeHistory(history: HistoryMap): void {
  try {
    const entries = Object.entries(history)
      .sort(([, a], [, b]) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, MAX_STORED_ORDERS);
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(Object.fromEntries(entries)));
  } catch {
    // localStorage unavailable — order history simply won't persist.
  }
}

export function saveOrder(orderNumber: string, order: StoredOrder): void {
  const history = readHistory();
  history[orderNumber] = order;
  writeHistory(history);
}

export function getOrder(orderNumber: string): StoredOrder | null {
  return readHistory()[orderNumber] ?? null;
}
