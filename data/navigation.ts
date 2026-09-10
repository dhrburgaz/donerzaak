import type { NavItem } from "@/types";
import { business } from "@/data/business";

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Bestellen", href: "/bestellen" },
  { label: "Catering", href: "/catering" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Bestellen", href: "/bestellen" },
  { label: "Catering", href: "/catering" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Privacybeleid", href: "/privacybeleid" },
  { label: "Algemene voorwaarden", href: "/algemene-voorwaarden" },
];

export const telHref = `tel:${business.phoneE164}`;
