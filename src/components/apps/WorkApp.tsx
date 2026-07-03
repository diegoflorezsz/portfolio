"use client";

import { projects } from "@/data/projects";
import { localizeText, useLanguage } from "@/i18n/language";
import { uiText } from "@/i18n/ui";

type WorkAppProps = {
  onOpenProject: (slug: string) => void;
};

export function WorkApp({ onOpenProject }: WorkAppProps) {
  const { language } = useLanguage();

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-white/50">{localizeText(uiText.window.finder, language)}</p>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight">{localizeText(uiText.window.selectedWork, language)}</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {projects.map((project) => (
          <button key={project.slug} type="button" onClick={() => onOpenProject(project.slug)} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-left transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
            <div className={`mb-4 flex h-20 items-center justify-center rounded-xl bg-gradient-to-br ${project.thumbnail.backgroundClass ?? "from-white/20 to-white/5"} text-xl font-bold text-white`}>
              {project.thumbnail.fallback}
            </div>
            <h4 className="font-semibold text-white">{project.title}</h4>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">{localizeText(project.category, language)} · {project.year}</p>
            <p className="mt-3 text-sm leading-5 text-white/50">{localizeText(project.summary, language)}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
