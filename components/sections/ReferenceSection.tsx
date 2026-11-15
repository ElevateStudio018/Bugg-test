import { Photo } from "../Photo";
import { Reveal } from "../Reveal";
import { list } from "@/lib/site/collection.ts";
import { focusStyle, imageProps } from "@/lib/site/images.ts";
import { key } from "@/lib/site/edit.ts";
import type { SectionProps } from "./types";

// The steps' labels in turn: light for the challenge, the logo's orange for the solution, dark for the result.
const labelTones = ["bg-page text-body", "bg-[#F39200] text-[#111111]", "bg-primary text-on-primary"];
const columns = [
  "",
  "lg:grid-cols-1",
  "sm:grid-cols-2",
  "sm:grid-cols-2 lg:grid-cols-3",
  "sm:grid-cols-2",
  "sm:grid-cols-2 lg:grid-cols-3",
  "sm:grid-cols-2 lg:grid-cols-3",
];

/** A reference project told as a story in cards: each step with its photo, a coloured label, a heading and a text. */
export function ReferenceSection({ section, ctx }: SectionProps<"reference">) {
  const steps = list(section.steps);
  return (
    <section id={section.anchor || undefined} data-k={ctx.path} className="scroll-mt-20">
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        {section.badge && (
          <p data-k={key(ctx.path, "badge")} className="text-tag uppercase text-muted">
            {section.badge}
          </p>
        )}
        <h2 data-k={key(ctx.path, "heading")} className="mt-2.5 text-h2 text-heading lg:text-[42px] lg:leading-[1.08]">
          {section.heading}
        </h2>
        {section.text && (
          <p data-k={key(ctx.path, "text")} className="mt-3 max-w-3xl text-copy text-body">
            {section.text}
          </p>
        )}
        <ol className={`mt-8 grid grid-cols-1 gap-5 lg:mt-10 ${columns[steps.length]}`}>
          {steps.map((step, index) => (
            <Reveal key={step.id} as="li" delayMs={index * 90} className="flex flex-col bg-card pb-6">
              <div className="relative aspect-[4/3] overflow-hidden bg-primary/20">
                <Photo
                  {...imageProps(step.image, "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw")}
                  alt={step.image.alt}
                  k={key(ctx.path, "steps.items", step.id, "image")}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={focusStyle(step.image)}
                />
              </div>
              {step.label && (
                <span
                  data-k={key(ctx.path, "steps.items", step.id, "label")}
                  className={`mx-6 mt-5 self-start rounded-full px-3 py-1 text-[13px] font-extrabold uppercase tracking-[0.16em] ${labelTones[index % labelTones.length]}`}
                >
                  {step.label}
                </span>
              )}
              <h3 data-k={key(ctx.path, "steps.items", step.id, "heading")} className="mx-6 mt-3 text-h3 text-heading">
                {step.heading}
              </h3>
              {step.text && (
                <p data-k={key(ctx.path, "steps.items", step.id, "text")} className="mx-6 mt-2 text-copy leading-[1.4] text-body">
                  {step.text}
                </p>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
