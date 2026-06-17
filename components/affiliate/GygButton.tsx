import { gygSearchLink, gygCityQuery } from "@/lib/affiliate/gyg";

interface GygButtonProps {
  citySlug: string;
  locale?: string;
  label?: string;
  query?: string;
  className?: string;
}

export default function GygButton({
  citySlug,
  locale = "en",
  label,
  query,
  className = "",
}: GygButtonProps) {
  const searchQuery = query ?? gygCityQuery(citySlug);
  const href = gygSearchLink(searchQuery, locale);
  const defaultLabel = locale === "fr"
    ? `Réserver des activités à ${searchQuery}`
    : `Book activities in ${searchQuery}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow"
      className={`inline-flex items-center gap-2 bg-[#FF5533] hover:bg-[#E64D2E] text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm ${className}`}
    >
      {label ?? defaultLabel}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}
