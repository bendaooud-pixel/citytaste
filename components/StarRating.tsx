interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
}

export default function StarRating({ rating, max = 5, size = "md" }: StarRatingProps) {
  const sizeClass = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }[size];

  return (
    <span className={`inline-flex items-center gap-0.5 ${sizeClass}`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <span
            key={i}
            className={
              filled
                ? "text-amber-400"
                : half
                ? "text-amber-300"
                : "text-slate-200"
            }
          >
            ★
          </span>
        );
      })}
    </span>
  );
}
