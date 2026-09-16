import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "outline";

const tones: Record<Tone, string> = {
  neutral: "border-border bg-bg-subtle text-fg-muted",
  accent: "border-accent/30 bg-accent/10 text-accent",
  outline: "border-border text-fg",
};

/** Small mono label: technology tag, status, metadata. */
export function Badge({
  children,
  tone = "neutral",
  dot,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  /** Leading status dot. */
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-md border px-2 font-mono text-[11px] leading-none whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {dot ? <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}
