import type { MetadataRoute } from "next";
import { basePath } from "@/lib/base-path";
import { business } from "@/data/business";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: business.shortName,
    description:
      "Vers bereide döner, shoarma, grill en pizza in Dordrecht. Bestel online voor afhalen.",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    background_color: "#fff7ec",
    theme_color: "#173f32",
    lang: "nl",
    icons: [
      {
        src: `${basePath}/icons/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/icons/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/icons/icon-maskable-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
