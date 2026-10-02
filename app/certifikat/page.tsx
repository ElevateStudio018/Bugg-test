import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { QuoteTrigger } from "@/components/QuoteTrigger";
import { buttonClasses } from "@/components/Button";
import { ZoomImage } from "@/components/ZoomImage";
import { company } from "@/lib/content";
import { certificates } from "@/lib/certificates";
import { companyPhotos } from "@/lib/photos";
import { toTelHref } from "@/lib/format";

export const metadata: Metadata = {
  title: "Certifikat",
  description: `Certifikat och behörigheter för ${company.legalName}.`,
  alternates: { canonical: "/certifikat" },
};

export default function CertifikatPage() {
  return (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-olive/20 sm:aspect-[2/1] lg:aspect-auto lg:h-[min(56vh,600px)]">
        <ZoomImage src={companyPhotos.arbete} className="absolute inset-0 h-full w-full object-cover" />
      </div>

      <div className="mx-auto max-w-content px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8 lg:pb-28 lg:pt-10">
        <Breadcrumbs items={[{ label: "Hem", href: "/" }, { label: "Certifikat" }]} />

        <h1 className="mt-4 text-display text-ink lg:mt-8 lg:text-[56px] lg:leading-[1.08]">Certifikat</h1>
        <p className="mt-3 max-w-3xl text-copy text-coal lg:mt-6 lg:text-[21px] lg:leading-[1.3]">
          Här samlar vi de certifikat och behörigheter som {company.legalName} har.
        </p>

        {certificates.length > 0 ? (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {certificates.map((certificate) => (
              <li key={certificate.name} className="flex flex-col bg-cream p-6 lg:p-8">
                <Icon name="BadgeCheck" className="h-9 w-9 text-olive" />
                <h2 className="mt-5 text-h3 text-ink">{certificate.name}</h2>
                {certificate.issuer && <p className="mt-2 text-[15px] text-ash">Utfärdat av {certificate.issuer}</p>}
                {certificate.description && (
                  <p className="mt-3 text-copy leading-[1.35] text-coal">{certificate.description}</p>
                )}
                {certificate.validUntil && (
                  <p className="mt-auto pt-6 text-[15px] text-ash">Giltigt till {certificate.validUntil}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 max-w-3xl bg-cream p-6 lg:mt-14 lg:p-8">
            <h2 className="text-h3 text-ink">Certifikaten läggs upp inom kort</h2>
            <p className="mt-3 text-copy leading-[1.35] text-coal">
              Har du frågor om våra certifikat och behörigheter är du välkommen att ringa oss på{" "}
              <a href={toTelHref(company.phoneNational)} className="font-semibold text-ink underline underline-offset-4 hover:text-olive">
                {company.phoneNational}
              </a>
              .
            </p>
          </div>
        )}

        <div className="mt-16 border-l-[6px] border-olive pl-6 lg:mt-20">
          <h2 className="text-h2 text-ink lg:text-[38px]">Har du ett markprojekt på gång?</h2>
          <p className="mt-4 max-w-2xl text-copy text-coal">
            Berätta kort om ditt projekt, så återkommer vi med nästa steg.
          </p>
          <QuoteTrigger className={buttonClasses("olive", "mt-7")}>Få gratis offert</QuoteTrigger>
        </div>
      </div>
    </>
  );
}
