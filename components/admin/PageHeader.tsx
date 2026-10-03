import type { ReactNode } from "react";

export function PageHeader({ title, description, actions }: { title: string; description?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
      <div className="min-w-0">
        <h1 className="text-[26px] font-semibold tracking-[-0.015em] text-admin-ink sm:text-[30px]">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-admin-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
