import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-fg/90",
  secondary:
    "border border-border bg-transparent text-fg hover:border-border-strong hover:bg-bg-subtle",
  ghost: "text-fg-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
};

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Opens in a new tab with rel="noreferrer". */
  external?: boolean;
  /** Renders a download link (plain anchor, no client-side routing). */
  download?: boolean;
  "aria-label"?: string;
  children: ReactNode;
}

/**
 * Link styled as a button. In-app routes use next/link; external, mailto/tel
 * and download targets render a plain anchor so Next never tries to prefetch
 * or client-route them.
 */
export function ButtonLink({
  href,
  variant = "secondary",
  size = "md",
  className,
  external,
  download,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isPlain = external || download || /^(https?:|mailto:|tel:)/.test(href);

  if (isPlain) {
    return (
      <a
        href={href}
        className={classes}
        download={download || undefined}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
