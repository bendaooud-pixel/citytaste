import { createContext, useContext } from "react";

export type Locale = "en" | "fr" | "es" | "ar";

export const LOCALES: { id: Locale; flag: string; label: string; dir: "ltr" | "rtl" }[] = [
  { id: "en", flag: "🇬🇧", label: "EN", dir: "ltr" },
  { id: "fr", flag: "🇫🇷", label: "FR", dir: "ltr" },
  { id: "es", flag: "🇪🇸", label: "ES", dir: "ltr" },
  { id: "ar", flag: "🇲🇦", label: "AR", dir: "rtl" },
];

export interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Resolve a dot-separated key against the active message file, e.g. t("nav.home") */
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  setLocale: () => {},
  t: (k) => k,
});

export function useLocale() {
  return useContext(I18nContext);
}
