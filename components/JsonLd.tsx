import { business } from "@/data/business";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * Restaurant structured data, restricted to config-verified facts. Address,
 * geo coordinates, and rating are intentionally omitted while
 * business.address.verified / business.googleRating.verified are false —
 * see PRODUCTION_CHECKLIST.md. Never add aggregateRating, review, or geo
 * fields here without a verified source.
 */
export function JsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: business.name,
    url: siteUrl,
    telephone: business.phoneE164,
    servesCuisine: ["Turkish", "Middle Eastern", "Pizza", "Grill"],
    priceRange: undefined,
  };

  if (business.address.verified) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: `${business.address.street} ${business.address.number}`,
      postalCode: business.address.postalCode,
      addressLocality: business.address.city,
      addressCountry: business.address.country,
    };
  }

  const clean = JSON.parse(JSON.stringify(data));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(clean) }}
    />
  );
}
