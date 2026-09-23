"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/data";
import { cn } from "@/lib/utils";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(
      (el): el is Element => Boolean(el)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled ? "bg-bg/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10"
      >
        <a
          href="#top"
          className="font-mono text-xs uppercase tracking-[0.2em] text-fg transition-opacity hover:opacity-70"
        >
          {SITE.name}
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "relative font-mono text-xs uppercase tracking-[0.15em] transition-colors",
                  activeId === link.href ? "text-fg" : "text-muted hover:text-fg"
                )}
              >
                {link.label}
                {activeId === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-2 left-0 h-px w-full bg-accent"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <MobileMenu activeId={activeId} />
      </nav>

      <motion.div
        className="h-px origin-left bg-accent/60"
        style={{ scaleX: scrollYProgress }}
      />
    </header>
  );
}
