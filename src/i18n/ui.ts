import type { LocalizedText } from "./types";

export const uiText = {
  topbar: {
    portfolio: { en: "GZSZ Portfolio", es: "GZSZ Portfolio" },
    services: { en: "Services", es: "Servicios" },
    about: { en: "About", es: "Sobre mí" },
    contact: { en: "Contact", es: "Contacto" },
    available: { en: "Available", es: "Disponible" },
  },
  dock: {
    open: { en: "Open", es: "Abrir" },
    focus: { en: "Focus", es: "Enfocar" },
    translate: { en: "Translate", es: "Traducir" },
  },
  window: {
    informationAbout: { en: "Information about:", es: "Información sobre:" },
    close: { en: "Close window", es: "Cerrar ventana" },
    minimize: { en: "Minimize window", es: "Minimizar ventana" },
    maximize: { en: "Maximize window", es: "Maximizar ventana" },
    restore: { en: "Restore window", es: "Restaurar ventana" },
    zoomUnavailable: { en: "Zoom unavailable", es: "Zoom no disponible" },
    selectedWork: { en: "Selected Work", es: "Trabajo seleccionado" },
    archive: { en: "Archive", es: "Archivo" },
    olderExperiments: { en: "Older experiments", es: "Experimentos anteriores" },
    finder: { en: "Finder", es: "Finder" },
    notesTitle: {
      en: "Information about: Flores Diego, diegoafloresc@gmail.com",
      es: "Información sobre: Flores Diego, diegoafloresc@gmail.com",
    },
    gallery: { en: "Gallery", es: "Galería" },
    trash: { en: "Trash", es: "Papelera" },
  },
  project: {
    details: { en: "Details:", es: "Detalles:" },
    preview: { en: "Preview:", es: "Vista previa:" },
    type: { en: "Type:", es: "Tipo:" },
    tools: { en: "Tools:", es: "Herramientas:" },
    editorialNote: { en: "Editorial Note:", es: "Nota editorial:" },
  },
  notes: {
    about: { en: "About Me", es: "Sobre mí" },
    services: { en: "Services", es: "Servicios" },
    experience: { en: "Experience", es: "Experiencia" },
    tools: { en: "Tools", es: "Herramientas" },
    education: { en: "Education", es: "Educación" },
    languages: { en: "Languages", es: "Idiomas" },
    ai: { en: "AI Workflow", es: "Flujo con IA" },
    contact: { en: "Contact", es: "Contacto" },
    profileSections: { en: "Profile sections", es: "Secciones del perfil" },
    present: { en: "Present", es: "Presente" },
    toolsRegularly: { en: "Tools I use regularly:", es: "Herramientas que uso regularmente:" },
    email: { en: "Email", es: "Correo" },
    phone: { en: "Phone", es: "Teléfono" },
    location: { en: "Location", es: "Ubicación" },
  },
  media: {
    lowkeyDocumentation: { en: "Lowkey documentation", es: "Documentación lowkey" },
    information: { en: "information", es: "información" },
    previewPlaceholder: { en: "preview placeholder", es: "marcador de vista previa" },
  },
} satisfies Record<string, unknown>;

export function t(value: LocalizedText, language: "en" | "es") {
  return value[language] || value.en;
}
