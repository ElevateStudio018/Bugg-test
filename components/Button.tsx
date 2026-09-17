import { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "primary-inverse" | "ghost" | "outline";

const base =
  "inline-flex items-center justify-center rounded-none font-poppins font-bold text-base px-6 py-3.5 transition-all duration-150 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-dark text-white border border-dark focus-visible:outline-dark",
  "primary-inverse": "bg-white text-dark border border-white focus-visible:outline-white",
  ghost: "bg-transparent text-white border border-white/70 hover:border-white focus-visible:outline-white",
  outline: "bg-white text-dark border border-dark/20 hover:border-dark/60 focus-visible:outline-dark",
};

export function buttonClasses(variant: ButtonVariant = "primary", className = ""): string {
  return `${base} ${variants[variant]} ${className}`;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
  return (
    <button className={buttonClasses(variant, className)} {...rest}>
      {children}
    </button>
  );
}
