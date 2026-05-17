"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TYPES = [
  { id: "restaurant", label: "Restaurants", emoji: "🍽️" },
  { id: "cafe", label: "Cafés", emoji: "☕" },
  { id: "bar", label: "Bars", emoji: "🍸" },
  { id: "tourist_attraction", label: "Attractions", emoji: "🏛️" },
] as const;

type PlaceType = (typeof TYPES)[number]["id"];

export default function NearMe() {
  const router = useRouter();
  const [step, setStep] = useState<"idle" | "pick" | "loading" | "error">("idle");
  const [selectedType, setSelectedType] = useState<PlaceType>("restaurant");

  function requestLocation(type: PlaceType) {
    if (!("geolocation" in navigator)) {
      setStep("error");
      return;
    }
    setStep("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        router.push(`/near-me?lat=${lat}&lng=${lng}&type=${type}`);
      },
      () => setStep("error"),
      { timeout: 10000, maximumAge: 60000 }
    );
  }

  if (step === "idle") {
    return (
      <div className="flex flex-col items-center gap-2 mt-4">
        <button
          onClick={() => setStep("pick")}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-semibold py-2.5 px-6 rounded-xl border border-white/30 hover:border-white/60 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all active:scale-[0.98]"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.027A8.25 8.25 0 006 8.25c0 3.33 1.556 6.024 3.5 8.028a19.583 19.583 0 002.684 2.28 16.975 16.975 0 001.143.743zM12 10.5a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
          </svg>
          Find places near me
        </button>
      </div>
    );
  }

  if (step === "pick") {
    return (
      <div className="flex flex-col items-center gap-3 mt-4">
        <p className="text-white/70 text-xs font-medium uppercase tracking-widest">What are you looking for?</p>
        <div className="flex flex-wrap justify-center gap-2">
          {TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => { setSelectedType(t.id); requestLocation(t.id); }}
              className={`flex items-center gap-1.5 text-sm font-semibold py-2 px-4 rounded-xl border transition-all active:scale-[0.97] ${
                selectedType === t.id
                  ? "bg-white text-slate-900 border-white"
                  : "bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/60"
              }`}
            >
              <span>{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setStep("idle")}
          className="text-white/40 hover:text-white/70 text-xs transition-colors"
        >
          ✕ Cancel
        </button>
      </div>
    );
  }

  if (step === "loading") {
    return (
      <div className="flex flex-col items-center gap-2 mt-4">
        <div className="flex items-center gap-2 text-white/80 text-sm font-medium py-2.5 px-6">
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Getting your location…
        </div>
      </div>
    );
  }

  // error
  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      <p className="text-red-300 text-xs text-center max-w-xs leading-snug">
        Could not access your location. Please enable GPS and try again.
      </p>
      <button
        onClick={() => setStep("idle")}
        className="text-white/60 hover:text-white text-xs underline transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
