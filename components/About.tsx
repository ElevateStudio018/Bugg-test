import { Reveal } from "./Reveal";
import { FaktaBox, type FaktaRow } from "./FaktaBox";
import { ArrowLabel, arrowLinkClasses } from "./Button";
import { about, company } from "@/lib/content";
import { toTelHref } from "@/lib/format";

const facts: FaktaRow[] = [
  { label: "Grundat", value: String(company.foundedYear) },
  { label: "Anställda", value: `Cirka ${company.employeeCountValue}` },
  { label: "Säte", value: `${company.address.city}, ${company.city}` },
  { label: "Verksamhet", value: "Mark- och grundarbeten" },
  { label: "Org.nr", value: company.orgNumber },
];

export function About() {
  return (
    <section id="om-oss" className="scroll-mt-20 bg-cream">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:px-8 lg:py-28">
        <Reveal>
          <h2 className="text-h2 text-ink lg:text-h2-lg">{about.heading}</h2>
          <p className="mt-6 text-copy font-semibold text-ink lg:text-[22px]">{about.subheading}</p>
          <div className="mt-6 space-y-4">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-copy text-coal">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-10">
            <a href="#kontakt" className={arrowLinkClasses("ink")}>
              <ArrowLabel>Kontakta oss</ArrowLabel>
            </a>
            <a href={toTelHref(company.phoneNational)} className="text-[18px] font-semibold text-ink transition-colors hover:text-moss">
              {company.phoneNational}
            </a>
          </div>
        </Reveal>

        <Reveal delayMs={120} className="lg:pt-2">
          <FaktaBox title="Fakta om oss" rows={facts} />
        </Reveal>
      </div>
    </section>
  );
}
