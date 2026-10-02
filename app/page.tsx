import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { MapSection } from "@/components/MapSection";
import { UppdragSection } from "@/components/UppdragSection";
import { StatsBand } from "@/components/StatsBand";
import { GroundworkFeature } from "@/components/GroundworkFeature";
import { PromoSection } from "@/components/PromoSection";
import { About } from "@/components/About";
import { ProcessSection } from "@/components/ProcessSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/ContactSection";
import { company } from "@/lib/content";
import { toTelHref } from "@/lib/format";

const siteUrl = "https://www.markmontagebeab.se";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: company.legalName,
  url: siteUrl,
  telephone: toTelHref(company.phoneNational).replace("tel:", ""),
  ...(company.email ? { email: company.email } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    postalCode: company.address.postalCode,
    addressLocality: company.address.city,
    addressCountry: company.address.country,
  },
  areaServed: company.serviceArea,
  foundingDate: String(company.foundedYear),
  taxID: company.orgNumber,
  vatID: company.vatNumber,
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <ServicesSection />
      <UppdragSection />
      <StatsBand />
      <GroundworkFeature />
      <PromoSection />
      <About />
      <ProcessSection />
      <FaqSection />
      <ContactSection />
      <MapSection />
    </>
  );
}
