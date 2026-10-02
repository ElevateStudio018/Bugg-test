import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";
import { company } from "@/lib/content";

// Founding year and company age from the registry, headcount from the company. The two amounts count up when the band
// scrolls into view; the year stays as it is.
const stats = [
  { value: company.foundedYear, label: "Grundat", countUp: false },
  { value: new Date().getFullYear() - company.foundedYear, label: "År i branschen", countUp: true },
  { value: company.employeeCountValue, label: "Anställda", countUp: true },
];

export function StatsBand() {
  return (
    <section aria-labelledby="siffror-rubrik" className="bg-olive text-center text-sand">
      <div className="mx-auto max-w-content px-4 pb-[38px] pt-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <Reveal>
          <h2 id="siffror-rubrik" className="text-h2 lg:text-h2-lg">
            Markmontage i siffror
          </h2>
        </Reveal>
        <dl className="mt-[26px] grid grid-cols-1 gap-y-5 sm:grid-cols-3 sm:gap-x-8 lg:mt-14">
          {stats.map((stat, index) => (
            // The figures rise into place one after another. Number first visually, but the label stays the <dt> so
            // it is read before the value.
            <Reveal key={stat.label} delayMs={120 + index * 120} className="flex flex-col-reverse">
              <dt className="text-[17px] leading-[1.35] lg:text-[19px]">{stat.label}</dt>
              <dd className="text-stat text-white lg:text-[72px]">
                {stat.countUp ? <CountUp value={stat.value} /> : stat.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
