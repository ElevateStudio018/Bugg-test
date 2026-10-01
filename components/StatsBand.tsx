import { Reveal } from "./Reveal";
import { company } from "@/lib/content";

// Registry figures only: founding year, company age and the latest reported headcount.
const stats = [
  { value: String(company.foundedYear), label: "Grundat" },
  { value: String(new Date().getFullYear() - company.foundedYear), label: "År i branschen" },
  { value: String(company.employeeCountValue), label: "Anställda" },
];

export function StatsBand() {
  return (
    <section aria-labelledby="siffror-rubrik" className="bg-olive text-center text-sand">
      <div className="mx-auto max-w-content px-4 pb-[38px] pt-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <Reveal>
          <h2 id="siffror-rubrik" className="text-h2 lg:text-h2-lg">
            Markmontage i siffror
          </h2>
          <dl className="mt-[26px] grid grid-cols-1 gap-y-5 sm:grid-cols-3 sm:gap-x-8 lg:mt-14">
            {stats.map((stat) => (
              // Number first visually, but the label stays the <dt> so it is read before the value.
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="text-[17px] leading-[1.35] lg:text-[19px]">{stat.label}</dt>
                <dd className="text-stat text-white lg:text-[72px]">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
