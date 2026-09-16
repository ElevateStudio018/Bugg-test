import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";
import { trustStats } from "@/lib/content";

export function TrustBar() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 divide-y divide-dark/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {trustStats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 px-4 py-6 text-center sm:py-2">
                <span className="text-4xl font-bold text-dark sm:text-5xl">
                  <CountUp value={stat.value} prefix={"prefix" in stat ? stat.prefix : ""} suffix={"suffix" in stat ? stat.suffix : ""} />
                </span>
                <span className="text-lg font-semibold text-dark">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
