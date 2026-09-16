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
 * Always-dark hero. Name, positioning, one-sentence description, one primary
 * action plus a row of equally weighted secondary actions, and a small
 * portrait with a few mono facts.
 */
export function Hero({ showResume, showProfileImage }: HeroProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="surface-dark bg-bg text-fg"
    >
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="grid items-start gap-8 md:grid-cols-[1fr_auto] md:gap-16">
          <div className="max-w-3xl">
            <p className="font-mono text-xs tracking-wide text-fg-faint">{site.location}</p>
            <h1
              id="hero-title"
              className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              {site.name}
            </h1>
            <p className="mt-4 text-lg text-fg sm:text-xl">
              <span className="block sm:inline">{site.role}</span>
              <span className="hidden text-fg-faint sm:inline"> — </span>
              <span className="block text-fg-muted sm:inline">{site.roleSecondary}</span>
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
              {site.tagline}
            </p>

            {/* One primary action, then equally weighted secondary actions. */}
            <nav aria-label="Primary actions" className="mt-8 flex flex-wrap items-center gap-2.5">
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

          {/* On mobile the wrapper dissolves (`contents`) so the portrait sits
              above the name and the facts sit below the actions. */}
          <div className="contents md:flex md:flex-col md:items-end md:gap-5">
            <ProfileImage
              available={showProfileImage}
              priority
              sizes="(min-width: 768px) 160px, 96px"
              className="order-first h-24 w-24 md:order-none md:h-40 md:w-40"
            />
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-xs text-fg-faint md:text-right">
              <dt>degree</dt>
              <dd className="text-fg-muted">B.Tech IT · 2023–2027</dd>
              <dt>focus</dt>
              <dd className="text-fg-muted">software · games · ai/ml</dd>
              <dt>github</dt>
              <dd className="text-fg-muted">
                <a href={site.github} target="_blank" rel="noreferrer" className="link-underline">
                  @{site.handle}
                </a>
              </dd>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
