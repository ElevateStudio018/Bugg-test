import type { Metadata } from "next";
import { AccentBlock } from "@/components/AccentBlock";
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
      {/* The text rises into place one part after another as the page loads, as on the homepage. */}
      <div className="animate-rise [animation-delay:150ms]">
        <Breadcrumbs items={[{ label: "Hem", href: "/" }, { label: "Uppdrag" }]} />
      </div>

      <h1 className="mt-8 animate-rise [animation-delay:250ms] text-[38px] font-semibold leading-[1.1] tracking-[-0.01em] text-ink lg:text-[56px]">
        Uppdrag vi utför
      </h1>
      <p className="mt-5 max-w-3xl animate-rise text-copy text-coal [animation-delay:350ms] lg:text-[21px]">
        Från första spadtaget till färdig yta. Här är de typer av uppdrag vi tar oss an – välj ett för att läsa mer om
        tjänsten.
      </p>

      <div className="mt-10 animate-rise [animation-delay:450ms]">
        <UppdragGrid items={uppdragItems} tags={uppdragTags} />
      </div>

      <AccentBlock className="mt-16 lg:mt-20">
        <h2 className="text-h2 text-ink lg:text-[38px]">Har du ett markprojekt på gång?</h2>
        <p className="mt-4 max-w-2xl text-copy text-coal">
          Berätta kort om ditt projekt, så återkommer vi med nästa steg.
        </p>
        <QuoteTrigger className={buttonClasses("olive", "mt-7")}>Begär offert</QuoteTrigger>
      </AccentBlock>
    </div>
  );
}
