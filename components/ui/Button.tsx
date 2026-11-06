import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent" | "ink" | "paper";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-paper border-ink shadow-hard hover:bg-primary-deep",
  secondary: "bg-paper text-ink border-ink shadow-hard hover:bg-accent-soft",
  accent: "bg-accent text-ink border-ink shadow-hard hover:bg-pop",
  ink: "bg-ink text-paper border-ink shadow-hard-sm hover:bg-primary",
  /** For dark sections: paper button with a accent offset. */
  paper: "bg-paper text-ink border-ink shadow-accent hover:bg-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.95rem]",
  md: "h-12 px-5 text-base",
  lg: "h-14 px-7 text-[1.05rem]",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
}

type LinkButtonProps = BaseProps & { href: string; external?: boolean };
type NativeButtonProps = BaseProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

function classesFor(variant: Variant, size: Size, className: string) {
  return [
    "btn-press icon-host inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border-2 font-display font-bold tracking-[-0.01em]",
    "disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  ].join(" ");
}

/** The one shared button. Renders a Next link when given `href`. */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", children, icon } = props;
  const cls = classesFor(variant, size, className);

  if (props.href !== undefined) {
    if (props.external) {
      return (
        <a href={props.href} className={cls} target="_blank" rel="noreferrer">
          {children}
          {icon}
        </a>
      );
    }
    return (
      <Link href={props.href} className={cls}>
        {children}
        {icon}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, className: _c, children: _ch, icon: _i, href: _h, type = "button", ...rest } = props;
  return (
    <button type={type} className={cls} {...rest}>
      {children}
      {icon}
    </button>
  );
}

/** Small hand-drawn arrow used inside buttons and links. */
export function ArrowGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={`ic-slide ${className}`} aria-hidden="true" focusable="false">
      <path d="M4 12.5c5-.6 10-.4 15 0M14 7c2 2 4 3.6 5.5 5.4-1.6 1.6-3.6 3.3-5.5 5.1" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
