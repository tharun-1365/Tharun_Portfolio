import Image from "next/image";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface ProfileImageProps {
  /** Result of `hasProfileImage()` from a server component. */
  available: boolean;
  /** Size utilities (e.g. "h-24 w-24 md:h-40 md:w-40"). */
  className?: string;
  /** Largest rendered CSS size in px, used to pick the source resolution. */
  maxSize?: number;
  /** Responsive `sizes` hint matching the size utilities, e.g. "(min-width: 768px) 160px, 96px". */
  sizes?: string;
  priority?: boolean;
}

/**
 * Small square portrait with a hairline border. Falls back to a neutral
 * monogram until `public/profile.jpg` exists so the layout never breaks.
 */
export function ProfileImage({ available, className, maxSize = 160, sizes, priority }: ProfileImageProps) {
  const initials = site.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-lg border border-border bg-bg-elevated",
        className,
      )}
    >
      {available ? (
        <Image
          src={site.profileImagePath}
          alt={`Portrait of ${site.name}`}
          width={maxSize * 2}
          height={maxSize * 2}
          sizes={sizes ?? `${maxSize}px`}
          priority={priority}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${site.name} (profile photo not added yet)`}
          className="flex h-full w-full items-center justify-center font-mono text-xl tracking-wide text-fg-faint"
        >
          {initials}
        </div>
      )}
    </div>
  );
}
