import { Icon, type IconKey } from "./Icon";
import { QuoteForm } from "./QuoteForm";
import { company } from "@/lib/content";
import { toTelHref } from "@/lib/format";

interface ContactRow {
  icon: IconKey;
  label: string;
  value: string;
  href?: string;
}

const rows: ContactRow[] = [
  { icon: "Phone", label: "Telefon", value: company.phoneNational, href: toTelHref(company.phoneNational) },
  ...(company.email ? [{ icon: "Mail" as const, label: "E-post", value: company.email, href: `mailto:${company.email}` }] : []),
  { icon: "MapPin", label: "Adress", value: company.address.full },
];

export function ContactSection() {
  return (
    <section id="kontakt" className="scroll-mt-20">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 lg:px-8 lg:py-28">
        <div>
          <h2 className="text-h2 text-ink lg:text-h2-lg">Kontakta oss</h2>
          <p className="mt-5 text-copy text-coal lg:text-lead">
            Hör av dig för en kostnadsfri offert, så återkommer vi så snart vi kan.
          </p>

          <ul className="mt-9 space-y-6">
            {rows.map((row) => (
              <li key={row.label} className="flex items-start gap-5">
                <Icon name={row.icon} strokeWidth={2.25} className="mt-1 h-7 w-7 shrink-0 text-olive" />
                <div>
                  <p className="text-[15px] font-semibold text-ash">{row.label}</p>
                  {row.href ? (
                    <a href={row.href} className="text-[20px] font-semibold text-ink transition-colors hover:text-olive">
                      {row.value}
                    </a>
                  ) : (
                    <p className="text-[20px] font-semibold text-ink">{row.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-9 text-[15px] text-ash">Org.nr {company.orgNumber}</p>
        </div>

        <div>
          <div className="bg-cream p-6 sm:p-8 lg:p-10">
            <h3 className="text-[24px] font-semibold leading-tight text-ink">Begär offert</h3>
            <div className="mt-6">
              <QuoteForm variant="inline" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
