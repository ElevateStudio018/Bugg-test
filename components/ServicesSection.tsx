import { Reveal } from "./Reveal";
import { ServiceCard } from "./ServiceCard";
import { ArrowLabel, arrowLinkClasses } from "./Button";
import { services } from "@/lib/services";

export function ServicesSection() {
  const lastIndex = services.length - 1;

  return (
    <section id="tjanster" className="scroll-mt-20">
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <Reveal>
          <h2 className="text-h2 text-ink lg:text-h2-lg">Våra tjänster</h2>
          <a href="#process" className={arrowLinkClasses("ink", "mt-3")}>
            <ArrowLabel>Så går det till</ArrowLabel>
          </a>
        </Reveal>

        {/* The last card spans two columns so 7 services fill the 2- and 4-column grids without a gap. */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={service.slug} delayMs={(index % 4) * 70} className={index === lastIndex ? "md:col-span-2" : ""}>
              <ServiceCard service={service} wide={index === lastIndex} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
