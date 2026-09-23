import { SITE } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-xl font-medium text-fg">{SITE.name}</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted">
            {SITE.role}
          </p>
        </div>

        <nav aria-label="Footer" className="flex gap-6 font-mono text-xs uppercase tracking-[0.15em]">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-fg"
          >
            GitHub
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-fg"
          >
            LinkedIn
          </a>
          <a href={`mailto:${SITE.email}`} className="text-muted transition-colors hover:text-fg">
            Email
          </a>
        </nav>
      </div>

      <p className="mx-auto mt-10 max-w-7xl font-mono text-[11px] tracking-[0.1em] text-muted-2">
        © {year} {SITE.name}. All rights reserved.
      </p>
    </footer>
  );
}
