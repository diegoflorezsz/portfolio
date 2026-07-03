"use client";

import { projects } from "@/data/projects";
import { localizeText, localizeTextArray, useLanguage } from "@/i18n/language";
import { uiText } from "@/i18n/ui";
import type { ProjectEditorialBlock, ProjectEditorialImage } from "@/types/portfolio";
import { useEffect, useId, useState } from "react";

type ProjectAppProps = {
  slug?: string;
};

export function ProjectApp({ slug }: ProjectAppProps) {
  const { language } = useLanguage();
  const project = projects.find((item) => item.slug === slug) ?? projects[0];
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);
  const detailsId = useId();
  const previewId = useId();
  const coverImage = project.editorialLayout?.[0]?.images[0];
  const category = translateTaxonomyText(localizeText(project.category, language), language);
  const summary = localizeText(project.summary, language);
  const description = localizeTextArray(project.description, language);
  const detailType = translateTaxonomyText(normalizeDetailText(localizeText(project.details?.type, language, ["Design", category, ...project.tags].join(" > "))), language);
  const detailTools = normalizeDetailText(localizeText(project.details?.tools, language));
  const editorialNote = localizeText(project.editorialNote, language);

  return (
    <article className="project-info">
      <section className={`project-info__identity ${project.slug === "graphiczsz" ? "project-info__identity--panoramic" : ""}`} aria-label="Project identity">
        <div className={`project-info__thumbnail ${project.slug === "graphiczsz" ? "project-info__thumbnail--panoramic" : ""}`}>
          {coverImage ? (
            <img src={coverImage.src} alt={coverImage.alt} />
          ) : (
            <span aria-hidden="true">{project.thumbnail.fallback}</span>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="project-info__name">{project.title}</h3>
          <p className="project-info__meta">{project.details?.role ?? `${category} · ${translateProjectYear(project.year, language)}`}</p>
        </div>
      </section>

      <section className="project-info__description" aria-label="Project description">
        {(description.length > 0 ? description : [summary]).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="project-info__section">
        <button
          type="button"
          className="project-info__disclosure"
          aria-expanded={isDetailsOpen}
          aria-controls={detailsId}
          onClick={() => setIsDetailsOpen((isOpen) => !isOpen)}
        >
          <DisclosureIcon isOpen={isDetailsOpen} />
          <span>{localizeText(uiText.project.details, language)}</span>
        </button>
        {isDetailsOpen ? (
          <div id={detailsId} className="project-info__details">
            <p>
              <span className="project-info__detail-label">{localizeText(uiText.project.type, language)}</span>{" "}
              <span>{detailType}</span>
            </p>
            {detailTools ? (
              <p>
                <span className="project-info__detail-label">{localizeText(uiText.project.tools, language)}</span>{" "}
                <span>{detailTools}</span>
              </p>
            ) : null}
          </div>
        ) : null}
      </section>

      <section className="project-info__section">
        <button
          type="button"
          className="project-info__disclosure"
          aria-expanded={isPreviewOpen}
          aria-controls={previewId}
          onClick={() => setIsPreviewOpen((isOpen) => !isOpen)}
        >
          <DisclosureIcon isOpen={isPreviewOpen} />
          <span>{localizeText(uiText.project.preview, language)}</span>
        </button>
        {isPreviewOpen ? (
          <div id={previewId} className="project-info__preview" aria-label={`${project.title} editorial preview`}>
            {project.editorialLayout?.map((editorialBlock, index) => (
              <EditorialBlock key={`${editorialBlock.kind}-${index}`} block={editorialBlock} projectSlug={project.slug} />
            ))}
            {editorialNote ? <p className="project-info__editorial-note">{editorialNote}</p> : null}
          </div>
        ) : null}
      </section>
    </article>
  );
}

const taxonomyEs: Record<string, string> = {
  Design: "Diseño",
  Brand: "Marca",
  Identity: "Identidad",
  "Art Direction": "Dirección de Arte",
  Digital: "Digital",
  Editorial: "Editorial",
  Print: "Impreso",
  Packaging: "Packaging",
  "Product Design": "Diseño de Producto",
};

function translateTaxonomyText(value: string, language: "en" | "es") {
  if (language !== "es") {
    return value;
  }

  return value
    .split(">")
    .map((term) => {
      const trimmedTerm = term.trim();
      return taxonomyEs[trimmedTerm] ?? trimmedTerm;
    })
    .join(" > ");
}

function translateProjectYear(value: number | string, language: "en" | "es") {
  if (language !== "es") {
    return String(value);
  }

  return String(value).replace(/Case Study/g, "Caso de estudio");
}
function normalizeDetailText(value: string) {
  return value.replace(/\s*\n\s*/g, " ").replace(/\s+/g, " ").trim();
}

function DisclosureIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg className="project-disclosure-icon" width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
      {isOpen ? <path d="M1.25 2.75 4 5.5l2.75-2.75" /> : <path d="m2.75 1.25 2.75 2.75-2.75 2.75" />}
    </svg>
  );
}

function EditorialBlock({ block, projectSlug }: { block: ProjectEditorialBlock; projectSlug: string }) {
  if (block.kind === "gallery-grid") {
    return <GalleryGrid endpoint="/api/gallery-images" />;
  }

  if (block.kind === "gallery-layout") {
    return <GalleryGrid endpoint={`/api/project-images?slug=${encodeURIComponent(projectSlug)}`} />;
  }

  return (
    <div className={`project-editorial project-editorial--${block.kind}`}>
      {block.images.map((editorialImage) => (
        <figure className="project-editorial__item" key={editorialImage.src}>
          <img src={editorialImage.src} alt={editorialImage.alt} loading="lazy" />
        </figure>
      ))}
    </div>
  );
}




type GalleryImagesResponse = {
  images: ProjectEditorialImage[];
};

function GalleryGrid({ endpoint }: { endpoint: string }) {
  const [images, setImages] = useState<ProjectEditorialImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<ProjectEditorialImage | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch(endpoint)
      .then((response) => (response.ok ? response.json() : { images: [] }))
      .then((data: GalleryImagesResponse) => {
        if (isMounted) {
          setImages(Array.isArray(data.images) ? data.images : []);
        }
      })
      .catch(() => {
        if (isMounted) {
          setImages([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [endpoint]);

  return (
    <>
      <div className="project-editorial project-editorial--gallery-grid">
        {images.map((image) => (
          <figure className="project-editorial__item" key={image.src}>
            <button
              type="button"
              className="project-editorial__button"
              onClick={() => setSelectedImage(image)}
              aria-label={`Open ${image.alt} fullscreen`}
            >
              <img src={image.src} alt={image.alt} loading="lazy" />
            </button>
          </figure>
        ))}
      </div>

      {selectedImage ? (
        <div className="project-lightbox" role="dialog" aria-modal="true" aria-label={selectedImage.alt}>
          <button type="button" className="project-lightbox__backdrop" onClick={() => setSelectedImage(null)}>
            <span className="sr-only">Close fullscreen preview</span>
          </button>
          <img className="project-lightbox__image" src={selectedImage.src} alt={selectedImage.alt} />
        </div>
      ) : null}
    </>
  );
}

