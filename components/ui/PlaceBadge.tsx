import type { Badge } from "@/lib/badges";

interface PlaceBadgeProps {
  badge: Badge;
  /** sm for cards, md for detail page */
  size?: "sm" | "md";
}

export default function PlaceBadge({ badge, size = "md" }: PlaceBadgeProps) {
  const base = `inline-flex items-center gap-1 font-semibold rounded-full border ${badge.colorClass}`;
  const sizeClass = size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2.5 py-1";

  return (
    <span className={`${base} ${sizeClass}`}>
      <span aria-hidden="true">{badge.icon}</span>
      <span>{badge.label}</span>
    </span>
  );
}
