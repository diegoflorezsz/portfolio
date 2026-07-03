"use client";

import { folders } from "@/data/folders";
import { projects } from "@/data/projects";
import { localizeText, useLanguage } from "@/i18n/language";
import { uiText } from "@/i18n/ui";

type ArchiveAppProps = {
  onOpenProject: (slug: string) => void;
};

export function ArchiveApp({ onOpenProject }: ArchiveAppProps) {
  const { language } = useLanguage();
  const archiveFolder = folders.find((folder) => folder.id === "archive");
  const archiveProjects = projects.filter((project) => archiveFolder?.itemIds.includes(project.slug));

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-white/50">{localizeText(uiText.window.archive, language)}</p>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight">{localizeText(uiText.window.olderExperiments, language)}</h3>
      </div>
      <div className="space-y-3">
        {archiveProjects.map((project) => (
          <button key={project.slug} type="button" onClick={() => onOpenProject(project.slug)} className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 text-left transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${project.thumbnail.backgroundClass ?? "from-white/20 to-white/5"} font-bold`}>
              {project.thumbnail.fallback}
            </span>
            <span>
              <span className="block font-semibold text-white">{project.title}</span>
              <span className="block text-sm text-white/50">{localizeText(project.category, language)} · {project.year}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
