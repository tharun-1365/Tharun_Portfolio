import { site } from "@/data/site";
import { ButtonLink } from "./ui/Button";
import { Container } from "./ui/Container";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./ui/Icons";
import { ProfileImage } from "./ProfileImage";

interface HeroProps {
  showResume: boolean;
  showProfileImage: boolean;
}

/**
 * Always-dark hero on a faint engineering grid. Name, positioning, one
 * primary action plus equally weighted secondary actions, and a framed
 * portrait with a small metadata panel.
 */
export function Hero({ showResume, showProfileImage }: HeroProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="surface-dark relative overflow-hidden bg-bg text-fg"
    >
      {/* Background structure: faint grid fading out, one restrained accent glow. */}
      <div aria-hidden="true" className="bg-grid bg-grid-fade absolute inset-0 opacity-40" />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-[0.10] blur-3xl"
        style={{ background: "var(--accent)" }}
      />

      <Container className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="grid items-start gap-10 md:grid-cols-[1fr_auto] md:gap-16">
          <div className="max-w-3xl">
            {/* Technical metadata row */}
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-fg-faint">
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                {site.location}
              </span>
              <span aria-hidden="true">·</span>
              <span>B.Tech IT · 2023–2027</span>
              <span aria-hidden="true">·</span>
              <span>@{site.handle}</span>
            </p>

            <h1
              id="hero-title"
              className="mt-6 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl"
            >
              {site.name}
            </h1>

            <p className="mt-5 text-lg sm:text-xl">
              <span className="block font-medium text-fg sm:inline">{site.role}</span>
              <span className="hidden text-fg-faint sm:inline"> — </span>
              <span className="block text-fg-muted sm:inline">{site.roleSecondary}</span>
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
              {site.tagline}
            </p>

            {/* One primary action, then equally weighted secondary actions. */}
            <nav aria-label="Primary actions" className="mt-9 flex flex-wrap items-center gap-2.5">
              <ButtonLink href="/#projects" variant="primary">
                View Projects
              </ButtonLink>
              <ButtonLink href={site.github} external>
                <GitHubIcon className="h-4 w-4" />
                GitHub
              </ButtonLink>
              <ButtonLink href={site.linkedin} external>
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
              </ButtonLink>
              <ButtonLink href={`mailto:${site.email}`}>
                <MailIcon className="h-4 w-4" />
                Email
              </ButtonLink>
              {showResume ? (
                <ButtonLink href={site.resumePath} download>
                  <DownloadIcon className="h-4 w-4" />
                  Download Resume
                </ButtonLink>
              ) : null}
            </nav>
          </div>

          {/* Portrait with corner ticks and a metadata panel beneath. On
              mobile the wrapper dissolves so the portrait sits above the name. */}
          <div className="contents md:flex md:flex-col md:items-end md:gap-4">
            <div className="frame-ticks relative order-first w-fit md:order-none">
              <ProfileImage
                available={showProfileImage}
                priority
                sizes="(min-width: 768px) 192px, 96px"
                className="h-24 w-24 md:h-48 md:w-48"
              />
            </div>
            <dl className="card grid w-full max-w-xs grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 px-3.5 py-3 font-mono text-[11px] text-fg-faint md:w-48 md:grid-cols-1 md:gap-y-0.5">
              <dt>focus</dt>
              <dd className="text-fg-muted md:mb-2">software · games · ML</dd>
              <dt>languages</dt>
              <dd className="text-fg-muted md:mb-2">C# · Python · Java</dd>
              <dt>engine</dt>
              <dd className="text-fg-muted">Unity 6</dd>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
