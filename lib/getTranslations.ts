import { cookies } from "next/headers";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import es from "@/messages/es.json";
import ar from "@/messages/ar.json";

type Locale = "en" | "fr" | "es" | "ar";
type Messages = Record<string, unknown>;

const MESSAGES: Record<Locale, Messages> = { en, fr, es, ar };

function resolve(messages: Messages, key: string): string {
  const parts = key.split(".");
  let cur: unknown = messages;
  for (const p of parts) {
    if (cur == null || typeof cur !== "object") return key;
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === "string" ? cur : key;
}

export async function getTranslations() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("citytaste-locale")?.value ?? "en";
  const locale: Locale = (["en", "fr", "es", "ar"].includes(raw) ? raw : "en") as Locale;
  const messages = MESSAGES[locale];
  return {
    locale,
    t: (key: string) => resolve(messages, key),
  };
}
