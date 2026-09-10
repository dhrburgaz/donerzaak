import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

/**
 * SSR-safe "has the client taken over yet" flag, for values (like the
 * current time) that legitimately differ between server and client and
 * would otherwise cause a hydration mismatch.
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
