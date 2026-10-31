"use client";

import { createContext, useContext, useId, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsTouchDevice } from "@/lib/useIsTouchDevice";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./dock.module.css";

type DockContextValue = {
  mouseX: MotionValue<number>;
  magnification: boolean;
};

const DockContext = createContext<DockContextValue | null>(null);

// Keep the styling entry point without adding a variant library for a single theme.
export function dockVariants({ className }: { className?: string } = {}) {
  return cn(styles.dock, className);
}

export function Dock({ children, className }: { children: ReactNode; className?: string }) {
  const mouseX = useMotionValue(Infinity);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const magnification = !reducedMotion && !isTouch;

  return (
    <DockContext.Provider value={{ mouseX, magnification }}>
      <nav
        aria-label="Acesso rápido"
        className={dockVariants({ className })}
        onPointerMove={(event) => {
          if (magnification && event.pointerType === "mouse") mouseX.set(event.clientX);
        }}
        onPointerLeave={() => mouseX.set(Infinity)}
        onPointerCancel={() => mouseX.set(Infinity)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) mouseX.set(Infinity);
        }}
      >
        <ul className={styles.items}>{children}</ul>
      </nav>
    </DockContext.Provider>
  );
}

type DockIconProps = {
  children: ReactNode;
  href: string;
  label: string;
  external?: boolean;
};

export function DockIcon({ children, href, label, external = false }: DockIconProps) {
  const context = useContext(DockContext);
  if (!context) throw new Error("DockIcon must be rendered inside Dock.");

  const { mouseX, magnification } = context;
  const slotRef = useRef<HTMLLIElement>(null);
  const tooltipId = useId();
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  // Measure the fixed slot, so magnification never moves its own reference point.
  const distance = useTransform(mouseX, (position) => {
    const bounds = slotRef.current?.getBoundingClientRect();
    return bounds ? position - bounds.left - bounds.width / 2 : Infinity;
  });
  const targetScale = useTransform(distance, [-140, 0, 140], [1, 1.32, 1]);
  const scale = useSpring(targetScale, { stiffness: 300, damping: 30, mass: 0.2 });

  return (
    <li
      ref={slotRef}
      className={styles.item}
      data-tooltip-dismissed={tooltipDismissed || undefined}
      onPointerEnter={() => setTooltipDismissed(false)}
      onFocus={() => setTooltipDismissed(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setTooltipDismissed(true);
      }}
    >
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={external ? `${label} (abre em nova aba)` : label}
        aria-describedby={tooltipId}
        className={styles.link}
        style={{ scale: magnification ? scale : 1 }}
      >
        {children}
      </motion.a>
      <span id={tooltipId} role="tooltip" className={styles.tooltip}>
        {label}
      </span>
    </li>
  );
}
