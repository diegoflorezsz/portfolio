export type Language = "en" | "es";

export type LocalizedText = {
  en: string;
  es: string;
};

export type LocalizedTextArray = {
  en: string[];
  es: string[];
};

export type MaybeLocalizedText = string | LocalizedText;
export type MaybeLocalizedTextArray = string | string[] | LocalizedText | LocalizedTextArray;

