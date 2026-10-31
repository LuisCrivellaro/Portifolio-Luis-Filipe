"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Testimonial } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/useReducedMotion";

export type TestimonialItem = Testimonial & { projectName?: string };

const EASE = [0.16, 1, 0.3, 1] as const;
const SWIPE_THRESHOLD = 60;
const pad = (n: number) => String(n).padStart(2, "0");

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

// Photo, or the initials block when there is none: a deliberate, typographic portrait.
function Portrait({
  item,
  sizes,
  grayscale,
  className,
  eager,
}: {
  item: TestimonialItem;
  sizes: string;
  grayscale?: boolean;
  className?: string;
  eager?: boolean;
}) {
  if (item.photo) {
    return (
      <Image
        src={item.photo}
        alt={`Foto de ${item.name}`}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        draggable={false}
        className={cn(
          "object-cover transition-[filter] duration-700 ease-out",
          grayscale && "grayscale group-hover:grayscale-0",
          className
        )}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`Iniciais de ${item.name}`}
      className={cn("flex h-full w-full items-center justify-center bg-bg-elevated", className)}
    >
      <span className="font-display text-[30cqw] font-medium leading-none tracking-tight text-muted">
        {initials(item.name)}
      </span>
    </div>
  );
}

export function TestimonialsCarousel({ items }: { items: readonly TestimonialItem[] }) {
  const reduced = useReducedMotion();
  const [[index, direction], setState] = useState<[number, 1 | -1]>([0, 1]);
  const total = items.length;
  const current = items[index];
  const nextItem = items[(index + 1) % total];

  const go = (target: number, dir: 1 | -1) =>
    setState([((target % total) + total) % total, dir]);
  const next = () => go(index + 1, 1);
  const prev = () => go(index - 1, -1);
  const jump = (target: number) => go(target, target > index ? 1 : -1);

  // The next three testimonials after the current one (the current one is never shown).
  const upcoming = Array.from({ length: Math.min(3, total - 1) }, (_, k) => (index + 1 + k) % total);

  const instant = { duration: 0 };
  const photoVariants = {
    enter: (dir: number) => ({ clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }),
    center: { clipPath: "inset(0 0% 0 0%)", transition: reduced ? instant : { duration: 0.7, ease: EASE } },
    exit: { zIndex: 0, transition: reduced ? instant : { duration: 0.7 } },
  };
  const textVariants = {
    enter: { opacity: 0, y: 12 },
    center: { opacity: 1, y: 0, transition: reduced ? instant : { duration: 0.45, delay: 0.1, ease: EASE } },
    exit: { opacity: 0, y: -12, transition: reduced ? instant : { duration: 0.25 } },
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) next();
    else if (info.offset.x > SWIPE_THRESHOLD) prev();
  };

  const counter = (
    <p className="flex items-baseline gap-2 font-mono text-sm tracking-[0.1em]">
      <span className="relative inline-flex h-[1.2em] overflow-hidden text-fg">
        <AnimatePresence initial={false} mode="popLayout" custom={direction}>
          <motion.span
            key={index}
            custom={direction}
            variants={{
              enter: (dir: number) => ({ y: dir > 0 ? "100%" : "-100%" }),
              center: { y: 0, transition: reduced ? instant : { duration: 0.45, ease: EASE } },
              exit: (dir: number) => ({ y: dir > 0 ? "-100%" : "100%", transition: reduced ? instant : { duration: 0.45, ease: EASE } }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            className="inline-block"
          >
            {pad(index + 1)}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="text-muted">/ {pad(total)}</span>
    </p>
  );

  const label = "font-mono text-xs uppercase tracking-[0.3em] text-fg";

  const meta = (item: TestimonialItem) => (
    <>
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
        {item.role} · {item.company}
      </p>
      <p className="mt-2 text-lg font-medium text-fg">
        {item.linkedin ? (
          <a
            href={item.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group/name inline-flex items-center gap-1.5 transition-colors hover:text-accent"
          >
            {item.name}
            <ArrowUpRight size={14} strokeWidth={1.5} className="text-muted transition-colors group-hover/name:text-accent" />
          </a>
        ) : (
          item.name
        )}
      </p>
    </>
  );

  const quote = (item: TestimonialItem, size: string) => (
    <blockquote className={cn("font-display font-normal leading-snug text-fg", size)}>
      <span className="text-accent">“</span>
      {item.quote}”
    </blockquote>
  );

  const projectLink = (item: TestimonialItem) =>
    item.project && item.projectName ? (
      <a
        href={`#projeto-${item.project}`}
        className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-fg"
      >
        Ver projeto <ArrowRight size={12} strokeWidth={1.75} /> {item.projectName}
      </a>
    ) : null;

  const arrows = (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={prev}
        aria-label="Depoimento anterior"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-border-strong text-fg transition-colors hover:border-fg"
      >
        <ArrowLeft size={18} strokeWidth={1.5} />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Próximo depoimento"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-fg text-bg transition-colors hover:bg-accent"
      >
        <ArrowRight size={18} strokeWidth={1.75} />
      </button>
    </div>
  );

  const thumb = (i: number, className: string) => (
    <button
      key={items[i].name + i}
      type="button"
      onClick={() => jump(i)}
      aria-label={`Ver depoimento de ${items[i].name}`}
      className={cn("group relative shrink-0 overflow-hidden border border-border transition-colors hover:border-fg", className)}
    >
      <Portrait item={items[i]} sizes="96px" grayscale className="[container-type:inline-size]" />
    </button>
  );

  // The next photo, rendered invisibly at the same size so the browser fetches it ahead of time.
  const preloadNext = (sizes: string) =>
    nextItem.photo && nextItem !== current ? (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
        <Portrait item={nextItem} sizes={sizes} eager />
      </div>
    ) : null;

  const slideLabel = `${index + 1} de ${total}`;

  return (
    <div
      aria-roledescription="carousel"
      aria-label="Depoimentos"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") next();
        if (event.key === "ArrowLeft") prev();
      }}
      className="mt-12 md:mt-16"
    >
      {/* Desktop */}
      <div className="hidden min-h-[500px] grid-cols-12 gap-6 lg:grid">
        <div className="col-span-2 flex flex-col justify-between">
          {counter}
          <p className={cn(label, "self-start [writing-mode:vertical-rl] rotate-180")}>Depoimentos</p>
          <div className="flex gap-2">{upcoming.slice(0, 2).map((i) => thumb(i, "h-24 w-[76px]"))}</div>
        </div>

        <div className="col-span-4">
          <div
            aria-roledescription="slide"
            aria-label={slideLabel}
            className="group relative aspect-[3/4] w-full max-w-[360px] overflow-hidden border border-border bg-bg-elevated [container-type:inline-size]"
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={photoVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 z-10"
              >
                <Portrait item={current} sizes="360px" grayscale />
              </motion.div>
            </AnimatePresence>
            {preloadNext("360px")}
          </div>
        </div>

        <div className="col-span-5 col-start-8 flex flex-col justify-between">
          <div aria-live="polite">
            <AnimatePresence initial={false} mode="wait">
              <motion.div key={index} variants={textVariants} initial="enter" animate="center" exit="exit">
                {meta(current)}
                <div className="mt-8">{quote(current, "text-[clamp(1.5rem,2.4vw,2.25rem)]")}</div>
                {projectLink(current)}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-10">{arrows}</div>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between">
          <p className={label}>Depoimentos</p>
          {counter}
        </div>

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
          aria-roledescription="slide"
          aria-label={slideLabel}
          className="relative mt-6 aspect-[4/5] w-full touch-pan-y overflow-hidden border border-border bg-bg-elevated [container-type:inline-size]"
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={photoVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 z-10"
            >
              <Portrait item={current} sizes="100vw" />
            </motion.div>
          </AnimatePresence>
          {preloadNext("100vw")}
        </motion.div>

        <div aria-live="polite" className="mt-8">
          <AnimatePresence initial={false} mode="wait">
            <motion.div key={index} variants={textVariants} initial="enter" animate="center" exit="exit">
              {meta(current)}
              <div className="mt-5">{quote(current, "text-xl")}</div>
              {projectLink(current)}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center gap-4">
          {arrows}
          <div className="-mr-6 flex min-w-0 flex-1 snap-x snap-mandatory gap-2 overflow-x-auto pr-6">
            {items.map((_, i) => (i === index ? null : thumb(i, "h-[72px] w-14 snap-start")))}
          </div>
        </div>
      </div>
    </div>
  );
}
