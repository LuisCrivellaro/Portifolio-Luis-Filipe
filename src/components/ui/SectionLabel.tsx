import { cn } from "@/lib/utils";

export function SectionLabel({
  index,
  label,
  className,
  light = false,
}: {
  index: string;
  label: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em]",
        light ? "text-bg/60" : "text-muted",
        className
      )}
    >
      <span className={light ? "text-bg" : "text-accent"}>{index}</span>
      <span className="h-px w-8 bg-current opacity-40" />
      <span>{label}</span>
    </div>
  );
}
