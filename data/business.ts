import type { SiteMode } from "@/types";

export const siteMode: SiteMode =
  (process.env.NEXT_PUBLIC_SITE_MODE as SiteMode) || "demo";

/**
 * Single source of truth for all business facts. Never hardcode the
 * phone number, address, or links anywhere else in the codebase —
 * import from here. See PRODUCTION_CHECKLIST.md before going live.
 */
export const business = {
  name: "Fresh & Tasty Dordrecht",
  shortName: "Fresh & Tasty",
  phoneDisplay: "078 205 5001",
  phoneE164: "+31782055001",
  website: "https://freshtasty.nl",
  email: "",
  address: {
    street: "Leerparkpromenade",
    number: "160",
    postalCode: "3312 KW",
    city: "Dordrecht",
    country: "NL",
    verified: false,
    conflictNote:
      "A Google screenshot supplied by the owner displayed 'Maria Montessorilaan 160, 3312 KM Dordrecht', which conflicts with the address used on the current public site. 'Leerparkpromenade 160, 3312 KW Dordrecht' is used here as the seed/demo address because it is the address repeated by the current website and public listings. VERIFY THE CORRECT ADDRESS WITH THE OWNER BEFORE PRODUCTION.",
  },
  mapsUrl: "",
  uberEatsUrl: "",
  googleReviewUrl: "",
  googleRating: {
    score: 4.4,
    reviewCount: 14,
    verified: false,
    note: "Approximate values observed in an owner-supplied Google screenshot. These change constantly — do not treat as current. Replace with a live/verified source before production, or remove the number and link to Google reviews only.",
  },
  socials: {
    instagram: "",
    facebook: "",
  },
  kvk: "",
  vat: "",
  attributes: {
    dineIn: true,
    takeaway: true,
    delivery: false,
    catering: true,
    halalOptions: true,
    vegetarianOptions: true,
    veganOptions: true,
    childFriendly: true,
    kidsMenu: true,
    wheelchairAccessibleEntrance: true,
    wheelchairAccessibleSeating: true,
    wifi: true,
    freeWifi: true,
    contactlessPayment: true,
    cardPayment: true,
    parkingNote:
      "Betaald parkeren op straat in de omgeving. Controleer actuele parkeerregels voor Leerpark voordat dit als harde claim wordt gebruikt.",
    verified: false,
  },
} as const;

export type Business = typeof business;

/**
 * Throws in a production build when demo-only content is still active.
 * Call this from a build-time script (or a server module evaluated at
 * build time) so an accidental production deploy of fake business facts
 * fails loudly instead of shipping.
 */
export function validateProductionContent(): void {
  if (siteMode !== "production") return;

  const problems: string[] = [];

  if (!business.address.verified) {
    problems.push(
      "business.address.verified is false — the address conflict (Leerparkpromenade vs Maria Montessorilaan) has not been resolved."
    );
  }
  if (!business.mapsUrl) {
    problems.push("business.mapsUrl is empty.");
  }
  if (!business.googleReviewUrl) {
    problems.push("business.googleReviewUrl is empty.");
  }
  if (business.googleRating && !business.googleRating.verified) {
    problems.push(
      "business.googleRating is present but not marked verified for production."
    );
  }
  if (!business.attributes.verified) {
    problems.push(
      "business.attributes.verified is false — Google Business attributes (accessibility, wifi, parking, etc.) have not been confirmed with the owner."
    );
  }

  if (problems.length > 0) {
    throw new Error(
      `validateProductionContent failed:\n- ${problems.join("\n- ")}`
    );
  }
}
