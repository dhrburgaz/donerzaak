import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "md" | "lg" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,transform,box-shadow] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none disabled:translate-y-0 whitespace-nowrap active:translate-y-0.5";

const variants: Record<Variant, string> = {
  primary:
    "bg-orange text-warm-white shadow-[0_4px_0_0_#a4501c] hover:bg-[#d85f22] active:shadow-[0_1px_0_0_#a4501c]",
  secondary:
    "bg-forest text-warm-white shadow-[0_4px_0_0_#0a1f18] hover:bg-[#0f2e24] active:shadow-[0_1px_0_0_#0a1f18]",
  outline:
    "border-2 border-charcoal/15 text-charcoal hover:border-charcoal/35 bg-transparent active:translate-y-0",
  ghost: "text-charcoal hover:bg-charcoal/5 active:translate-y-0",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-13 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

type ButtonAsLink = CommonProps &
  ComponentPropsWithoutRef<typeof Link> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return <Link href={href} className={classes} {...rest} />;
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return <button type={type} className={classes} {...rest} />;
}
