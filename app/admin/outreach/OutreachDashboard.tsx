"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { OutreachPageData, EnrichedTarget } from "@/lib/outreach";
import { updateStatusAction, generateDraftAction } from "./actions";

const STATUS_STYLES: Record<string, string> = {
  "": "bg-slate-100 text-slate-500",
  "draft ready": "bg-blue-100 text-blue-700",
  sent: "bg-amber-100 text-amber-700",
  published: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-600",
};

function statusStyle(s: string) {
  return STATUS_STYLES[s.toLowerCase()] ?? STATUS_STYLES[""];
}

function submissionUrl(target: EnrichedTarget): string {
  const sp = target.submission_page.trim();
  if (!sp) return `https://${target.site}`;
  if (sp.startsWith("http")) return sp;
  if (sp.startsWith("/")) return `https://${target.site}${sp.split(" ")[0]}`;
  const email = sp.match(/([\w.-]+@[\w.-]+\.\w+)/);
  if (email) return `mailto:${email[1]}`;
  return `https://${target.site}`;
}

function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-semibold text-slate-800 mt-4 mb-1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold text-slate-900 mt-5 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold text-slate-900 mb-3">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" class="text-orange-600 underline" target="_blank" rel="noopener noreferrer">$1</a>',
    )
    .split("\n\n")
    .map((block) => {
      const t = block.trim();
      if (!t) return "";
      if (t.startsWith("<h")) return t;
      return `<p class="mb-3 text-sm text-slate-700 leading-relaxed">${t.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// ─── Dashboard ─────────────────────────────────────────────────────────────

export function OutreachDashboard({
  initialData,
}: {
  initialData: OutreachPageData;
}) {
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);
  const [generating, setGenerating] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [expandedDrafts, setExpandedDrafts] = useState<Set<string>>(
    () => new Set(initialData.todaysSites),
  );
  const [expandedPitches, setExpandedPitches] = useState<Set<string>>(
    () => new Set(initialData.todaysSites),
  );

  const { targets, todaysSites, progress } = initialData;
  const todaysTargets = targets.filter((t) => todaysSites.includes(t.site));
  const pct =
    progress.total > 0
      ? Math.round(
          ((progress.sent + progress.published) / progress.total) * 100,
        )
      : 0;
  const allDone = progress.remaining === 0;

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleStatus = async (site: string, status: string) => {
    setUpdating(`${site}:${status}`);
    try {
      await updateStatusAction(site, status);
      flash(`${site} → ${status}`);
      router.refresh();
    } catch (e: unknown) {
      console.error("Status update failed:", e);
      flash(`Error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setUpdating(null);
    }
  };

  const handleGenerate = async (site: string) => {
    setGenerating(site);
    try {
      await generateDraftAction(site);
      flash(`Draft generated for ${site}`);
      router.refresh();
    } catch (e: unknown) {
      console.error("Generate failed:", e);
      flash(`Error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setGenerating(null);
    }
  };

  const handleCopy = async (text: string, label: string) => {
    const ok = await copyText(text);
    flash(ok ? `${label} copied` : "Copy failed");
  };

  const toggle = (
    set: React.Dispatch<React.SetStateAction<Set<string>>>,
    site: string,
  ) =>
    set((prev) => {
      const next = new Set(prev);
      next.has(site) ? next.delete(site) : next.add(site);
      return next;
    });

  const busy = !!updating;

  return (
    <main className="flex-1 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/admin"
            className="text-slate-400 hover:text-slate-600 text-sm"
          >
            &larr; Admin
          </a>
          <h1
            className="text-3xl font-bold text-slate-900 mt-1"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Guest Post Outreach
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Sent: {progress.sent}/{progress.total} &middot; Published:{" "}
            {progress.published} &middot; Remaining: {progress.remaining}
          </p>
        </div>

        {/* No data — running on Vercel or CSV missing */}
        {progress.total === 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 text-center">
            <p className="text-amber-800 font-medium">
              No outreach data found.
            </p>
            <p className="text-amber-600 text-sm mt-1">
              This dashboard reads local files and only works with{" "}
              <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">npm run dev</code> on your machine.
            </p>
          </div>
        )}

        {/* Progress bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-8">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-y-2">
            <div className="flex gap-4 text-sm flex-wrap">
              <Dot color="bg-amber-400" label={`Sent: ${progress.sent}`} />
              <Dot
                color="bg-emerald-500"
                label={`Published: ${progress.published}`}
              />
              <Dot
                color="bg-blue-400"
                label={`Draft ready: ${progress.draftReady}`}
              />
              {progress.rejected > 0 && (
                <Dot
                  color="bg-red-400"
                  label={`Rejected: ${progress.rejected}`}
                />
              )}
            </div>
            <span className="text-sm font-semibold text-slate-700">
              {pct}%
            </span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Completion */}
        {allDone && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 mb-8 text-center">
            <span className="text-5xl mb-4 block">
              {String.fromCodePoint(0x1f389)}
            </span>
            <h2 className="text-2xl font-bold text-emerald-800 mb-2">
              List Complete!
            </h2>
            <p className="text-emerald-700">
              All {progress.total} sites have been contacted.
            </p>
          </div>
        )}

        {/* Today's targets */}
        {!allDone && todaysTargets.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              Today&apos;s Targets
              <span className="text-sm font-normal text-slate-400">
                ({todaysTargets.length} sites)
              </span>
            </h2>
            <div className="space-y-6">
              {todaysTargets.map((t) => (
                <TargetCard
                  key={t.site}
                  target={t}
                  draftOpen={expandedDrafts.has(t.site)}
                  pitchOpen={expandedPitches.has(t.site)}
                  onToggleDraft={() => toggle(setExpandedDrafts, t.site)}
                  onTogglePitch={() => toggle(setExpandedPitches, t.site)}
                  onStatus={handleStatus}
                  onGenerate={handleGenerate}
                  onCopy={handleCopy}
                  isGenerating={generating === t.site}
                  isBusy={busy}
                />
              ))}
            </div>
          </section>
        )}

        {/* Full pipeline */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            All Targets
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {["Site", "DA", "Niche", "Priority", "Status", "Draft", "Contacted", ""].map(
                      (h) => (
                        <th
                          key={h}
                          className={`px-4 py-3 font-semibold text-slate-600 ${h === "" ? "text-right" : "text-left"}`}
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {targets.map((t) => (
                    <tr
                      key={t.site}
                      className={`hover:bg-slate-50/50 transition-colors ${todaysSites.includes(t.site) ? "bg-orange-50/40" : ""}`}
                    >
                      <td className="px-4 py-3 font-medium text-slate-800">
                        <a
                          href={submissionUrl(t)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-600 hover:underline"
                        >
                          {t.site}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {t.da || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs max-w-[140px] truncate">
                        {t.niche}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                          {t.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle(t.status)}`}
                        >
                          {t.status || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {t.draft ? (
                          <span className="text-xs text-emerald-600">
                            &#10003; {t.draft.wordCount}w
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">
                            —
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">
                        {t.date_contacted || "—"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {!t.draft && (
                            <button
                              type="button"
                              onClick={() => handleGenerate(t.site)}
                              disabled={generating === t.site}
                              className="text-xs bg-orange-50 hover:bg-orange-100 text-orange-600 px-2 py-1 rounded-lg font-medium disabled:opacity-50 transition-colors"
                            >
                              {generating === t.site ? "..." : "Generate"}
                            </button>
                          )}
                          {!["sent", "published"].includes(
                            t.status.toLowerCase(),
                          ) &&
                            t.draft && (
                              <button
                                type="button"
                                onClick={() => handleStatus(t.site, "sent")}
                                disabled={busy}
                                className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-700 px-2 py-1 rounded-lg font-medium disabled:opacity-50 transition-colors"
                              >
                                Mark sent
                              </button>
                            )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-slate-900 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-xl">
          {toast}
        </div>
      )}
    </main>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────

function Dot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}

function TargetCard({
  target,
  draftOpen,
  pitchOpen,
  onToggleDraft,
  onTogglePitch,
  onStatus,
  onGenerate,
  onCopy,
  isGenerating,
  isBusy,
}: {
  target: EnrichedTarget;
  draftOpen: boolean;
  pitchOpen: boolean;
  onToggleDraft: () => void;
  onTogglePitch: () => void;
  onStatus: (site: string, status: string) => void;
  onGenerate: (site: string) => void;
  onCopy: (text: string, label: string) => void;
  isGenerating: boolean;
  isBusy: boolean;
}) {
  const ctLink = target.draft?.citytasteLink || target.guide.url;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{target.site}</h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {target.da && (
                <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full border border-purple-100 font-medium">
                  DA {target.da}
                </span>
              )}
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                {target.niche}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle(target.status)}`}
              >
                {target.status || "Not started"}
              </span>
            </div>
          </div>
          <a
            href={submissionUrl(target)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium transition-colors whitespace-nowrap"
          >
            Submit here &rarr;
          </a>
        </div>

        {/* Link to insert */}
        <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
          <div className="flex-1 min-w-0">
            <div className="text-xs text-slate-500 mb-0.5">Link to insert</div>
            <a
              href={ctLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-orange-600 hover:underline truncate block"
            >
              {ctLink}
            </a>
          </div>
          <button
            type="button"
            onClick={() => onCopy(ctLink, "Link")}
            className="text-xs bg-white hover:bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200 font-medium flex-shrink-0 transition-colors"
          >
            Copy
          </button>
          {target.link_allowed && (
            <span className="text-xs text-slate-400 flex-shrink-0">
              {target.link_allowed}
            </span>
          )}
        </div>
      </div>

      {/* Draft */}
      <div className="border-b border-slate-100">
        {target.draft ? (
          <>
            <div className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors">
              <button
                type="button"
                onClick={onToggleDraft}
                className="text-sm font-semibold text-slate-700 flex items-center gap-2 text-left flex-1 min-w-0"
              >
                <span
                  className={`transition-transform inline-block ${draftOpen ? "rotate-90" : ""}`}
                >
                  &#9654;
                </span>
                <span className="truncate">
                  Draft &mdash; &ldquo;{target.draft.title}&rdquo;
                </span>
                <span className="font-normal text-slate-400 flex-shrink-0">
                  ({target.draft.wordCount} words)
                </span>
              </button>
              <button
                type="button"
                onClick={() => onCopy(target.draft!.content, "Draft")}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-lg font-medium transition-colors ml-3 flex-shrink-0"
              >
                Copy draft
              </button>
            </div>
            {draftOpen && (
              <div className="px-5 pb-4">
                <div
                  className="max-w-none text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-4 max-h-96 overflow-y-auto"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(target.draft.content),
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <div className="px-5 py-4 flex items-center justify-between">
            <span className="text-sm text-slate-400">No draft yet</span>
            <button
              type="button"
              onClick={() => onGenerate(target.site)}
              disabled={isGenerating}
              className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              {isGenerating ? "Generating…" : "Generate draft"}
            </button>
          </div>
        )}
      </div>

      {/* Pitch */}
      <div className="border-b border-slate-100">
        {target.pitch ? (
          <>
            <div className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors">
              <button
                type="button"
                onClick={onTogglePitch}
                className="text-sm font-semibold text-slate-700 flex items-center gap-2 text-left"
              >
                <span
                  className={`transition-transform inline-block ${pitchOpen ? "rotate-90" : ""}`}
                >
                  &#9654;
                </span>
                Pitch email
              </button>
              <button
                type="button"
                onClick={() => onCopy(target.pitch!.content, "Pitch")}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-lg font-medium transition-colors ml-3"
              >
                Copy pitch
              </button>
            </div>
            {pitchOpen && (
              <div className="px-5 pb-4">
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {target.pitch.content}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="px-5 py-3 text-sm text-slate-400">
            Pitch will be generated with the draft
          </div>
        )}
      </div>

      {/* Status controls */}
      <div className="px-5 py-4 flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-400 mr-1">Set status:</span>
        {["draft ready", "sent", "published", "rejected"].map((s) => {
          const active = target.status.toLowerCase() === s;
          return (
            <button
              type="button"
              key={s}
              onClick={() => onStatus(target.site, s)}
              disabled={isBusy || active}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium capitalize transition-colors ${
                active
                  ? `${statusStyle(s)} border-transparent cursor-default`
                  : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
              } disabled:opacity-60`}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}
