import Link from "next/link";
import { Icon } from "./Icon";
import { Topography } from "./Topography";
import { QuoteTrigger } from "./QuoteTrigger";
import { buttonClasses } from "./Button";
import { company, footerCopyright } from "@/lib/content";
import { services } from "@/lib/services";
import { toTelHref } from "@/lib/format";

const companyLinks = [
  { label: "Om oss", href: "/om-oss" },
  { label: "Uppdrag", href: "/projekt" },
  { label: "Så går det till", href: "/#process" },
  { label: "Vanliga frågor", href: "/#faq" },
  { label: "Kontakt", href: "/#kontakt" },
];

const headingClass = "text-[26px] font-semibold leading-tight";
const linkClass = "text-[18px] text-white transition-colors hover:text-white/70";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-olive text-white">
      <Topography className="pointer-events-none absolute -bottom-40 -right-48 h-[620px] w-[620px] text-white/[0.09] sm:-right-24" />

      <div className="relative mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-10">
          <div>
            <h2 className={headingClass}>Kontakt</h2>
            <ul className="mt-6 space-y-5 text-[20px] leading-snug">
              <li>
                <a href={toTelHref(company.phoneNational)} className="flex items-center gap-5 transition-colors hover:text-white/70">
                  <Icon name="Phone" strokeWidth={2.25} className="h-7 w-7 shrink-0 text-white/60" />
                  {company.phoneNational}
                </a>
              </li>
              {company.email && (
                <li>
                  <a href={`mailto:${company.email}`} className="flex items-center gap-5 transition-colors hover:text-white/70">
                    <Icon name="Mail" strokeWidth={2.25} className="h-7 w-7 shrink-0 text-white/60" />
                    <span className="break-all">{company.email}</span>
                  </a>
                </li>
              )}
              <li className="flex items-start gap-5">
                <Icon name="MapPin" strokeWidth={2.25} className="mt-0.5 h-7 w-7 shrink-0 text-white/60" />
                <span>
                  {company.address.street}
                  <br />
                  {company.address.postalCode} {company.address.city}
                </span>
              </li>
            </ul>
            <QuoteTrigger className={buttonClasses("moss", "mt-9")}>Få gratis offert</QuoteTrigger>
          </div>

          <div>
            <h2 className={headingClass}>Tjänster</h2>
            <ul className="mt-6 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/tjanster/${service.slug}`} className={linkClass}>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={headingClass}>Markmontage</h2>
            <ul className="mt-6 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/15 pt-6 text-[14px] text-white/70 sm:flex-row sm:justify-between">
          <p>{footerCopyright}</p>
          <p>
            Org.nr {company.orgNumber} · VAT {company.vatNumber}
          </p>
        </div>
      </div>
    </footer>
  );
}
