"use client";

import { localizeText, useLanguage } from "@/i18n/language";

const capabilities = [
  { en: "Art direction", es: "Dirección de arte" },
  { en: "Identity systems", es: "Sistemas de identidad" },
  { en: "Digital experiences", es: "Experiencias digitales" },
];

export function AboutApp() {
  const { language } = useLanguage();

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-white/50">{localizeText({ en: "About", es: "Sobre mí" }, language)}</p>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight">
          {localizeText({ en: "Creative desktop portfolio", es: "Portfolio creativo de escritorio" }, language)}
        </h3>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-white/80">
        {localizeText(
          "This placeholder About app introduces the portfolio owner, their practice, and their capabilities. Replace this copy with a concise bio, location, availability, and the kind of work you want visitors to remember.",
          language,
        )}
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {capabilities.map((capability) => (
          <div key={capability.en} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-white/80">
            {localizeText(capability, language)}
          </div>
        ))}
      </div>
    </div>
  );
}
