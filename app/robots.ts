import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteMode = process.env.NEXT_PUBLIC_SITE_MODE || "demo";

export default function robots(): MetadataRoute.Robots {
  if (siteMode !== "production") {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/checkout", "/bestelling/gelukt"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
