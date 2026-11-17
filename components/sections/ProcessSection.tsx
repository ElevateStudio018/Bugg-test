import { Icon } from "../Icon";
import { Reveal } from "../Reveal";
import { list } from "@/lib/site/collection.ts";
import { key } from "@/lib/site/edit.ts";
import type { SectionProps } from "./types";

// Up to four steps side by side on wide screens.
const columns = ["lg:grid-cols-1", "lg:grid-cols-1", "lg:grid-cols-2", "lg:grid-cols-3", "lg:grid-cols-4"];

export function ProcessSection({ section, ctx }: SectionProps<"process">) {
  const steps = list(section.steps);
  return (
    <section id={section.anchor || undefined} data-k={ctx.path} className="scroll-mt-20">
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <Reveal className="max-w-3xl">
          <h2 data-k={key(ctx.path, "heading")} className="text-h2 text-heading lg:text-h2-lg">
            {section.heading}
          </h2>
          {section.text && (
            <p data-k={key(ctx.path, "text")} className="mt-5 text-copy text-body lg:text-lead">
              {section.text}
            </p>
          )}
        </Reveal>

        <ol className={`mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 ${columns[Math.min(steps.length, 4)]}`}>
          {steps.map((step, index) => (
            <li
              key={step.id}
              data-k={key(ctx.path, "steps.items", step.id)}
              className="flex flex-col border-t-[3px] border-accent bg-card p-7 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center bg-accent text-on-primary">
                  <Icon name={step.icon} className="h-6 w-6" />
                </span>
                <span className="text-stat text-heading/15" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-7 text-h3 text-heading">
                <span className="sr-only">
                  {ctx.site.ui.stepPrefix} {index + 1}:{" "}
                </span>
                <span data-k={key(ctx.path, "steps.items", step.id, "title")}>{step.title}</span>
              </h3>
              <p data-k={key(ctx.path, "steps.items", step.id, "description")} className="mt-3 text-copy leading-relaxed text-body">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
