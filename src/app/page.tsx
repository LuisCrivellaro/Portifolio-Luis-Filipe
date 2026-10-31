import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Recognition } from "@/components/sections/Recognition";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { GithubSection } from "@/components/sections/GithubSection";
import { Contact } from "@/components/sections/Contact";
import { RECOGNITION, SITE } from "@/lib/data";
import { publicAssetExists } from "@/lib/assets";

export default function Home() {
  const cv = publicAssetExists(SITE.cv) ? SITE.cv : undefined;
  const recognitions = RECOGNITION.filter((item) => item.award);

  // Section labels are numbered in the order they render, so a hidden section leaves no gap.
  let count = 0;
  const next = () => String(++count).padStart(2, "0");

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero cv={cv} />
        <About index={next()} />
        <Experience index={next()} />
        {recognitions.length > 0 && <Recognition index={next()} items={recognitions} />}
        <Projects index={next()} />
        <Skills index={next()} />
        <GithubSection index={next()} />
        <Contact index={next()} cv={cv} />
      </main>
      <Footer />
    </>
  );
}
