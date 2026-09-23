"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const reducedMotion = useReducedMotion();
  const enabled = !isTouch && !reducedMotion;

  useEffect(() => {
    if (!enabled) {
      document.documentElement.removeAttribute("data-cursor-ready");
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.setAttribute("data-cursor-ready", "true");

    const moveDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const moveDotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const moveRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const moveRingY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    const handleMove = (event: MouseEvent) => {
      moveDot(event.clientX);
      moveDotY(event.clientY);
      moveRing(event.clientX);
      moveRingY(event.clientY);
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor='hover']");
      ring.classList.toggle("scale-[1.8]", Boolean(interactive));
      ring.classList.toggle("opacity-40", Boolean(interactive));
    };

    const handleLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };
    const handleEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
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
        className="fixed left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg/40 transition-transform duration-200 ease-out opacity-70"
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />
    </div>
  );
}
