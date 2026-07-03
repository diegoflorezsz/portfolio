"use client";

import { useEffect, useState } from "react";
import { localizeText, useLanguage } from "@/i18n/language";
import { uiText } from "@/i18n/ui";
import type { MaybeLocalizedText } from "@/i18n/types";
import type { NotesSectionId } from "@/types/window";

const notesSections = [
  { id: "about", label: uiText.notes.about, marker: "01" },
  { id: "services", label: uiText.notes.services, marker: "13" },
  { id: "experience", label: uiText.notes.experience, marker: "04" },
  { id: "tools", label: uiText.notes.tools, marker: "10" },
  { id: "education", label: uiText.notes.education, marker: "03" },
  { id: "languages", label: uiText.notes.languages, marker: "03" },
  { id: "ai-workflow", label: uiText.notes.ai, marker: "AI" },
  { id: "contact", label: uiText.notes.contact, marker: "" },
] as const;

const aboutParagraphs: MaybeLocalizedText[] = [
  {
    en: "I'm Diego Flores, a Graphic Designer and Creative Strategist based in Caracas, Venezuela.",
    es: "Soy Diego Flores, diseñador gráfico y estratega creativo basado en Caracas, Venezuela.",
  },
  {
    en: "Over the last three years, I've helped startups, founders and businesses build brands that don't just look good — they communicate clearly, connect with people and support business growth.",
    es: "Durante los últimos tres años, he ayudado a startups, fundadores y negocios a construir marcas que no solo se ven bien: comunican con claridad, conectan con las personas y apoyan el crecimiento del negocio.",
  },
  {
    en: "My work combines branding, marketing strategy, consumer psychology and technology to create visual systems that are both aesthetically strong and commercially effective.",
    es: "Mi trabajo combina branding, estrategia de marketing, psicología del consumidor y tecnología para crear sistemas visuales estéticamente sólidos y comercialmente efectivos.",
  },
  {
    en: "I design brands that are built to perform, not just to look good.",
    es: "Diseño marcas construidas para funcionar, no solo para verse bien.",
  },
];

const servicesIntro: MaybeLocalizedText = {
  en: "I specialize in creating complete visual systems that help brands communicate with clarity, consistency and purpose.",
  es: "Me especializo en crear sistemas visuales completos que ayudan a las marcas a comunicar con claridad, consistencia y propósito.",
};

const services: MaybeLocalizedText[] = [
  { en: "Brand Identity", es: "Identidad de Marca" },
  { en: "Visual Identity Systems", es: "Sistemas de Identidad Visual" },
  { en: "Art Direction", es: "Dirección de Arte" },
  { en: "Creative Direction", es: "Dirección Creativa" },
  { en: "Advertising Creatives", es: "Creatividades Publicitarias" },
  { en: "Landing Pages", es: "Landing Pages" },
  { en: "Social Media Design", es: "Diseño para Redes Sociales" },
  { en: "Marketing Assets", es: "Piezas de Marketing" },
  { en: "Meta Ads Creatives", es: "Creatividades para Meta Ads" },
  { en: "Conversion-focused Design", es: "Diseño Enfocado en Conversión" },
  { en: "Brand Positioning", es: "Posicionamiento de Marca" },
  { en: "Creative Strategy", es: "Estrategia Creativa" },
  { en: "AI-assisted Creative Workflows", es: "Flujos Creativos Asistidos por IA" },
];

const tools = [
  "Adobe Illustrator",
  "Adobe Photoshop",
  "Adobe After Effects",
  "Figma",
  "Canva",
  "ChatGPT",
  "Claude",
  "Claude Code",
  "Supabase",
  "Kling",
  "Higgsfield",
  "Microsoft Office",
];

const aiTools = ["ChatGPT", "Claude", "Claude Code", "Kling", "Higgsfield", "Supabase"];

type NotesAppProps = {
  requestedSection?: NotesSectionId;
};

export function NotesApp({ requestedSection = "about" }: NotesAppProps) {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState<NotesSectionId>(requestedSection);

  useEffect(() => {
    setActiveSection(requestedSection);
  }, [requestedSection]);

  const text = (value: MaybeLocalizedText) => localizeText(value, language);

  const content = {
    about: (
      <div className="space-y-3">
        {aboutParagraphs.map((paragraph) => (
          <p key={localizeText(paragraph, "en")}>{text(paragraph)}</p>
        ))}
      </div>
    ),
    services: (
      <div className="space-y-3">
        <p>{text(servicesIntro)}</p>
        <ul className="space-y-1">
          {services.map((service) => (
            <li key={localizeText(service, "en")}>{text(service)}</li>
          ))}
        </ul>
      </div>
    ),
    experience: (
      <div className="space-y-4">
        <section>
          <h4 className="font-semibold text-[#282723]">{text({ en: "Independent Creative Strategist", es: "Estratega Creativo Independiente" })}</h4>
          <p className="text-[#5f5c56]">2023 — {text(uiText.notes.present)}</p>
          <p className="mt-1">
            {text({
              en: "Worked with more than 40 brands across different industries, developing visual identities, advertising creatives, digital campaigns and marketing assets focused on growth and conversion.",
              es: "He trabajado con más de 40 marcas en distintas industrias, desarrollando identidades visuales, creatividades publicitarias, campañas digitales y piezas de marketing enfocadas en crecimiento y conversión.",
            })}
          </p>
        </section>
        <section>
          <h4 className="font-semibold text-[#282723]">A Plus Driver</h4>
          <p className="font-medium text-[#3f3d38]">{text({ en: "Co-Founder & Creative Lead", es: "Co-Fundador y Líder Creativo" })}</p>
          <p className="text-[#5f5c56]">2024 — {text(uiText.notes.present)}</p>
          <p className="mt-1">
            {text({
              en: "Leading branding, creative direction and digital growth strategies for a transportation-focused startup helping independent drivers build premium online businesses.",
              es: "Liderando branding, dirección creativa y estrategias de crecimiento digital para una startup enfocada en transporte que ayuda a conductores independientes a construir negocios premium en línea.",
            })}
          </p>
        </section>
        <section>
          <h4 className="font-semibold text-[#282723]">Nexora</h4>
          <p className="font-medium text-[#3f3d38]">{text({ en: "Co-Founder & Creative Lead", es: "Co-Fundador y Líder Creativo" })}</p>
          <p className="text-[#5f5c56]">2026 — {text(uiText.notes.present)}</p>
          <p className="mt-1">
            {text({
              en: "Building a modern healthcare platform focused on branding, appointment systems and digital communication for healthcare professionals.",
              es: "Construyendo una plataforma moderna de salud enfocada en branding, sistemas de citas y comunicación digital para profesionales de la salud.",
            })}
          </p>
        </section>
        <section>
          <h4 className="font-semibold text-[#282723]">Wholesale Shelf Corporations</h4>
          <p className="font-medium text-[#3f3d38]">Fronter</p>
          <p className="text-[#5f5c56]">2025 — 2026</p>
          <p className="mt-1">
            {text({
              en: "Developed persuasive communication skills through high-volume lead generation and outbound sales, achieving conversion rates of up to 35%.",
              es: "Desarrollé habilidades de comunicación persuasiva mediante generación de leads de alto volumen y ventas outbound, alcanzando tasas de conversión de hasta 35%.",
            })}
          </p>
        </section>
      </div>
    ),
    tools: (
      <ul className="space-y-1">
        {tools.map((tool) => (
          <li key={tool}>{tool}</li>
        ))}
      </ul>
    ),
    education: (
      <div className="space-y-4">
        <section>
          <h4 className="font-semibold text-[#282723]">Universidad Católica Andrés Bello</h4>
          <p>{text({ en: "Bachelor's Degree in Computer Engineering", es: "Licenciatura en Ingeniería Informática" })}</p>
          <p className="text-[#5f5c56]">{text({ en: "Expected Graduation — 2027", es: "Graduación Esperada — 2027" })}</p>
        </section>
        <section>
          <h4 className="font-semibold text-[#282723]">CentecPro</h4>
          <p>{text({ en: "Professional Graphic Design Course", es: "Curso Profesional de Diseño Gráfico" })}</p>
          <p className="text-[#5f5c56]">
            {text({
              en: "Adobe Photoshop, Adobe Illustrator, branding fundamentals and digital visual communication.",
              es: "Adobe Photoshop, Adobe Illustrator, fundamentos de branding y comunicación visual digital.",
            })}
          </p>
        </section>
        <section>
          <h4 className="font-semibold text-[#282723]">Colegio Rioclaro</h4>
          <p>{text({ en: "High School Diploma in Sciences", es: "Bachillerato en Ciencias" })}</p>
          <p className="text-[#5f5c56]">{text({ en: "Graduated as Top Student of the Class.", es: "Graduado como mejor estudiante de la promoción." })}</p>
        </section>
      </div>
    ),
    languages: (
      <div className="space-y-1">
        <p>{text({ en: "Spanish — Native", es: "Español — Nativo" })}</p>
        <p>{text({ en: "English — C2", es: "Inglés — C2" })}</p>
        <p>{text({ en: "French — Basic Working Proficiency", es: "Francés — Competencia básica profesional" })}</p>
      </div>
    ),
    "ai-workflow": (
      <div className="space-y-3">
        <p>{text({ en: "AI is part of my workflow — not a replacement for creativity.", es: "La IA es parte de mi flujo de trabajo — no un reemplazo de la creatividad." })}</p>
        <p>
          {text({
            en: "I use modern tools to accelerate research, ideation and production while keeping strategy, design thinking and creative direction at the center of every project.",
            es: "Uso herramientas modernas para acelerar investigación, ideación y producción, manteniendo la estrategia, el pensamiento de diseño y la dirección creativa en el centro de cada proyecto.",
          })}
        </p>
        <div>
          <p className="mb-1 font-semibold text-[#282723]">{text(uiText.notes.toolsRegularly)}</p>
          <ul className="space-y-1">
            {aiTools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
      </div>
    ),
    contact: (
      <div className="space-y-3">
        <section>
          <h4 className="font-semibold text-[#282723]">{text(uiText.notes.email)}</h4>
          <p>
            <a href="mailto:diegoafloresc@gmail.com">diegoafloresc@gmail.com</a>
          </p>
        </section>
        <section>
          <h4 className="font-semibold text-[#282723]">{text(uiText.notes.phone)}</h4>
          <p>
            <a href="tel:+584145043617">+58 414 5043617</a>
          </p>
        </section>
        <section>
          <h4 className="font-semibold text-[#282723]">{text(uiText.notes.location)}</h4>
          <p>Caracas, Venezuela</p>
        </section>
        <section>
          <h4 className="font-semibold text-[#282723]">Instagram</h4>
          <p>
            <a href="https://www.instagram.com/graphiczsz" target="_blank" rel="noreferrer">
              @graphiczsz
            </a>
          </p>
        </section>
      </div>
    ),
  } satisfies Record<NotesSectionId, React.ReactNode>;

  return (
    <div className="notes-app">
      <nav className="notes-app__sidebar" aria-label={text(uiText.notes.profileSections)}>
        <div className="notes-app__sidebar-heading">Diego Flores</div>
        <div className="notes-app__navigation">
          {notesSections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={`notes-app__tab ${activeSection === section.id ? "is-active" : ""}`}
              aria-current={activeSection === section.id ? "page" : undefined}
              onClick={() => setActiveSection(section.id)}
            >
              <span>{text(section.label)}</span>
              <span className="notes-app__marker">{section.marker}</span>
            </button>
          ))}
        </div>
      </nav>

      <section className="notes-app__content" aria-live="polite">
        <div className="notes-app__placeholder">{content[activeSection]}</div>
      </section>
    </div>
  );
}
