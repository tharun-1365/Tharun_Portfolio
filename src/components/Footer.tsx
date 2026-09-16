import { site } from "@/data/site";
import { Container } from "./ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-fg">{site.name}</p>
          <p className="mt-1 text-sm text-fg-muted">
            {site.role} · {site.roleSecondary}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <ul className="flex gap-5 text-sm">
            <li>
              <a href={site.github} target="_blank" rel="noreferrer" className="link-underline text-fg-muted hover:text-fg">
                GitHub
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="link-underline text-fg-muted hover:text-fg">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link-underline text-fg-muted hover:text-fg">
                Email
              </a>
            </li>
          </ul>
          <p className="font-mono text-xs text-fg-faint">© 2026 {site.name}</p>
        </div>
      </Container>
    </footer>
  );
}
