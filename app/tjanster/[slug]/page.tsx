import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { IndexList } from "@/components/IndexList";
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

      <section className="bg-dark px-6 pb-16 pt-32 sm:px-10 sm:pb-20 sm:pt-40 lg:px-16 lg:pb-24 lg:pt-48">
        <Eyebrow label="Tjänster" light className="mb-5" />
        <h1 className="max-w-3xl text-h2-mobile text-white lg:text-h1">{service.name}</h1>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-base leading-relaxed text-gray-body sm:text-lg">{service.description[0]}</p>
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
        <div className="mx-auto max-w-content px-4 pb-20 sm:px-6 lg:px-8 lg:pb-32">
          <Reveal>
            <Eyebrow label="Fler tjänster" className="mb-5" />
            <h2 className="text-h2-mobile text-dark lg:text-h2">Fler tjänster</h2>
          </Reveal>
          <div className="mt-10">
            <IndexList
              items={otherServices.map((item) => ({
                key: item.slug,
                icon: item.icon,
                title: item.name,
                description: item.shortDescription,
                href: `/tjanster/${item.slug}`,
              }))}
            />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
