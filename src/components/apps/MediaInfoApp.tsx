"use client";

import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import { localizeText, localizeTextArray, useLanguage } from "@/i18n/language";
import { uiText } from "@/i18n/ui";
import type { LocalizedText } from "@/i18n/types";
import type { ProjectEditorialImage } from "@/types/portfolio";

type MediaInfoAppProps = {
  kind: "gallery" | "trash";
};

type GalleryImagesResponse = {
  images: ProjectEditorialImage[];
};

const mediaInfo: Record<MediaInfoAppProps["kind"], { title: LocalizedText; mark: string }> = {
  gallery: {
    title: uiText.window.gallery,
    mark: "\u273F",
  },
  trash: {
    title: uiText.window.trash,
    mark: "\u2672",
  },
};

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
  Archive: "Archivo",
  Gallery: "Galería",
};

export function MediaInfoApp({ kind }: MediaInfoAppProps) {
  return kind === "gallery" ? <GalleryInfoApp /> : <TrashInfoApp kind={kind} />;
}

function TrashInfoApp({ kind }: MediaInfoAppProps) {
  const { language } = useLanguage();
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);
  const info = mediaInfo[kind];
  const title = localizeText(info.title, language);

  return (
    <article className="media-info">
      <section className="media-info__identity" aria-label={`${title} ${localizeText(uiText.media.information, language)}`}>
        <div className={`media-info__icon media-info__icon--${kind}`} aria-hidden="true">
          {info.mark}
        </div>
        <div>
          <h3 className="media-info__name">{title}</h3>
          <p className="media-info__meta">{localizeText(uiText.media.lowkeyDocumentation, language)}</p>
        </div>
      </section>

      <section className="project-info__section">
        <button
          type="button"
          className="project-info__disclosure"
          aria-expanded={isPreviewOpen}
          aria-controls={`${kind}-preview`}
          onClick={() => setIsPreviewOpen((isOpen) => !isOpen)}
        >
          <DisclosureIcon isOpen={isPreviewOpen} />
          <span>{localizeText(uiText.project.preview, language)}</span>
        </button>

        {isPreviewOpen ? (
          <div id={`${kind}-preview`} className="media-info__collection">
            {[1, 2, 3].map((item) => (
              <div key={item} className="media-info__preview" aria-label={`${title} ${localizeText(uiText.media.previewPlaceholder, language)} ${item}`}>
                <span>{String(item).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </article>
  );
}

function GalleryInfoApp() {
  const { language } = useLanguage();
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(true);
  const galleryProject = projects.find((project) => project.slug === "gallery");
  const title = galleryProject?.title ?? localizeText(uiText.window.gallery, language);
  const description = localizeTextArray(galleryProject?.description, language);
  const detailType = translateTaxonomyText(normalizeDetailText(localizeText(galleryProject?.details?.type, language)), language);
  const detailTools = normalizeDetailText(localizeText(galleryProject?.details?.tools, language));
  const editorialNote = localizeText(galleryProject?.editorialNote, language);

  return (
    <article className="project-info">
      <section className="project-info__identity" aria-label={`${title} ${localizeText(uiText.media.information, language)}`}>
        <div className="gallery-info__app-icon" aria-hidden="true">
          <img src="/dock-apps/gallery.png" alt="" />
        </div>
        <div className="min-w-0">
          <h3 className="project-info__name">{title}</h3>
          <p className="project-info__meta">{localizeText(uiText.media.lowkeyDocumentation, language)}</p>
        </div>
      </section>

      {description.length > 0 ? (
        <section className="project-info__description" aria-label="Gallery description">
          {description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ) : null}

      <section className="project-info__section">
        <button
          type="button"
          className="project-info__disclosure"
          aria-expanded={isDetailsOpen}
          aria-controls="gallery-details"
          onClick={() => setIsDetailsOpen((isOpen) => !isOpen)}
        >
          <DisclosureIcon isOpen={isDetailsOpen} />
          <span>{localizeText(uiText.project.details, language)}</span>
        </button>
        {isDetailsOpen ? (
          <div id="gallery-details" className="project-info__details">
            {detailType ? (
              <p>
                <span className="project-info__detail-label">{localizeText(uiText.project.type, language)}</span>{" "}
                <span>{detailType}</span>
              </p>
            ) : null}
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
          aria-controls="gallery-preview"
          onClick={() => setIsPreviewOpen((isOpen) => !isOpen)}
        >
          <DisclosureIcon isOpen={isPreviewOpen} />
          <span>{localizeText(uiText.project.preview, language)}</span>
        </button>
        {isPreviewOpen ? (
          <div id="gallery-preview" className="project-info__preview" aria-label={`${title} editorial preview`}>
            <GalleryGrid />
            {editorialNote ? <p className="project-info__editorial-note">{editorialNote}</p> : null}
          </div>
        ) : null}
      </section>
    </article>
  );
}

function GalleryGrid() {
  const [images, setImages] = useState<ProjectEditorialImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<ProjectEditorialImage | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/gallery-images")
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
  }, []);

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

function DisclosureIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg className="project-disclosure-icon" width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
      {isOpen ? <path d="M1.25 2.75 4 5.5l2.75-2.75" /> : <path d="m2.75 1.25 2.75 2.75-2.75 2.75" />}
    </svg>
  );
}

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

function normalizeDetailText(value: string) {
  return value.replace(/\s*\n\s*/g, " ").replace(/\s+/g, " ").trim();
}
