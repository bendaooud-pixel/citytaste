interface ReviewSummaryProps {
  summary: string;
  placeName: string;
}

export default function ReviewSummary({ summary, placeName }: ReviewSummaryProps) {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 bg-brand-orange rounded-xl flex items-center justify-center text-white text-lg shadow-sm">
          ✦
        </div>
        <div>
          <p className="font-semibold text-slate-800 text-sm">AI Review Summary</p>
          <p className="text-xs text-slate-500">Generated from guest reviews of {placeName}</p>
        </div>
        <span className="ml-auto text-xs bg-orange-100 text-orange-700 font-medium px-2.5 py-1 rounded-full">
          Powered by AI
        </span>
      </div>
      <p className="text-slate-700 text-sm leading-relaxed">{summary}</p>
    </div>
  );
}
