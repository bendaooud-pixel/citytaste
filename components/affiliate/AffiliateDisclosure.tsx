import Link from "next/link";

interface AffiliateDisclosureProps {
  locale?: string;
  className?: string;
}

export default function AffiliateDisclosure({ locale = "en", className = "" }: AffiliateDisclosureProps) {
  const text = locale === "fr"
    ? "Cet article contient des liens affiliés. Si vous réservez via ces liens, nous recevons une petite commission sans frais supplémentaires pour vous."
    : "This article contains affiliate links. If you book through these links, we earn a small commission at no extra cost to you.";

  const linkText = locale === "fr" ? "En savoir plus" : "Learn more";

  return (
    <p className={`text-xs text-slate-400 italic ${className}`}>
      {text}{" "}
      <Link href="/affiliate-disclosure" className="underline hover:text-slate-600 transition-colors">
        {linkText}
      </Link>
    </p>
  );
}
