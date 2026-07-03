"use client";

import { localizeText, useLanguage } from "@/i18n/language";
import type { MaybeLocalizedText } from "@/i18n/types";
import type { WindowKind } from "@/types/window";

type AdobeDialogKind = Extract<WindowKind, "after-effects" | "photoshop" | "illustrator">;

type AdobeDialogAppProps = {
  kind: AdobeDialogKind;
  onClose: () => void;
};

const dialogContent: Record<
  AdobeDialogKind,
  { label: string; mark: string; message: MaybeLocalizedText; buttonLabel: MaybeLocalizedText }
> = {
  illustrator: {
    label: "Adobe Illustrator",
    mark: "Ai",
    message: {
      en: "More than three years building visual identities, packaging, editorial pieces and vector systems. Illustrator is the tool I know best, and where most of my professional work comes to life.",
      es: "Más de tres años construyendo identidades visuales, packaging, piezas editoriales y sistemas vectoriales. Illustrator es la herramienta que mejor domino y donde gran parte de mi trabajo profesional cobra vida.",
    },
    buttonLabel: { en: "Looks good", es: "Entendido" },
  },
  photoshop: {
    label: "Adobe Photoshop",
    mark: "Ps",
    message: {
      en: "Over three years creating high-end mockups, image manipulation, retouching, compositing and marketing assets. Photoshop has been part of nearly every client project I've delivered.",
      es: "Más de tres años creando mockups de alto nivel, manipulación de imágenes, retoque, composición y piezas de marketing. Photoshop ha formado parte de casi todos los proyectos de cliente que he entregado.",
    },
    buttonLabel: { en: "Continue", es: "Continuar" },
  },
  "after-effects": {
    label: "Adobe After Effects",
    mark: "Ae",
    message: {
      en: "Experienced creating motion graphics, interface animations and promotional visuals that add movement and polish whenever a project calls for it.",
      es: "Experiencia creando motion graphics, animaciones de interfaz y visuales promocionales que agregan movimiento y pulido cuando un proyecto lo necesita.",
    },
    buttonLabel: { en: "Cool, keep the good work", es: "Perfecto" },
  },
};

export function AdobeDialogApp({ kind, onClose }: AdobeDialogAppProps) {
  const { language } = useLanguage();
  const content = dialogContent[kind];

  return (
    <div className="adobe-dialog__body">
      <div className={`adobe-dialog__icon adobe-dialog__icon--${kind}`} aria-hidden="true">
        {content.mark}
      </div>
      <p className="adobe-dialog__message">{localizeText(content.message, language)}</p>
      <button type="button" className="adobe-dialog__action" onClick={onClose}>
        {localizeText(content.buttonLabel, language)}
      </button>
    </div>
  );
}
