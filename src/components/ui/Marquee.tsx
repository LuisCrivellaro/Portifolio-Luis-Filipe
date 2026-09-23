"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";

export function Marquee({ items, duration = 55 }: { items: readonly string[]; duration?: number }) {
  const reducedMotion = useReducedMotion();
  const track = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-6" aria-hidden="true">
      <div
        className="flex w-max gap-10 whitespace-nowrap"
        style={
          reducedMotion
            ? undefined
            : { animation: `marquee ${duration}s linear infinite` }
        }
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-medium uppercase text-transparent"
            style={{ WebkitTextStroke: "1px var(--border-strong)" }}
          >
            {item}
            <span className="mx-6 text-accent">/</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
