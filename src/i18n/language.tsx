"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import type {
  Language,
  MaybeLocalizedText,
  MaybeLocalizedTextArray,
} from "./types";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () =>
        setLanguage((current) => (current === "en" ? "es" : "en")),
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}

export function getLocalizedText(
  value: MaybeLocalizedText | undefined,
  language: Language,
  fallback = "",
) {
  if (!value) {
    return fallback;
  }

  if (typeof value === "string") {
    return value;
  }

  return value[language] || value.en || fallback;
}

export function localizeTextArray(
  value: MaybeLocalizedTextArray | undefined,
  language: Language,
) {
  if (!value) {
    return [];
  }

  if (typeof value === "string") {
    return value ? [value] : [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  const localizedValue = value[language] || value.en || [];
  return Array.isArray(localizedValue) ? localizedValue : localizedValue ? [localizedValue] : [];
}

export const localizeText = getLocalizedText;

