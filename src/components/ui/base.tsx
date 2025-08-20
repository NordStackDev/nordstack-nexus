import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
import clsx from "clsx";

/* ------------------ BUTTON ------------------ */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "cta" | "ghost";
};

export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const base = "btn-modern px-4 py-2";
  const styles = {
    primary: "btn-primary",
    cta: "btn-cta",
    ghost:
      "bg-transparent border border-[color:var(--border)] hover:border-[color:var(--border)] text-[color:var(--muted)] hover:text-[color:var(--foreground)]",
  };

  return (
    <button className={clsx(base, styles[variant], className)} {...props} />
  );
}

/* ------------------ INPUT ------------------ */
export function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input className={clsx("input-modern w-full", className)} {...props} />
  );
}

/* ------------------ CARD ------------------ */
type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  hoverable?: boolean;
};

export function Card({
  className = "",
  hoverable = false,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "card-modern p-6",
        hoverable &&
          "transition-transform hover:-translate-y-1 hover:shadow-glow",
        className
      )}
      {...props}
    />
  );
}

/* ------------------ STAT ------------------ */
export function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col items-center p-4 rounded-[var(--radius)] bg-[color:var(--card)] shadow-card">
      <span className="text-3xl font-extrabold tracking-tight text-card-foreground">
        {value}
      </span>
      <span className="mt-1 text-sm text-muted">{label}</span>
    </div>
  );
}
