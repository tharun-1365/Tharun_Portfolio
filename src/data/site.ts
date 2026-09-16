/**
 * Site-wide identity and contact details.
 */
export const site = {
  name: "Tharun Kumar S",
  /** Short mono tag used in the navbar/footer. */
  handle: "tharun-1365",
  role: "Software Developer",
  roleSecondary: "Game Developer · AI/ML",
  positioning: "Software Developer | Game Developer | AI/ML",
  tagline:
    "Information Technology student building software systems, interactive experiences, and AI-driven applications.",
  location: "Chennai, India",
  email: "stharunkumar2005@gmail.com",
  phone: "+91 7904705318",
  phoneHref: "tel:+917904705318",
  github: "https://github.com/tharun-1365",
  linkedin: "https://www.linkedin.com/in/tharunkumar13062005/",
  /**
   * Resume PDF. Place the file at `public/Tharun-Kumar-S-Resume.pdf`.
   * The Download Resume buttons render only when the file exists at build time.
   */
  resumePath: "/Tharun-Kumar-S-Resume.pdf",
  resumeFileName: "Tharun-Kumar-S-Resume.pdf",
  /**
   * Profile photo. Place the file at `public/profile.jpg` (square crop, ~800px).
   * A neutral monogram is rendered until the file exists.
   */
  profileImagePath: "/profile.jpg",
  profileImageFileName: "profile.jpg",
  /** Set to the deployed origin before going live (used for Open Graph + sitemap). */
  url: "https://tharun-1365.github.io",
  seo: {
    title: "Tharun Kumar S | Software Developer | Game Developer | AI/ML",
    description:
      "Tharun Kumar S — Information Technology student in Chennai building software systems, Unity games, automated QA tooling, and AI/ML applications.",
  },
} as const;

export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
] as const;
