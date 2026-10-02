import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaktaBox } from "@/components/FaktaBox";
import { QuoteTrigger } from "@/components/QuoteTrigger";
import { buttonClasses } from "@/components/Button";
import { ZoomImage } from "@/components/ZoomImage";
import { about, aboutFacts, aboutPage, company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Om oss",
  description: `${company.legalName} utför mark- och grundarbeten i ${company.serviceArea} sedan ${company.foundedYear}.`,
  alternates: { canonical: "/om-oss" },
};

export default function OmOssPage() {
  return (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-olive/20 sm:aspect-[2/1] lg:aspect-auto lg:h-[min(66vh,700px)]">
        <ZoomImage src={aboutPage.heroImage} className="absolute inset-0 h-full w-full object-cover object-[center_35%]" />
      </div>

      <div className="mx-auto max-w-content px-4 pb-14 pt-8 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24 lg:pt-10">
        <Breadcrumbs items={[{ label: "Hem", href: "/" }, { label: "Om oss" }]} />

        <div className="mt-4 grid grid-cols-1 gap-12 lg:mt-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <article>
            <h1 className="text-display text-ink lg:text-[56px] lg:leading-[1.08]">{about.heading}</h1>
            <p className="mt-3 text-copy font-semibold text-ink lg:mt-6 lg:text-[21px]">{about.subheading}</p>
            <div className="mt-4 space-y-4">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-copy text-coal lg:text-[18px]">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <aside className="lg:pt-3">
            <FaktaBox title="Fakta om oss" rows={aboutFacts} />
          </aside>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:mt-16">
          {aboutPage.photos.map((photo) => (
            <div key={photo.src} className="relative aspect-[4/5] overflow-hidden bg-olive/20 sm:aspect-[4/3]">
              <ZoomImage
                src={photo.src}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: photo.focus }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Olive text block, full-width photo, olive text block — one continuous band. */}
      <section className="bg-olive text-white">
        <div className="mx-auto max-w-content px-6 pb-6 pt-12 lg:px-8 lg:pb-16 lg:pt-24">
          <div className="max-w-3xl">
            <h2 className="text-h2 lg:text-h2-lg">{aboutPage.foundation.heading}</h2>
            <p className="mt-4 text-copy lg:mt-6 lg:text-lead">{aboutPage.foundation.text}</p>
            <Link href="/#tjanster" className={buttonClasses("light-outline", "mt-6 lg:mt-8")}>
              Se våra tjänster
            </Link>
          </div>
        </div>

        <div className="relative aspect-[3/2] w-full overflow-hidden bg-olive-dark sm:aspect-[2/1] lg:aspect-auto lg:h-[min(60vh,620px)]">
          <ZoomImage src={aboutPage.middleImage} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        </div>

        <div className="mx-auto max-w-content px-6 pb-16 pt-6 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="max-w-3xl">
            <h2 className="text-h2 lg:text-h2-lg">{aboutPage.together.heading}</h2>
            <p className="mt-4 text-copy lg:mt-6 lg:text-lead">{aboutPage.together.text}</p>
            <QuoteTrigger className={buttonClasses("light-outline", "mt-6 lg:mt-8")}>Få en kostnadsfri offert</QuoteTrigger>
          </div>
        </div>
      </section>
    </>
  );
}
