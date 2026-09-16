import { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "accent" | "ghost" | "outline";

const base =
  "inline-flex items-center justify-center rounded-[3px] font-poppins font-bold text-base px-4 py-3 transition-all duration-150 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] active:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100";

const variants: Record<ButtonVariant, string> = {
  accent: "bg-accent text-dark border border-dark/10",
  ghost: "bg-transparent text-white border-2 border-white",
  outline: "bg-white text-dark border border-dark/20",
};

export function buttonClasses(variant: ButtonVariant = "accent", className = ""): string {
  return `${base} ${variants[variant]} ${className}`;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = "accent", className = "", children, ...rest }: ButtonProps) {
  return (
    <button className={buttonClasses(variant, className)} {...rest}>
      {children}
    </button>
  );
}
