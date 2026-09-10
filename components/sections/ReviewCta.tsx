import { business } from "@/data/business";

export function ReviewCta() {
  const fallbackSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    `${business.name} Google reviews`
  )}`;
  const reviewUrl = business.googleReviewUrl || fallbackSearchUrl;
  const rating = business.googleRating;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-cream/50 px-6 py-10 text-center">
        {rating && (
          <p className="font-display text-2xl font-bold text-forest">
            {rating.score.toFixed(1)} / 5
            <span className="ml-2 text-sm font-normal text-muted">
              ({rating.reviewCount} reviews{rating.verified ? "" : ", indicatief"})
            </span>
          </p>
        )}
        <a
          href={reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-semibold text-orange underline underline-offset-2"
        >
          Bekijk onze reviews op Google
        </a>
      </div>
    </section>
  );
}
