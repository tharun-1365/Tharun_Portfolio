"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { navLinks, site } from "@/data/site";
import { useScrolled } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { GitHubIcon, LinkedInIcon } from "./ui/Icons";

interface NavbarProps {
  /** Whether the resume PDF exists (checked at build time by the server). */
  showResume: boolean;
}

export function Navbar({ showResume }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const scrolled = useScrolled(8);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const active = isHome ? activeSection : null;
  const menuId = useId();

  // Track which home-page section is in view for the active nav state.
  useEffect(() => {
    if (!isHome) return;
    // "top" (the hero) is observed too so the highlight clears above About.
    const ids = ["top", ...navLinks.map((l) => l.href.replace("/#", ""))];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id === "top" ? null : visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  // Close the mobile menu on Escape. Links close it on click.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Over the dark hero (top of the home page) the bar is transparent with
  // light text; once scrolled it takes the current theme's surface.
  const onDarkHero = isHome && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        onDarkHero ? "surface-dark border-b border-transparent" : "border-b border-border bg-bg/85 backdrop-blur-md",
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-fg"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const id = link.href.replace("/#", "");
            const isActive = active === id;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm transition-colors",
                    isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop right cluster */}
        <div className="hidden items-center gap-1 md:flex">
          <IconLink href={site.github} label="GitHub">
            <GitHubIcon className="h-4 w-4" />
          </IconLink>
          <IconLink href={site.linkedin} label="LinkedIn">
            <LinkedInIcon className="h-4 w-4" />
          </IconLink>
          {showResume ? (
            <a
              href={site.resumePath}
              download
              className="ml-1 inline-flex h-8 items-center rounded-md border border-border px-3 text-xs font-medium text-fg transition-colors hover:border-border-strong hover:bg-bg-subtle"
            >
              Resume
            </a>
          ) : null}
          <ThemeToggle className="ml-1" />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id={menuId}
        hidden={!open}
        className="border-t border-border bg-bg md:hidden"
      >
        <ul className="mx-auto max-w-5xl px-5 py-3 sm:px-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-base text-fg-muted transition-colors hover:text-fg"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-2 flex flex-wrap gap-2 border-t border-border pt-4">
            <a href={site.github} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm text-fg">
              <GitHubIcon className="h-4 w-4" /> GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm text-fg">
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
            </a>
            {showResume ? (
              <a href={site.resumePath} download className="inline-flex h-9 items-center rounded-md border border-border px-3 text-sm text-fg">
                Resume
              </a>
            ) : null}
          </li>
        </ul>
      </div>
    </header>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg"
    >
      {children}
    </a>
  );
}
