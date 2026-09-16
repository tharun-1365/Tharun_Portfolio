import { site } from "@/data/site";
import { ButtonLink } from "./ui/Button";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./ui/Icons";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-border bg-bg-subtle py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="card relative overflow-hidden p-7 sm:p-10 lg:p-14">
            <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
            <div className="relative grid gap-10 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
              <div className="max-w-xl">
                <p className="font-mono text-xs tracking-wide text-fg-faint">06 — Contact</p>
                <h2 id="contact-title" className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                  Let&apos;s build something useful.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">
                  Open to software development, game development, AI/ML opportunities, internships,
                  and technical collaborations.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={`mailto:${site.email}`} variant="primary">
                    <MailIcon className="h-4 w-4" />
                    Email Me
                  </ButtonLink>
                  <ButtonLink href={site.linkedin} external>
                    <LinkedInIcon className="h-4 w-4" />
                    LinkedIn
                  </ButtonLink>
                  <ButtonLink href={site.github} external>
                    <GitHubIcon className="h-4 w-4" />
                    GitHub
                  </ButtonLink>
                </div>
              </div>

              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 text-sm md:min-w-64">
                <dt className="font-mono text-xs text-fg-faint">email</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="link-underline break-all text-fg">
                    {site.email}
                  </a>
                </dd>
                <dt className="font-mono text-xs text-fg-faint">phone</dt>
                <dd>
                  <a href={site.phoneHref} className="link-underline text-fg">
                    {site.phone}
                  </a>
                </dd>
                <dt className="font-mono text-xs text-fg-faint">linkedin</dt>
                <dd>
                  <a href={site.linkedin} target="_blank" rel="noreferrer" className="link-underline text-fg">
                    tharunkumar13062005
                  </a>
                </dd>
                <dt className="font-mono text-xs text-fg-faint">github</dt>
                <dd>
                  <a href={site.github} target="_blank" rel="noreferrer" className="link-underline text-fg">
                    {site.handle}
                  </a>
                </dd>
                <dt className="font-mono text-xs text-fg-faint">based in</dt>
                <dd className="text-fg">{site.location}</dd>
              </dl>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
