import type { Metadata } from "next";
import { Wordmark } from "@/components/Wordmark";
import { ReviewProposals, type ProposalReview } from "@/components/forslag/ReviewProposals";
import { list } from "@/lib/site/collection.ts";
import { fontFaceCss, getSite } from "@/lib/site/data.ts";
import { themeCss } from "@/lib/site/theme.ts";

// Fifteen designs for the reviews, for the customer to choose from: a page of its own that is not in the menu, the
// sitemap or search engines.
export const metadata: Metadata = {
  title: "Förslag: omdömen",
  robots: { index: false, follow: false },
};

export default function ReviewProposalsPage() {
  const site = getSite();
  const reviews: ProposalReview[] = list(site.pages).flatMap((page) =>
    list(page.sections).flatMap((section) =>
      section.type === "testimonials" ? list(section.items).map(({ id, name, quote, rating }) => ({ id, name, quote, rating: rating || 5 })) : [],
    ),
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontFaceCss() + themeCss(site.theme) }} />
      <div className="min-h-svh bg-page">
        <header className="bg-nav text-nav-text">
          <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Wordmark content={{ logo: site.settings.logo, name: site.company.shortName }} onDark />
            <p className="text-small text-nav-text/80">15 förslag på omdömen</p>
          </div>
        </header>
        <main id="innehall">{reviews.length > 0 ? <ReviewProposals reviews={reviews} /> : <p className="p-8">Inga omdömen.</p>}</main>
      </div>
    </>
  );
}
