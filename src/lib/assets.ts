import { existsSync } from "node:fs";
import path from "node:path";
import { site } from "@/data/site";

/**
 * Build-time checks for optional static assets. Server components call these
 * so the site renders cleanly whether or not the files have been added yet.
 *
 *   public/profile.jpg                  → hero / about portrait
 *   public/Tharun-Kumar-S-Resume.pdf    → Download Resume buttons
 */
function publicFileExists(fileName: string): boolean {
  return existsSync(path.join(process.cwd(), "public", fileName));
}

export function hasProfileImage(): boolean {
  return publicFileExists(site.profileImageFileName);
}

export function hasResume(): boolean {
  return publicFileExists(site.resumeFileName);
}
