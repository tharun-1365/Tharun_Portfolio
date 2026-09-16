import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Hero } from "@/components/Hero";
import { ProjectList } from "@/components/ProjectList";
import { Skills } from "@/components/Skills";
import { hasProfileImage, hasResume } from "@/lib/assets";

export default function HomePage() {
  return (
    <>
      <Hero showResume={hasResume()} showProfileImage={hasProfileImage()} />
      <About />
      <ExperienceTimeline />
      <ProjectList />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}
