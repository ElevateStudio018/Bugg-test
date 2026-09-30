import type { Metadata } from "next";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { QuoteModal } from "@/components/QuoteModal";
import { ConfirmationToast } from "@/components/ConfirmationToast";
import { QuoteModalProvider } from "@/contexts/QuoteModalContext";
import { company, intro } from "@/lib/content";

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
      <body className="bg-white text-dark antialiased">
        <QuoteModalProvider>
          <TopBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <QuoteModal />
          <ConfirmationToast />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
