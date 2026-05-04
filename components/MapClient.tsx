"use client";
import dynamic from "next/dynamic";
import type { Place } from "@/lib/types";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 text-sm">
      Loading map…
    </div>
  ),
});

interface MapClientProps {
  places: Place[];
  center: { lat: number; lng: number };
  zoom?: number;
  singlePlace?: boolean;
  activeId?: string;
  className?: string;
}

export default function MapClient(props: MapClientProps) {
  return <Map {...props} />;
}
