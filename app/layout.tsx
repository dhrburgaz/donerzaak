import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { CartProvider } from "@/lib/cart-context";
import { ToastProvider } from "@/lib/toast-context";
import { ItemDialogProvider } from "@/lib/item-dialog-context";
import { business } from "@/data/business";
import { JsonLd } from "@/components/JsonLd";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} — Döner, shoarma, grill en pizza in Dordrecht`,
    template: `%s | ${business.shortName}`,
  },
  description:
    "Vers bereide döner, shoarma, grill en pizza in Dordrecht. Bestel online voor afhalen, of vraag catering aan.",
  openGraph: {
    siteName: business.shortName,
    locale: "nl_NL",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#173F32",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="nl"
      data-scroll-behavior="smooth"
      className={`${bricolage.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-warm-white text-charcoal">
        <JsonLd />
        <a href="#main-content" className="skip-link">
          Ga naar de inhoud
        </a>
        <CartProvider>
          <ToastProvider>
            <ItemDialogProvider>
              <Header />
              <main id="main-content" className="flex-1 pb-20 lg:pb-0">
                {children}
              </main>
              <Footer />
              <MobileActionBar />
            </ItemDialogProvider>
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
