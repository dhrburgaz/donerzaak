import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { QuickActions } from "@/components/sections/QuickActions";
import { Bestsellers } from "@/components/sections/Bestsellers";
import { WhyFreshTasty } from "@/components/sections/WhyFreshTasty";
import { MenuTeaser } from "@/components/sections/MenuTeaser";
import { OrderingCta } from "@/components/sections/OrderingCta";
import { CateringTeaser } from "@/components/sections/CateringTeaser";
import { ReviewCta } from "@/components/sections/ReviewCta";
import { LocationSection } from "@/components/sections/LocationSection";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Fresh & Tasty Dordrecht — Döner, shoarma, grill & pizza",
  description:
    "Vers bereide döner, shoarma, grill en Turkse pizza in Dordrecht. Bestel online voor afhalen of vraag catering aan.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickActions />
      <Bestsellers />
      <WhyFreshTasty />
      <MenuTeaser />
      <OrderingCta />
      <CateringTeaser />
      <ReviewCta />
      <LocationSection />
      <FinalCta />
    </>
  );
}
