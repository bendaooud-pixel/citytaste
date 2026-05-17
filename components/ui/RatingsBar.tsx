interface RatingsBarProps {
  ratings: {
    google: number;
    tripadvisor: number;
    michelin: 0 | 1 | 2 | 3;
  };
  /** compact: Google pill only (cards). full: all three sources (detail page). */
  variant?: "compact" | "full";
}

const MICHELIN_LABEL: Record<1 | 2 | 3, string> = {
  1: "1 Star",
  2: "2 Stars",
  3: "3 Stars",
};

export default function RatingsBar({ ratings, variant = "full" }: RatingsBarProps) {
  if (variant === "compact") {
    return (
      <span className="inline-flex items-center gap-0.5 bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
        G {ratings.google.toFixed(1)}
      </span>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-2.5 py-1 rounded-full">
        G {ratings.google.toFixed(1)}
      </span>

      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-2.5 py-1 rounded-full">
        TA {ratings.tripadvisor.toFixed(1)}
      </span>

      {ratings.michelin > 0 && (
        <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 border border-red-200 text-xs font-semibold px-2.5 py-1 rounded-full">
          ⭐ {MICHELIN_LABEL[ratings.michelin as 1 | 2 | 3]}
        </span>
      )}
    </div>
  );
}
