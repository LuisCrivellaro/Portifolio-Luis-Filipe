"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  download?: boolean;
  ariaLabel?: string;
};

export function MagneticButton({
  children,
  className,
  as = "button",
  href,
  onClick,
  target,
  rel,
  download,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    const el = ref.current;
    if (!el || isTouch) return;

    const moveX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

    const handleMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      moveX(relX * 0.25);
      moveY(relY * 0.25);
    };

    const handleLeave = () => {
      moveX(0);
      moveY(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [isTouch]);

  return (
    <div ref={ref} className={cn("inline-block will-change-transform", className)}>
      {as === "a" ? (
        <a
          href={href}
          onClick={onClick}
          target={target}
          rel={rel}
          download={download}
          aria-label={ariaLabel}
          className="inline-flex items-center gap-3"
        >
          {children}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          aria-label={ariaLabel}
          className="inline-flex items-center gap-3"
        >
          {children}
        </button>
      )}
    </div>
  );
}
