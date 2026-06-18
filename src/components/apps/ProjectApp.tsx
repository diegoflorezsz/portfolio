import { projects } from "@/data/projects";

type ProjectAppProps = {
  slug?: string;
};

export function ProjectApp({ slug }: ProjectAppProps) {
  const project = projects.find((item) => item.slug === slug) ?? projects[0];

  return (
    <article className="space-y-5">
      <div className={`flex h-48 items-center justify-center rounded-3xl bg-gradient-to-br ${project.thumbnail.backgroundClass ?? "from-white/20 to-white/5"} text-5xl font-black text-white shadow-inner`}>
        {project.thumbnail.fallback}
      </div>
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-white/50">{project.category} · {project.year}</p>
        <h3 className="mt-2 text-4xl font-semibold tracking-tight">{project.title}</h3>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-white/80">{project.summary}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80">
            {tag}
          </span>
        ))}
      </div>
      <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-5 text-sm leading-6 text-white/50">
        Project detail galleries, media, credits, and external links will be added in a later phase.
      </div>
    </article>
  );
}
