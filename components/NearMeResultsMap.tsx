"use client";
import dynamic from "next/dynamic";
import type { GMapPlace } from "@/components/NearMeResultsMapBase";

const Base = dynamic(() => import("@/components/NearMeResultsMapBase"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 text-sm">
      Loading map…
    </div>
  ),
});

interface Props {
  places: GMapPlace[];
  userLat: number;
  userLng: number;
  zoom?: number;
}

export default function NearMeResultsMap(props: Props) {
  return <Base {...props} />;
}
