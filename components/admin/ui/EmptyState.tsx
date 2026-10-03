import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({ icon: Icon, title, text, action }: { icon: LucideIcon; title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-admin/10 text-admin">
        <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} />
      </span>
      <p className="mt-4 text-[16px] font-semibold text-admin-ink">{title}</p>
      {text && <p className="mt-1.5 max-w-sm text-[14px] leading-relaxed text-admin-muted">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
