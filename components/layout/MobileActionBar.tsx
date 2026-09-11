"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { telHref } from "@/data/navigation";
import { CartBadge } from "@/components/ui/CartBadge";

export function MobileActionBar() {
  const { itemCount, subtotal } = useCart();
  const pathname = usePathname();

  if (pathname.startsWith("/checkout")) return null;

  return (
    <nav
      aria-label="Snelle acties"
      className="fixed inset-x-0 bottom-0 z-40 flex items-stretch gap-1 border-t border-border bg-warm-white/95 px-2 pt-1.5 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0.375rem)" }}
    >
      <Link
        href="/menu"
        className="flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-xs font-medium text-charcoal/80"
      >
        <IconMenu />
        Menu
      </Link>
      <Link
        href="/bestellen"
        className="relative flex min-h-11 flex-[1.4] flex-col items-center justify-center gap-0.5 rounded-xl bg-orange py-1.5 text-xs font-semibold text-warm-white"
      >
        <IconCart />
        {itemCount > 0 ? `Bestelling · ${formatPrice(subtotal)}` : "Bestellen"}
        <CartBadge count={itemCount} />
      </Link>
      <a
        href={telHref}
        className="flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-xs font-medium text-charcoal/80"
      >
        <IconPhone />
        Bellen
      </a>
    </nav>
  );
}

function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}

function IconCart() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path
        d="M3 4h2l2.4 12.1a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path
        d="M5 4h3l1.5 4.5L7.5 10a11 11 0 0 0 6.5 6.5l1.5-2L20 16v3a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
