"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface UserReview {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  visit_date: string | null;
  created_at: string;
}

const PAGE_SIZE = 5;

interface Props {
  placeSlug: string;
}

export default function UserReviews({ placeSlug }: Props) {
  const [reviews, setReviews]       = useState<UserReview[]>([]);
  const [total, setTotal]           = useState(0);
  const [page, setPage]             = useState(1);
  const [loading, setLoading]       = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    supabase
      .from("user_reviews")
      .select("*", { count: "exact" })
      .eq("place_slug", placeSlug)
      .order("created_at", { ascending: false })
      .range(0, PAGE_SIZE - 1)
      .then(({ data, count, error }) => {
        if (!error) {
          setReviews(data ?? []);
          setTotal(count ?? 0);
        }
        setLoading(false);
      });
  }, [placeSlug]);

  async function loadMore() {
    setLoadingMore(true);
    const from = page * PAGE_SIZE;
    const { data } = await supabase
      .from("user_reviews")
      .select("*")
      .eq("place_slug", placeSlug)
      .order("created_at", { ascending: false })
      .range(from, from + PAGE_SIZE - 1);
    if (data) {
      setReviews((prev) => [...prev, ...data]);
      setPage((p) => p + 1);
    }
    setLoadingMore(false);
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="h-5 bg-slate-100 rounded w-48 mb-5 animate-pulse" />
        {[1, 2].map((i) => (
          <div key={i} className="flex gap-3 mb-5 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-slate-100 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-100 rounded w-36" />
              <div className="h-3 bg-slate-100 rounded w-full" />
              <div className="h-3 bg-slate-100 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center py-10">
        <p className="text-4xl mb-2">📝</p>
        <p className="font-semibold text-slate-700">No community reviews yet</p>
        <p className="text-slate-400 text-sm mt-1">Be the first to share your experience below!</p>
      </div>
    );
  }

  const hasMore = reviews.length < total;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <h2 className="font-semibold text-slate-800 mb-5 flex items-center gap-2">
        Community Reviews
        <span className="text-xs bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full font-bold">
          {total}
        </span>
      </h2>

      <div className="space-y-5">
        {reviews.map((review) => {
          const initials = review.author_name
            .split(" ")
            .map((w) => w[0] ?? "")
            .join("")
            .slice(0, 2)
            .toUpperCase();

          const postedDate = new Date(review.created_at).toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric",
          });

          return (
            <div
              key={review.id}
              className="flex gap-4 pb-5 border-b border-slate-50 last:border-0 last:pb-0"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {initials}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-semibold text-slate-800 text-sm">{review.author_name}</span>
                  <span className="text-amber-400 text-sm tracking-tighter">
                    {"★".repeat(review.rating)}
                    <span className="text-slate-200">{"★".repeat(5 - review.rating)}</span>
                  </span>
                  <span className="text-slate-400 text-xs ml-auto whitespace-nowrap">{postedDate}</span>
                </div>

                {review.visit_date && (
                  <p className="text-xs text-slate-400 mb-1.5">
                    Visited{" "}
                    {new Date(review.visit_date + "-01").toLocaleDateString("en-US", {
                      year: "numeric", month: "long",
                    })}
                  </p>
                )}

                <p className="text-slate-600 text-sm leading-relaxed">{review.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <button
          onClick={loadMore}
          disabled={loadingMore}
          className="mt-5 w-full py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          {loadingMore
            ? "Loading…"
            : `Load more (${total - reviews.length} remaining)`}
        </button>
      )}
    </div>
  );
}
