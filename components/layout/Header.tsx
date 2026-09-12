"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { CartBadge } from "@/components/ui/CartBadge";
import { mainNav, telHref } from "@/data/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, subtotal } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled ? "bg-warm-white/95 shadow-sm backdrop-blur" : "bg-warm-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Hoofdnavigatie">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-forest/10 text-forest" : "text-charcoal/80 hover:bg-charcoal/5"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Button href="/bestellen" size="sm">
              {itemCount > 0 ? `Bestelling · ${formatPrice(subtotal)}` : "Bestel nu"}
            </Button>
            <CartBadge count={itemCount} />
          </div>
          <div className="relative sm:hidden">
            <Button href="/bestellen" size="sm">
              Bestel
            </Button>
            <CartBadge count={itemCount} />
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-charcoal hover:bg-charcoal/5 lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

    </header>
    {open &&
      createPortal(
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-charcoal/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-nav"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobiele navigatie"
            className="absolute right-0 top-0 flex h-dvh w-full max-w-sm flex-col gap-6 bg-warm-white px-6 py-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-charcoal hover:bg-charcoal/5"
                aria-label="Sluit menu"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-1" aria-label="Mobiele hoofdnavigatie">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-charcoal hover:bg-charcoal/5"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
              <Button href="/bestellen" size="lg">
                Bestel nu
              </Button>
              <Button href={telHref} variant="outline" size="lg">
                Bel direct
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
