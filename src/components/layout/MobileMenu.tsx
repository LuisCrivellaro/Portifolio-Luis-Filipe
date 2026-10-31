"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/data";
import { cn } from "@/lib/utils";

export function MobileMenu({ activeId }: { activeId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
        aria-expanded={open}
        className="text-fg"
      >
        <Menu size={22} strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex flex-col bg-bg"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg">
                {SITE.name}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="text-fg"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <nav aria-label="Menu principal" className="flex flex-1 flex-col justify-center gap-2 px-8">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 * index, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "font-display text-4xl font-medium tracking-tight",
                    activeId === link.href ? "text-accent" : "text-fg"
                  )}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="px-8 pb-10 font-mono text-xs uppercase tracking-[0.15em] text-muted">
              {SITE.role}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
