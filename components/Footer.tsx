import Link from "next/link";
import { Icon } from "./Icon";
import { Wordmark } from "./Wordmark";
import { QuoteTrigger } from "./QuoteTrigger";
import { Reveal } from "./Reveal";
import { buttonClasses, tapTarget } from "./Button";
import { company, footerCopyright } from "@/lib/content";
import { services } from "@/lib/services";
import { toTelHref } from "@/lib/format";
import topography from "@/assets/patterns/topography.svg";

const companyLinks = [
  { label: "Om oss", href: "/om-oss" },
  { label: "Certifikat", href: "/certifikat" },
  { label: "Uppdrag", href: "/projekt" },
  { label: "Så går det till", href: "/#process" },
  { label: "Vanliga frågor", href: "/#faq" },
  { label: "Kontakt", href: "/#kontakt" },
];

const headingClass = "text-[19px] font-semibold leading-tight lg:text-[22px]";
// A thin line slides in from the left under a link on hover, like the links in the top bar. On phones the padding makes
// each link a full-size tap target.
const linkClass =
  "relative inline-block py-3 text-[15px] leading-snug text-white transition-colors after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:text-white/70 hover:after:scale-x-100 lg:py-1 lg:text-[16px] lg:after:bottom-0.5";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-olive text-white">
      {/* Faint ring systems that merge into each other, tiling seamlessly over the whole footer. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-repeat opacity-[0.07]"
        style={{
          backgroundImage: `url(${topography.src})`,
          backgroundSize: `${topography.width}px ${topography.height}px`,
          backgroundPosition: "center top",
        }}
      />

      <div className="relative mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Reveal className="mb-8 border-b border-white/15 pb-7 lg:mb-10 lg:pb-8">
          <Link
            href="/"
            aria-label="Markmontage BEAB AB – startsida"
            className={`${tapTarget} inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white`}
          >
            <Wordmark />
          </Link>
        </Reveal>

        {/* Phones: contact on top, then the two link lists side by side, to keep the footer short. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-10">
          <Reveal delayMs={80} className="col-span-2 lg:col-span-1">
            <h2 className={headingClass}>Kontakt</h2>
            <ul className="mt-1.5 text-[17px] leading-snug lg:mt-2.5 lg:text-[18px]">
              <li>
                <a href={toTelHref(company.phoneNational)} className="flex min-h-11 items-center gap-3 transition-colors hover:text-white/70">
                  <Icon name="Phone" strokeWidth={2.25} className="h-5 w-5 shrink-0 text-white/60" />
                  {company.phoneNational}
                </a>
              </li>
              {company.email && (
                <li>
                  <a href={`mailto:${company.email}`} className="flex min-h-11 items-center gap-3 transition-colors hover:text-white/70">
                    <Icon name="Mail" strokeWidth={2.25} className="h-5 w-5 shrink-0 text-white/60" />
                    <span className="break-all">{company.email}</span>
                  </a>
                </li>
              )}
              <li className="flex items-start gap-3 py-2.5">
                <Icon name="MapPin" strokeWidth={2.25} className="mt-0.5 h-5 w-5 shrink-0 text-white/60" />
                <span>
                  {company.address.street}
                  <br />
                  {company.address.postalCode} {company.address.city}
                </span>
              </li>
            </ul>
            <QuoteTrigger className={buttonClasses("light-outline", "mt-6 lg:mt-7")}>Begär offert</QuoteTrigger>
          </Reveal>

          <Reveal delayMs={160}>
            <h2 className={headingClass}>Tjänster</h2>
            <ul className="mt-1 lg:mt-4 lg:space-y-0.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/tjanster/${service.slug}`} className={linkClass}>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delayMs={240}>
            <h2 className={headingClass}>Markmontage</h2>
            <ul className="mt-1 lg:mt-4 lg:space-y-0.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal
          delayMs={300}
          className="mt-9 flex flex-col gap-1 border-t border-white/15 pt-5 text-[13px] text-white/70 sm:flex-row sm:justify-between lg:mt-12 lg:text-[14px]"
        >
          <p>{footerCopyright}</p>
          <p>
            Org.nr {company.orgNumber} · Momsreg.nr {company.vatNumber}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
