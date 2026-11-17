import { Icon } from "../Icon";
import { tapTarget } from "../Button";
import { list } from "@/lib/site/collection.ts";
import { withBasePath } from "@/lib/site/images.ts";
import { key } from "@/lib/site/edit.ts";
import type { SectionProps } from "./types";

/** The company's policies side by side: what each says, its goals and how they are followed up, and the whole policy. */
export function PoliciesSection({ section, ctx }: SectionProps<"policies">) {
  const policies = list(section.items);
  if (policies.length === 0) return null;

  return (
    // Straight after a flush section (the certificates) it makes its own space above; otherwise the section before has.
    <div
      id={section.anchor || undefined}
      data-k={ctx.path}
      className={`mx-auto max-w-content px-4 sm:px-6 lg:px-8 ${ctx.attached ? "pt-12 lg:pt-16" : ""}`}
    >
      <h2 data-k={key(ctx.path, "heading")} className="text-h2 text-heading lg:text-h2-lg">
        {section.heading}
      </h2>
      {section.text && (
        <p data-k={key(ctx.path, "text")} className="mt-3 max-w-3xl text-copy text-body lg:mt-5">
          {section.text}
        </p>
      )}

      <ul className="mt-8 grid gap-4 lg:mt-12 lg:grid-cols-3">
        {policies.map((policy) => {
          const base = key(ctx.path, "items.items", policy.id);
          return (
            <li key={policy.id} data-k={base} className="flex flex-col bg-card p-6 lg:p-8">
              <Icon name={policy.icon} className="h-9 w-9 text-accent" />
              <h3 data-k={key(base, "name")} className="mt-5 text-h3 text-heading">
                {policy.name}
              </h3>
              {policy.paragraphs.map((paragraph, index) => (
                <p key={index} data-k={key(base, "paragraphs", index)} className="mt-3 text-copy leading-[1.35] text-body">
                  {paragraph}
                </p>
              ))}
              {list(policy.goals).map((goal) => (
                <div key={goal.id} className="mt-5 border-l-2 border-accent pl-4">
                  <p data-k={key(ctx.path, "goalLabel")} className="text-tag uppercase text-heading">
                    {section.goalLabel}
                  </p>
                  <p data-k={key(base, "goals.items", goal.id, "goal")} className="mt-1 text-copy leading-[1.35] text-body">
                    {goal.goal}
                  </p>
                  {goal.measure && (
                    <p className="mt-2 text-small text-muted">
                      <span data-k={key(ctx.path, "measureLabel")} className="font-semibold">
                        {section.measureLabel}
                      </span>{" "}
                      <span data-k={key(base, "goals.items", goal.id, "measure")}>{goal.measure}</span>
                    </p>
                  )}
                </div>
              ))}
              {policy.document && (
                // The whole policy, opened in a new tab.
                <a
                  href={withBasePath(policy.document)}
                  target="_blank"
                  rel="noopener"
                  className={`${tapTarget} mt-auto inline-flex items-center gap-2 self-start pt-6 font-semibold text-link underline underline-offset-4 hover:text-accent`}
                >
                  <Icon name="FileText" className="h-5 w-5 shrink-0" />
                  <span data-k={key(ctx.path, "documentLabel")}>{section.documentLabel}</span>
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
