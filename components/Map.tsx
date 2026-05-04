"use client";
import { useEffect, useRef } from "react";
import type { Place } from "@/lib/types";
import { useRouter } from "next/navigation";

interface MapProps {
  places: Place[];
  center: { lat: number; lng: number };
  zoom?: number;
  singlePlace?: boolean;
  activeId?: string;
}

export default function Map({ places, center, zoom = 13, singlePlace = false, activeId }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const markersRef = useRef<unknown[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let L: typeof import("leaflet");

    const init = async () => {
      L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      const map = L.map(mapRef.current!, {
        center: [center.lat, center.lng],
        zoom,
        zoomControl: true,
        scrollWheelZoom: !singlePlace,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;

      places.forEach((place) => {
        const isActive = place.id === activeId;
        const icon = L.divIcon({
          html: `<div class="ct-marker${isActive ? " ct-marker-active" : ""}">★</div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          popupAnchor: [0, -20],
          className: "",
        });

        const marker = L.marker([place.lat, place.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="padding:12px;min-width:180px;font-family:system-ui,sans-serif">
              <p style="font-weight:700;color:#1e293b;font-size:14px;margin:0 0 4px">${place.name}</p>
              <p style="font-size:12px;color:#f97316;margin:0 0 6px;font-weight:600">★ ${place.rating} · ${"$".repeat(place.priceLevel)}</p>
              <p style="font-size:11px;color:#64748b;margin:0 0 8px">${place.neighborhood}</p>
              <a href="/cities/${place.citySlug}/places/${place.slug}"
                 style="display:inline-block;background:#f97316;color:white;font-size:11px;font-weight:600;
                        padding:4px 10px;border-radius:6px;text-decoration:none">
                View details →
              </a>
            </div>`,
            { maxWidth: 240 }
          );

        marker.on("click", () => {
          if (!singlePlace) return;
        });

        markersRef.current.push(marker);
      });
    };

    init();

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
        markersRef.current = [];
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-2xl overflow-hidden"
      style={{ minHeight: 320 }}
    />
  );
}
