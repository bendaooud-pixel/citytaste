"use client";

import Script from "next/script";
import { getPartnerId, gygCityQuery } from "@/lib/affiliate/gyg";

interface GygWidgetProps {
  citySlug: string;
  locale?: string;
  numberOfItems?: number;
  query?: string;
  className?: string;
}

export default function GygWidget({
  citySlug,
  locale = "en",
  numberOfItems = 3,
  query,
  className = "",
}: GygWidgetProps) {
  const partnerId = getPartnerId();
  if (!partnerId) return null;

  const searchQuery = query ?? gygCityQuery(citySlug);
  const localeCode = locale === "fr" ? "fr-FR" : "en-US";

  return (
    <div className={className}>
      <div
        data-gyg-href="https://widget.getyourguide.com/default/activities.frame"
        data-gyg-locale-code={localeCode}
        data-gyg-widget="activities"
        data-gyg-number-of-items={numberOfItems}
        data-gyg-partner-id={partnerId}
        data-gyg-q={searchQuery}
      />
      <Script
        src="https://widget.getyourguide.com/dist/pa.umd.production.min.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
