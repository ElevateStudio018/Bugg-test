import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";
import { trustStats } from "@/lib/content";

export function TrustBar() {
  return (
    <section className="bg-dark">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {trustStats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2 px-4 py-10 text-center sm:py-14">
                <span className="text-4xl font-extrabold text-white sm:text-5xl">
                  <CountUp value={stat.value} prefix={"prefix" in stat ? stat.prefix : ""} suffix={"suffix" in stat ? stat.suffix : ""} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-steel">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
