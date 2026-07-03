"use client";

import { socialLinks } from "@/data/socialLinks";
import { localizeText, useLanguage } from "@/i18n/language";

export function ContactApp() {
  const { language } = useLanguage();

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-white/50">{localizeText({ en: "Contact", es: "Contacto" }, language)}</p>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight">
          {localizeText({ en: "Start a conversation", es: "Iniciar una conversación" }, language)}
        </h3>
      </div>
      <p className="text-sm leading-6 text-white/80">
        {localizeText(
          "Use these placeholder links for now. Swap them with your real email and social profiles when content is finalized.",
          language,
        )}
      </p>
      <div className="space-y-3">
        {socialLinks.map((link) => (
          <a key={link.id} href={link.href} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
            <span>{link.id === "email" ? localizeText({ en: "Email", es: "Correo" }, language) : link.label}</span>
            <span className="text-white/50">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

