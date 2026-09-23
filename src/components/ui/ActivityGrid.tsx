"use client";

import { motion } from "framer-motion";

const COLUMNS = 26;
const ROWS = 7;

function seededIntensity(index: number): number {
  const x = Math.sin(index * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const CELLS = Array.from({ length: COLUMNS * ROWS }, (_, i) => seededIntensity(i));

export function ActivityGrid() {
  return (
    <div
      className="grid gap-1.5"
      style={{ gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))` }}
      role="presentation"
      aria-hidden="true"
    >
      {CELLS.map((intensity, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: (index % COLUMNS) * 0.015 }}
          className="aspect-square w-full transition-colors duration-300 hover:bg-accent"
          style={{
            backgroundColor:
              intensity > 0.82
                ? "var(--accent)"
                : intensity > 0.55
                ? "rgba(89,227,176,0.35)"
                : intensity > 0.3
                ? "var(--muted-2)"
                : "var(--bg-elevated)",
          }}
        />
      ))}
    </div>
  );
}
