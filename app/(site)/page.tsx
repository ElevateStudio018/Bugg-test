import { JsonLd } from "@/components/site/JsonLd";
import { PageView } from "@/components/site/PageView";
import { getSite } from "@/lib/site/data.ts";
import { homePage } from "@/lib/site/pages.ts";
import { toE164 } from "@/lib/site/format.ts";
import { shareImageUrl } from "@/lib/site/seo.ts";

export default function HomePage() {
  const site = getSite();
  const { company } = site;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "@id": `${site.settings.siteUrl}/#business`,
          name: company.legalName,
          url: site.settings.siteUrl,
          image: shareImageUrl(site),
          ...(company.phone ? { telephone: toE164(company.phone) } : {}),
          ...(company.email ? { email: company.email } : {}),
          address: {
            "@type": "PostalAddress",
            streetAddress: company.address.street,
            postalCode: company.address.postalCode,
            addressLocality: company.address.city,
            addressCountry: company.address.country,
          },
          ...(company.address.geo
            ? { geo: { "@type": "GeoCoordinates", latitude: company.address.geo.lat, longitude: company.address.geo.lng } }
            : {}),
          areaServed: company.serviceArea,
          foundingDate: String(company.foundedYear),
          taxID: company.orgNumber,
          vatID: company.vatNumber,
        }}
      />
      <PageView page={homePage(site)} site={site} isHome />
    </>
  );
}
