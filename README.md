# Tharun Kumar S — Portfolio

Personal developer portfolio. Next.js (App Router), React, TypeScript, Tailwind CSS v4. No UI or animation libraries; the only runtime dependency beyond Next/React is the `geist` font package.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
npm start          # serve the production build
npm run lint
```

Node 20+ is required.

## Add your assets

Two files live in `public/`. The site also builds and runs without them; the related UI simply stays hidden until they exist.

| File | Used for | Behaviour when missing |
|---|---|---|
| `public/profile.jpg` | Portrait in the hero (square crop, ~800×800 px, JPEG) | A neutral "TK" monogram is shown instead |
| `public/Tharun-Kumar-S-Resume.pdf` | "Resume" in the navbar and "Download Resume" in the hero | The buttons are not rendered |

Both checks happen at build time (`src/lib/assets.ts`), so rebuild after adding a file.

## Before deploying

- Set `url` in `src/data/site.ts` to the deployed origin. It is used for Open Graph metadata, `sitemap.xml` and `robots.txt`.
- The Open Graph image is generated at build time from `src/app/opengraph-image.tsx`; the favicon is `src/app/icon.svg`.

## Content lives in `src/data/`

| File | Contents |
|---|---|
| `site.ts` | Name, positioning, contact details, social links, SEO strings, nav links |
| `projects.ts` | All project case studies (see below) |
| `experience.ts` | Internships |
| `skills.ts` | Skill groups |
| `education.ts` | Education |

Types for every entry are in `src/lib/types.ts`. Components never hard-code content.

### Projects

Each entry in `projects.ts` drives both the list on the home page and its case study at `/projects/<slug>`. Display numbers (01, 02, …) are assigned by position, so reordering the array reorders the site.

- `status: "draft"` hides an entry everywhere (list, routes, sitemap) — useful for a project whose details are not confirmed yet.
- `featured: true` gives one project the larger flagship panel with its `pipeline` (drawn by `PipelineDiagram`) and `highlights`.
- `caseStudy.testing` is optional; when present it adds a "Testing" tab.
- `caseStudy.architecture.diagram` feeds the reusable `ArchitectureDiagram` component: a list of nodes rendered as a flow. `direction: "auto"` is horizontal on wide screens when there are five nodes or fewer, otherwise vertical.
- Omit `github` for work without public source (e.g. the Report Optimizer internship project) and use `sourceNote` to say why.

All descriptions were written from the actual repositories. Keep new content to what the code confirms.

## Structure

```
src/
  app/
    layout.tsx              root layout, metadata, fonts, theme script
    page.tsx                home: Hero → About → Experience → Projects → Skills → Education → Contact
    projects/[slug]/        statically generated case studies
    globals.css             design tokens (light/dark), base styles, reveal + reduced-motion rules
    icon.svg, opengraph-image.tsx, sitemap.ts, robots.ts, not-found.tsx
  components/
    Navbar, ThemeToggle, ThemeScript, Hero, ProfileImage, About, Skills,
    ExperienceTimeline, ExperienceItem, ProjectList, ProjectItem,
    ProjectCaseStudy, CaseStudyTabs, ArchitectureDiagram, PipelineDiagram,
    TechStack, Education, Contact, Footer
    ui/                     Container, Section, Reveal, Button, Badge, Icons
  data/                     all content
  lib/                      types, asset checks, hooks, utils
```

## Visual system

Surfaces alternate between `bg` and `bg-subtle`; panels use the `.card` class (hairline border, lift on hover via `.card-hover`); `.bg-grid` / `.bg-dots` add faint engineering textures to the hero, the flagship panel and the contact panel. Lists and grids inside a `Reveal` can use `.reveal-stagger` for a staggered entrance. All of it is plain CSS in `globals.css`.

## Theme

Light is the default; the hero is always dark (`.surface-dark`). The toggle stores the choice in `localStorage` and an inline script applies it before first paint. Colours are CSS variables in `globals.css`; there is one accent (`--accent`).

## Accessibility and motion

Semantic landmarks, one `h1` per page, visible focus rings, skip link, WAI-ARIA tabs on case studies, keyboard-operable mobile menu, and `prefers-reduced-motion` disables the reveal and transition animations. Text colours meet WCAG AA contrast in both themes.
