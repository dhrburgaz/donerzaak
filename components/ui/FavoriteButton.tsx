"use client";

import { useFavorites } from "@/lib/favorites";

export function FavoriteButton({
  itemId,
  itemName,
  className = "",
}: {
  itemId: string;
  itemName: string;
  className?: string;
}) {
  const { favorites, toggle } = useFavorites();
  const active = favorites.has(itemId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggle(itemId);
      }}
      aria-pressed={active}
      aria-label={active ? `${itemName} is een favoriet, klik om te verwijderen` : `Markeer ${itemName} als favoriet`}
      className={`flex items-center justify-center rounded-full bg-warm-white/90 shadow transition-colors ${
        active ? "text-red" : "text-charcoal hover:text-red"
      } ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[55%] w-[55%]"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          d="M12 20.5s-7.5-4.6-10-9.3C.4 8 2 4.5 5.4 4c2-.3 3.9.6 5 2.2C11.5 4.6 13.4 3.7 15.4 4c3.4.5 5 4 3.4 7.2-2.5 4.7-10 9.3-10 9.3Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
