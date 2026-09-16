"use client";

import { useSyncExternalStore } from "react";

/** True once the window has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 8): boolean {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      return () => window.removeEventListener("scroll", onChange);
    },
    () => window.scrollY > threshold,
    () => false,
  );
}

export type Theme = "light" | "dark";

/** Current theme, derived from the `dark` class ThemeScript/ThemeToggle set on <html>. */
export function useTheme(): Theme {
  return useSyncExternalStore(
    (onChange) => {
      const observer = new MutationObserver(onChange);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      return () => observer.disconnect();
    },
    () => (document.documentElement.classList.contains("dark") ? "dark" : "light"),
    () => "light",
  );
}
