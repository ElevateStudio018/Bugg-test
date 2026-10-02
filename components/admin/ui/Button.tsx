import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary: "bg-admin text-admin-contrast shadow-sm hover:brightness-110 active:brightness-95",
  secondary: "bg-white text-admin-ink ring-1 ring-inset ring-admin-line hover:bg-stone-50",
  ghost: "text-admin-ink hover:bg-stone-900/5",
  danger: "bg-red-700 text-white shadow-sm hover:bg-red-800",
};

export interface AdminButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "md" | "sm";
  icon?: LucideIcon;
  /** Shown instead of the label while something is in progress; the button is disabled meanwhile. */
  busyLabel?: string;
  busy?: boolean;
  children?: ReactNode;
}

export const AdminButton = forwardRef<HTMLButtonElement, AdminButtonProps>(function AdminButton(
  { variant = "secondary", size = "md", icon: Icon, busy = false, busyLabel, children, className = "", disabled, type = "button", ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || busy}
      aria-busy={busy || undefined}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl font-semibold transition duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-admin disabled:cursor-not-allowed disabled:opacity-55 ${
        size === "sm" ? "min-h-10 px-3.5 text-[14px]" : "px-5 text-[15px]"
      } ${variants[variant]} ${busy ? "admin-busy" : ""} ${className}`}
      {...rest}
    >
      {Icon && <Icon aria-hidden="true" className={size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]"} strokeWidth={2} />}
      {busy && busyLabel ? busyLabel : children}
    </button>
  );
});
