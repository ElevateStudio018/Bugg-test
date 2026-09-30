import Link from "next/link";
import { Icon } from "./Icon";
import { company, footerBlurb, footerCopyright } from "@/lib/content";
import { services } from "@/lib/services";
import { toIntlDisplay, toTelHref } from "@/lib/format";

export function Footer() {
  return (
    <footer className="border-t-2 border-accent bg-white text-dark">
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Link href="/" className="text-lg font-bold text-dark">
              Markmontage <span className="text-accent">BEAB</span>
            </Link>
            <p className="mt-4 text-[15px] leading-relaxed text-gray-body">{footerBlurb}</p>
            <p className="mt-4 text-[12px] text-gray-body">Org.nr: {company.orgNumber}</p>
            <p className="text-[12px] text-gray-body">VAT: {company.vatNumber}</p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-steel">Tjänster</h3>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/tjanster/${service.slug}`} className="text-[15px] text-gray-body transition-colors hover:text-dark">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-steel">Områden</h3>
            <ul className="mt-5 space-y-3">
              <li className="text-[15px] text-gray-body">{company.serviceArea}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-steel">Kontakt &amp; länkar</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={toTelHref(company.phoneNational)} className="flex items-center gap-2 text-[15px] text-gray-body transition-colors hover:text-dark">
                  <Icon name="Phone" className="h-4 w-4 shrink-0" />
                  <span className="break-words">{toIntlDisplay(company.phoneNational)}</span>
                </a>
              </li>
              {company.email && (
                <li>
                  <a href={`mailto:${company.email}`} className="flex items-center gap-2 text-[15px] text-gray-body transition-colors hover:text-dark">
                    <Icon name="Mail" className="h-4 w-4 shrink-0" />
                    <span className="break-all">{company.email}</span>
                  </a>
                </li>
              )}
              <li>
                <Link href="/#faq" className="text-[15px] text-gray-body transition-colors hover:text-dark">
                  Läs mer om ROT-avdrag
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-dark/10 pt-8">
          <p className="text-[12px] text-gray-body">{footerCopyright}</p>
        </div>
      </div>
    </footer>
  );
}
