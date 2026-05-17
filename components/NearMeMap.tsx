"use client";
import dynamic from "next/dynamic";
import type { Place } from "@/lib/types";

const NearMeMapBase = dynamic(() => import("@/components/NearMeMapBase"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 text-sm">
      Loading map…
    </div>
  ),
});

interface Props {
  places: Place[];
  userLat: number;
  userLng: number;
  zoom?: number;
}

export default function NearMeMap(props: Props) {
  return <NearMeMapBase {...props} />;
}
