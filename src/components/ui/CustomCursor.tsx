"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();
  const enabled = !isTouch && !reducedMotion;

  useEffect(() => {
    if (!enabled) {
      document.documentElement.removeAttribute("data-cursor-ready");
      return;
    }

    const ring = ringRef.current;
    if (!ring) return;

    document.documentElement.setAttribute("data-cursor-ready", "true");

    const moveRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    const moveRingY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });

    const handleMove = (event: MouseEvent) => {
      moveRing(event.clientX);
      moveRingY(event.clientY);
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor='hover']");
      ring.classList.toggle("border-accent", Boolean(interactive));
    };

    const handleLeave = () => {
      gsap.to(ring, { opacity: 0, duration: 0.2 });
    };
    const handleEnter = () => {
      gsap.to(ring, { opacity: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      document.documentElement.removeAttribute("data-cursor-ready");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg/50 transition-colors duration-200"
      />
    </div>
  );
}
