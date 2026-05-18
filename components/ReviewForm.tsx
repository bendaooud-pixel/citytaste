"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLocale } from "@/lib/i18n";

interface Props {
  placeSlug: string;
}

export default function ReviewForm({ placeSlug }: Props) {
  const { t } = useLocale();
  const [name, setName]           = useState("");
  const [rating, setRating]       = useState(0);
  const [hoverRating, setHover]   = useState(0);
  const [text, setText]           = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [loading, setLoading]     = useState(false);
  const [success, setSuccess]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  function validate(): string | null {
    if (!name.trim())           return t("review.nameRequired");
    if (rating === 0)           return t("review.ratingRequired");
    if (text.trim().length < 20) return t("review.textTooShort");
    return null;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true);
    setError(null);

    const { error: dbErr } = await supabase.from("user_reviews").insert({
      place_slug:  placeSlug,
      author_name: name.trim(),
      rating,
      text:        text.trim(),
      visit_date:  visitDate || null,
    });

    setLoading(false);

    if (dbErr) {
      setError(dbErr.message);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <p className="text-4xl mb-3">🎉</p>
        <p className="font-bold text-green-800 text-lg mb-1">{t("review.successTitle")}</p>
        <p className="text-green-600 text-sm">{t("review.successBody")}</p>
        <button
          onClick={() => { setSuccess(false); setName(""); setRating(0); setText(""); setVisitDate(""); }}
          className="mt-5 text-xs font-semibold text-green-700 underline underline-offset-2"
        >
          {t("buttons.writeAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-5">
      <h2 className="font-semibold text-slate-800 text-lg">{t("place.shareExperience")}</h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {t("review.yourName")} <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("review.namePlaceholder")}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
        />
      </div>

      {/* Star rating */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {t("review.rating")} <span className="text-red-400">*</span>
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="text-3xl transition-transform hover:scale-110 active:scale-95 leading-none"
            >
              <span className={(hoverRating || rating) >= star ? "text-amber-400" : "text-slate-200"}>
                ★
              </span>
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-3 text-sm text-slate-500">
              {["", t("review.ratingPoor"), t("review.ratingFair"), t("review.ratingGood"), t("review.ratingVeryGood"), t("review.ratingExcellent")][rating]}
            </span>
          )}
        </div>
      </div>

      {/* Review text */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {t("review.yourReview")} <span className="text-red-400">*</span>
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder={t("review.reviewPlaceholder")}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-slate-400">{t("review.minChars")}</span>
          <span className={`text-xs font-medium ${text.trim().length >= 20 ? "text-green-500" : "text-slate-400"}`}>
            {text.trim().length} {t("labels.chars")}
          </span>
        </div>
      </div>

      {/* Visit date */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {t("review.visited")}{" "}
          <span className="text-slate-400 font-normal text-xs">{t("review.optional")}</span>
        </label>
        <input
          type="month"
          value={visitDate}
          onChange={(e) => setVisitDate(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-colors"
      >
        {loading ? t("review.submitting") : t("review.submit")}
      </button>
    </form>
  );
}
