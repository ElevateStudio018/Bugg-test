import { Icon } from "./Icon";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { QuoteForm } from "./QuoteForm";
import { company } from "@/lib/content";
import { toIntlDisplay, toTelHref } from "@/lib/format";

const mapQuery = encodeURIComponent(company.address.full);
const mapEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
const mapLinkHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

export function ContactMap() {
  return (
    <section id="kontakt" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <Reveal className="max-w-2xl">
          <Eyebrow index={5} label="Kontakta oss" className="mb-5" />
          <h2 className="text-h2-mobile text-dark lg:text-h2">Kontakta oss</h2>
          <p className="mt-4 text-base leading-relaxed text-gray-body">
            Hör av dig för en kostnadsfri offert, så återkommer vi så snart vi kan.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
          <Reveal>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Icon name="Phone" className="mt-0.5 h-5 w-5 shrink-0 text-dark" />
                <div>
                  <p className="text-sm font-medium text-dark">Telefon</p>
                  <a href={toTelHref(company.phoneNational)} className="text-base text-gray-body transition-colors hover:text-dark">
                    {toIntlDisplay(company.phoneNational)}
                  </a>
                </div>
              </li>
              {company.email && (
                <li className="flex items-start gap-3">
                  <Icon name="Mail" className="mt-0.5 h-5 w-5 shrink-0 text-dark" />
                  <div>
                    <p className="text-sm font-medium text-dark">E-post</p>
                    <a href={`mailto:${company.email}`} className="break-all text-base text-gray-body transition-colors hover:text-dark">
                      {company.email}
                    </a>
                  </div>
                </li>
              )}
              <li className="flex items-start gap-3">
                <Icon name="MapPin" className="mt-0.5 h-5 w-5 shrink-0 text-dark" />
                <div>
                  <p className="text-sm font-medium text-dark">Adress</p>
                  <p className="text-base text-gray-body">{company.address.full}</p>
                </div>
              </li>
            </ul>
            <p className="mt-6 text-[13px] text-gray-body">Org.nr: {company.orgNumber}</p>
          </Reveal>

          <Reveal delayMs={100}>
            <QuoteForm variant="inline" />
          </Reveal>

          <Reveal delayMs={150} className="lg:col-span-2">
            <div className="relative aspect-video w-full overflow-hidden border border-dark/10">
              <iframe
                src={mapEmbedSrc}
                title={`Karta till ${company.legalName}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
            <a
              href={mapLinkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-dark transition-colors hover:text-steel"
            >
              Öppna i Google Maps
              <Icon name="ExternalLink" className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
