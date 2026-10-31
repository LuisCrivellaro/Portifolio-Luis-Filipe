"use client";

import { House, Mail } from "lucide-react";
import { SITE } from "@/lib/data";
import { Dock, DockIcon } from "@/components/ui/dock";
import { GithubMark, LinkedinMark } from "@/components/ui/icons";

export function HeroDock() {
  return (
    <Dock>
      <DockIcon href="#top" label="Início">
        <House size={20} strokeWidth={1.75} aria-hidden="true" />
      </DockIcon>
      <DockIcon href={SITE.github} label="GitHub" external>
        <GithubMark size={20} />
      </DockIcon>
      <DockIcon href={SITE.linkedin} label="LinkedIn" external>
        <LinkedinMark size={20} />
      </DockIcon>
      <DockIcon href={`mailto:${SITE.email}`} label="E-mail">
        <Mail size={20} strokeWidth={1.75} aria-hidden="true" />
      </DockIcon>
    </Dock>
  );
}
