"use client";

import { useCallback, useSyncExternalStore } from "react";

const FAVORITES_KEY = "freshtasty-favorites";
const listeners = new Set<() => void>();
const EMPTY: ReadonlySet<string> = new Set();
let cache: ReadonlySet<string> | null = null;

function readFavorites(): ReadonlySet<string> {
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeFavorites(favorites: ReadonlySet<string>) {
  cache = favorites;
  try {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
  } catch {
    // localStorage unavailable — favorites simply won't persist.
  }
  listeners.forEach((listener) => listener());
}

export function toggleFavorite(itemId: string) {
  const favorites = new Set(cache ?? readFavorites());
  if (favorites.has(itemId)) {
    favorites.delete(itemId);
  } else {
    favorites.add(itemId);
  }
  writeFavorites(favorites);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): ReadonlySet<string> {
  if (cache === null) {
    cache = readFavorites();
  }
  return cache;
}

function getServerSnapshot(): ReadonlySet<string> {
  return EMPTY;
}

/** Client-only hook: current favorite item IDs plus a toggle function.
 * SSR-safe — returns an empty set until hydrated on the client. */
export function useFavorites(): { favorites: ReadonlySet<string>; toggle: (itemId: string) => void } {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const toggle = useCallback((itemId: string) => toggleFavorite(itemId), []);
  return { favorites, toggle };
}
