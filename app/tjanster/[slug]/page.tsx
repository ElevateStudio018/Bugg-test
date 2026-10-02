import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { AccentBlock } from "@/components/AccentBlock";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaktaBox } from "@/components/FaktaBox";
import { ServiceCard } from "@/components/ServiceCard";
import { QuoteTrigger } from "@/components/QuoteTrigger";
import { buttonClasses, tapTarget } from "@/components/Button";
import { ZoomImage } from "@/components/ZoomImage";
import { services, getServiceBySlug } from "@/lib/services";
import { company } from "@/lib/content";
import { toTelHref } from "@/lib/format";
import { responsiveImage } from "@/lib/photos";

const siteUrl = "https://www.markmontagebeab.se";

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
      ...(company.email ? { email: company.email } : {}),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative aspect-[16/9] w-full overflow-hidden bg-olive/20 lg:aspect-auto lg:h-[min(56vh,600px)]">
        <ZoomImage {...responsiveImage(service.image, "100vw")} priority parallax="top" className="absolute inset-0 h-full w-full object-cover" />
      </div>

      <div className="mx-auto max-w-content px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8 lg:pb-28 lg:pt-10">
        {/* The text rises into place one part after another as the page loads, as on the homepage. */}
        <div className="animate-rise [animation-delay:150ms]">
          <Breadcrumbs items={[{ label: "Hem", href: "/" }, { label: "Tjänster", href: "/#tjanster" }, { label: service.name }]} />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <article>
            <span className="inline-block animate-rise bg-olive px-4 py-[11px] text-tag uppercase text-white [animation-delay:250ms]">
              Tjänst
            </span>
            <h1 className="mt-4 animate-rise text-[38px] font-semibold leading-[1.1] tracking-[-0.01em] text-ink [animation-delay:330ms] lg:text-[56px]">
              {service.name}
            </h1>
            <p className="mt-6 animate-rise text-copy text-coal [animation-delay:410ms] lg:text-[21px]">{service.shortDescription}</p>
            <div className="mt-6 animate-rise space-y-5 [animation-delay:490ms]">
              {service.description.map((paragraph) => (
                <p key={paragraph} className="text-copy text-coal lg:text-[18px]">
                  {paragraph}
                </p>
              ))}
            </div>

            <AccentBlock className="mt-12">
              <h2 className="text-h2 text-ink lg:text-[38px]">Har du ett markprojekt på gång?</h2>
              <p className="mt-4 text-copy text-coal">
                Kontakta oss för ett kostnadsfritt hembesök, så går vi igenom förutsättningarna tillsammans.
              </p>
              <QuoteTrigger className={buttonClasses("olive", "mt-7")}>Begär offert</QuoteTrigger>
            </AccentBlock>
          </article>

          <aside className="animate-rise space-y-6 [animation-delay:550ms] lg:pt-14">
            <FaktaBox
              title="Fakta om tjänsten"
              rows={[
                { label: "Tjänst", value: service.name },
                { label: "Utförs av", value: company.legalName },
                { label: "Säte", value: `${company.address.city}, ${company.city}` },
                { label: "Område", value: company.serviceArea },
                { label: "Org.nr", value: company.orgNumber },
              ]}
            />

            <div className="bg-cream px-6 py-7 sm:px-8 sm:py-8">
              <p className="text-[22px] font-semibold leading-tight text-ink">{company.legalName}</p>
              <p className="mt-1 text-[17px] text-coal">Mark- och grundarbeten sedan {company.foundedYear}</p>
              <ul className="mt-6 space-y-6 text-[18px] text-ink">
                <li>
                  <a href={toTelHref(company.phoneNational)} className={`${tapTarget} flex items-center gap-4 transition-colors hover:text-olive`}>
                    <Icon name="Phone" strokeWidth={2.25} className="h-6 w-6 shrink-0 text-olive" />
                    {company.phoneNational}
                  </a>
                </li>
                {company.email && (
                  <li>
                    <a href={`mailto:${company.email}`} className={`${tapTarget} flex items-center gap-4 transition-colors hover:text-olive`}>
                      <Icon name="Mail" strokeWidth={2.25} className="h-6 w-6 shrink-0 text-olive" />
                      <span className="break-all">{company.email}</span>
                    </a>
                  </li>
                )}
                <li className="flex items-start gap-4">
                  <Icon name="MapPin" strokeWidth={2.25} className="mt-0.5 h-6 w-6 shrink-0 text-olive" />
                  {company.address.full}
                </li>
              </ul>
              <QuoteTrigger className={buttonClasses("olive", "mt-8 w-full")}>Begär offert</QuoteTrigger>
            </div>

            <Link href="/#tjanster" className={buttonClasses("olive-outline", "w-full")}>
              Tillbaka till tjänster
            </Link>
          </aside>
        </div>
      </div>

      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <Reveal>
            <h2 className="text-h2 text-ink lg:text-h2-lg">Fler tjänster</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 xl:grid-cols-3">
            {otherServices.map((item, index) => (
              <Reveal key={item.slug} delayMs={(index % 3) * 70}>
                <ServiceCard service={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
