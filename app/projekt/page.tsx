import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { UppdragGrid } from "@/components/UppdragGrid";
import { QuoteTrigger } from "@/components/QuoteTrigger";
import { buttonClasses } from "@/components/Button";
import { company } from "@/lib/content";
import { uppdragItems, uppdragTags } from "@/lib/uppdrag";

export const metadata: Metadata = {
  title: "Uppdrag vi utför",
  description: `De typer av mark- och grundarbeten som ${company.legalName} utför i ${company.serviceArea}.`,
  alternates: { canonical: "/projekt" },
};

export default function UppdragPage() {
  return (
    <div className="mx-auto max-w-content px-4 pb-16 pt-10 sm:px-6 sm:pb-20 lg:px-8 lg:pb-28 lg:pt-14">
      <Breadcrumbs items={[{ label: "Hem", href: "/" }, { label: "Uppdrag" }]} />

      <h1 className="mt-8 text-[38px] font-semibold leading-[1.1] tracking-[-0.01em] text-ink lg:text-[56px]">
        Uppdrag vi utför
      </h1>
      <p className="mt-5 max-w-3xl text-copy text-coal lg:text-[21px]">
        Från första spadtaget till färdig yta. Här är de typer av uppdrag vi tar oss an – välj ett för att läsa mer om
        tjänsten.
      </p>

      <div className="mt-10">
        <UppdragGrid items={uppdragItems} tags={uppdragTags} />
      </div>

      <div className="mt-16 border-l-[6px] border-olive pl-6 lg:mt-20">
        <h2 className="text-h2 text-ink lg:text-[38px]">Har du ett markprojekt på gång?</h2>
        <p className="mt-4 max-w-2xl text-copy text-coal">
          Berätta kort om ditt projekt, så återkommer vi med nästa steg.
        </p>
        <QuoteTrigger className={buttonClasses("olive", "mt-7")}>Få gratis offert</QuoteTrigger>
      </div>
    </div>
  );
}
