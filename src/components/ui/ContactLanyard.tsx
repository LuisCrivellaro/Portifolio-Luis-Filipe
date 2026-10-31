"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { CONTACT } from "@/lib/data";

const Lanyard = dynamic(() => import("./Lanyard"), { ssr: false });

export function ContactLanyard() {
  const rootRef = useRef<HTMLElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);
  const handleError = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNearViewport(true);
        observer.disconnect();
      },
      { rootMargin: "300px" }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <figure
      ref={rootRef}
      className="relative h-[440px] w-full min-w-0 overflow-hidden rounded-2xl border border-accent/15 bg-[radial-gradient(ellipse_at_50%_35%,var(--accent-dim),transparent_70%)] sm:h-[500px] md:h-[540px]"
      aria-label="Crachá de Luis Filipe Crivellaro"
    >
      <Image
        src={CONTACT.avatar.src}
        alt={CONTACT.avatar.alt}
        fill
        sizes="(min-width: 1280px) 500px, (min-width: 768px) 42vw, 100vw"
        draggable={false}
        aria-hidden={ready && !failed}
        className={`pointer-events-none object-contain p-12 pb-16 ${ready && !failed ? "invisible" : ""}`}
      />
      {nearViewport && !failed && (
        <Lanyard
          frontImage={CONTACT.avatar.src}
          backImage={CONTACT.avatar.src}
          imageFit="contain"
          finish="matte"
          cardColor="#ffffff"
          strapColor="#12382a"
          strapWidth={0.65}
          strapLength={0.35}
          size={0.58}
          metal="graphite"
          breeze={0.08}
          damping={0.7}
          intro={false}
          onReady={handleReady}
          onError={handleError}
        />
      )}
      <figcaption className="pointer-events-none absolute inset-x-4 bottom-5 text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-muted">
        {failed ? "Luis Filipe Crivellaro" : "Arraste para mover · clique para virar"}
        <span className="sr-only">
          {" "}Pelo teclado, use Enter ou Espaço para virar o crachá.
        </span>
      </figcaption>
    </figure>
  );
}
