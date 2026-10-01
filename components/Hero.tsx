import { QuoteTrigger } from "./QuoteTrigger";
import { ArrowLabel, arrowLinkClasses } from "./Button";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section>
      <div className="relative aspect-[5/3] w-full overflow-hidden bg-olive sm:aspect-[2/1] lg:aspect-auto lg:h-[min(64vh,680px)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hero.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>

      <div className="bg-olive">
        <div className="mx-auto max-w-content px-4 pb-14 pt-9 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8 lg:pb-20 lg:pt-14">
          <h1 className="max-w-4xl text-display text-white lg:text-display-lg">{hero.heading}</h1>
          <p className="mt-4 max-w-2xl text-lead text-white lg:mt-5 lg:text-[22px]">{hero.subheading}</p>
          <QuoteTrigger className={arrowLinkClasses("white", "mt-8 lg:mt-10")}>
            <ArrowLabel>Få en kostnadsfri offert</ArrowLabel>
          </QuoteTrigger>
        </div>
      </div>
    </section>
  );
}
