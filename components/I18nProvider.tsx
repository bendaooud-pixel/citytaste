"use client";
import { useState, useEffect, useCallback, type ReactNode } from "react";
import { I18nContext, LOCALES, type Locale } from "@/lib/i18n";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import es from "@/messages/es.json";
import ar from "@/messages/ar.json";

type MessageTree = Record<string, unknown>;
const MESSAGES: Record<Locale, MessageTree> = { en, fr, es, ar };

function resolve(messages: MessageTree, key: string): string {
  const parts = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cur: any = messages;
  for (const p of parts) {
    if (cur == null || typeof cur !== "object") return key;
    cur = cur[p];
  }
  return typeof cur === "string" ? cur : key;
}

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Restore from localStorage after hydration
  useEffect(() => {
    const saved = localStorage.getItem("citytaste-locale") as Locale | null;
    if (saved && MESSAGES[saved]) setLocaleState(saved);
  }, []);

  // Apply html lang + dir on locale change; set cookie for server components
  useEffect(() => {
    const cfg = LOCALES.find((l) => l.id === locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = cfg?.dir ?? "ltr";
    localStorage.setItem("citytaste-locale", locale);
    document.cookie = `citytaste-locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
  }, [locale]);

  const t = useCallback(
    (key: string) => resolve(MESSAGES[locale], key),
    [locale]
  );

  function setLocale(l: Locale) {
    setLocaleState(l);
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
