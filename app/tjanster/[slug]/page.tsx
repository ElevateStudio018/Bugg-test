import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlaceholderArt } from "@/components/PlaceholderArt";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { FinalCta } from "@/components/FinalCta";
import { services, getServiceBySlug } from "@/lib/services";
import { company } from "@/lib/content";

const siteUrl = "https://www.flottsundsbygg.se";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  const title = `${service.name} i ${company.city}`;
  const description = service.shortDescription;

  return {
    title,
    description,
    alternates: { canonical: `/tjanster/${service.slug}` },
    openGraph: {
      title: `${title} | ${company.legalName}`,
      description,
      url: `${siteUrl}/tjanster/${service.slug}`,
      type: "website",
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const otherServices = services.filter((item) => item.slug !== service.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: `${service.name} – ${company.legalName}`,
    description: service.shortDescription,
    areaServed: company.serviceArea,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: company.legalName,
      telephone: `+46${company.phoneNational.replace(/[^\d]/g, "").replace(/^0/, "")}`,
      email: company.email,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="pt-16 lg:pt-20">
        <div className="aspect-[16/9] w-full lg:aspect-[21/9]">
          <PlaceholderArt
            icon={service.icon}
            alt={`${company.legalName} — ${service.name} i ${company.city}`}
            className="h-full w-full"
          />
        </div>
      </div>

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <Reveal>
              <h1 className="text-h2-mobile text-dark lg:text-h1">{service.name}</h1>
              <p className="mt-6 text-base leading-relaxed text-gray-body sm:text-lg">{service.description[0]}</p>
            </Reveal>

            {service.description.length > 1 && (
              <Reveal delayMs={80} className="mt-6 space-y-4">
                {service.description.slice(1).map((paragraph, index) => (
                  <p key={index} className="text-base leading-relaxed text-gray-body">
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 pb-16 sm:px-6 lg:px-8 lg:pb-28">
          <Reveal>
            <h2 className="text-h2-mobile text-dark lg:text-h2">Fler tjänster</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((item, index) => (
              <Reveal key={item.slug} delayMs={(index % 3) * 80}>
                <ServiceCard service={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
