import type { Metadata } from "next";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/500.css";
import "@fontsource/figtree/600.css";
import "@fontsource/figtree/700.css";
import "@fontsource/figtree/800.css";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuoteModal } from "@/components/QuoteModal";
import { ConfirmationToast } from "@/components/ConfirmationToast";
import { QuoteModalProvider } from "@/contexts/QuoteModalContext";
import { company, intro } from "@/lib/content";
import { services } from "@/lib/services";

const siteUrl = "https://www.markmontagebeab.se";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.legalName} | Mark- och grundarbeten i Kungälv & Göteborg`,
    template: `%s | ${company.legalName}`,
  },
  description: intro.lead,
  openGraph: {
    title: `${company.legalName} | Mark- och grundarbeten i Kungälv & Göteborg`,
    description: intro.lead,
    url: siteUrl,
    siteName: company.legalName,
    locale: "sv_SE",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className="bg-sand font-sans text-coal antialiased">
        {/* For keyboard and screen reader users: straight past the header to the page's own content. */}
        <a
          href="#innehall"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[300] focus:rounded-full focus:bg-white focus:px-6 focus:py-3 focus:text-label focus:uppercase focus:text-olive focus:shadow-lg focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
        >
          Hoppa till innehållet
        </a>
        <QuoteModalProvider>
          <Navbar services={services.map(({ slug, name }) => ({ slug, name }))} />
          <main id="innehall" tabIndex={-1} className="pt-16 outline-none sm:pt-20">
            {children}
          </main>
          <Footer />
          <QuoteModal />
          <ConfirmationToast />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
