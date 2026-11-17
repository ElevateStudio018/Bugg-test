import type { Metadata } from "next";
import { Wordmark } from "@/components/Wordmark";
import { SuggestionForm } from "@/components/SuggestionForm";
import { fontFaceCss, getSite } from "@/lib/site/data.ts";
import { themeCss } from "@/lib/site/theme.ts";

// The staff's improvement suggestions: a page of its own that is not in the menu, the sitemap or search engines. Its words are
// the tool's own (like the admin's), not part of the site's content.
export const metadata: Metadata = {
  title: "Förbättringsförslag",
  robots: { index: false, follow: false },
};

export default function SuggestionsPage() {
  const site = getSite();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontFaceCss() + themeCss(site.theme) }} />
      <div className="min-h-svh bg-page">
        <header className="bg-nav text-nav-text">
          <div className="mx-auto max-w-content px-4 py-4 sm:px-6 lg:px-8">
            <Wordmark content={{ logo: site.settings.logo, name: site.company.shortName }} onDark />
          </div>
        </header>
        <main id="innehall" className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <p className="text-tag uppercase text-muted">För medarbetare på {site.company.shortName}</p>
          <h1 className="mt-4 text-display text-heading lg:text-display-lg">Förbättringsförslag</h1>
          <p className="mt-5 text-copy leading-relaxed text-body">
            Har du en idé om hur vi kan bli bättre? Skriv ditt namn, vad det gäller och ditt förslag.
          </p>
          <div className="mt-9 bg-card p-6 sm:p-8">
            <SuggestionForm />
          </div>
        </main>
      </div>
    </>
  );
}
