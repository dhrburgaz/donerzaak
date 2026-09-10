import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { OpeningStatus } from "@/components/ui/OpeningStatus";
import { footerNav, legalNav, telHref } from "@/data/navigation";
import { business } from "@/data/business";

export function Footer() {
  const year = new Date().getFullYear();
  const addr = business.address;

  return (
    <footer className="mt-auto bg-forest text-warm-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-4 lg:col-span-1">
          <Logo dark />
          <p className="max-w-xs text-sm text-warm-white/75">
            Vers bereide döner, shoarma, grill en pizza in Dordrecht. Elke
            dag vers, altijd smaakvol.
          </p>
          {Object.values(business.socials).some(Boolean) && (
            <div className="flex gap-3 text-sm text-warm-white/75">
              {business.socials.instagram && (
                <a href={business.socials.instagram} className="hover:text-warm-white">
                  Instagram
                </a>
              )}
              {business.socials.facebook && (
                <a href={business.socials.facebook} className="hover:text-warm-white">
                  Facebook
                </a>
              )}
            </div>
          )}
        </div>

        <nav aria-label="Footer navigatie" className="flex flex-col gap-2">
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-warm-white/60">
            Navigatie
          </p>
          {footerNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-warm-white/85 hover:text-warm-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2">
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-warm-white/60">
            Contact
          </p>
          <a href={telHref} className="text-sm text-warm-white/85 hover:text-warm-white">
            {business.phoneDisplay}
          </a>
          <p className="text-sm text-warm-white/85">
            {addr.street} {addr.number}, {addr.postalCode} {addr.city}
          </p>
          <Link href="/contact" className="text-sm text-warm-white/85 hover:text-warm-white">
            Route &amp; openingstijden
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-warm-white/60">
            Openingstijden
          </p>
          <OpeningStatus className="text-sm text-warm-white/85" />
          <p className="mt-2 text-xs text-warm-white/50">
            {addr.verified
              ? null
              : "Adres en openingstijden worden nog definitief bevestigd door de eigenaar."}
          </p>
        </div>
      </div>

      <div className="border-t border-warm-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-warm-white/60 sm:flex-row sm:px-6 lg:px-8">
          <p>
            &copy; {year} {business.name}. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-4">
            {legalNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-warm-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
