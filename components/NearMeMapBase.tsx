"use client";
import { useEffect, useRef } from "react";
import type { Place } from "@/lib/types";

interface Props {
  places: Place[];
  userLat: number;
  userLng: number;
  zoom?: number;
}

export default function NearMeMapBase({ places, userLat, userLng, zoom = 15 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const init = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      const map = L.map(containerRef.current!, {
        center: [userLat, userLng],
        zoom,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;

      // 2 km radius circle
      L.circle([userLat, userLng], {
        radius: 2000,
        color: "#3B82F6",
        fillColor: "#3B82F6",
        fillOpacity: 0.05,
        weight: 1.5,
        dashArray: "5 5",
      }).addTo(map);

      // User location marker
      const userIcon = L.divIcon({
        html: `<div style="width:16px;height:16px;background:#3B82F6;border:3px solid white;border-radius:50%;box-shadow:0 0 0 6px rgba(59,130,246,0.25)"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        className: "",
      });
      L.marker([userLat, userLng], { icon: userIcon }).addTo(map).bindPopup("📍 You are here");

      // Place markers
      places.forEach((place) => {
        const icon = L.divIcon({
          html: `<div class="ct-marker">★</div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          popupAnchor: [0, -20],
          className: "",
        });
        L.marker([place.lat, place.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="padding:12px;min-width:180px;font-family:system-ui,sans-serif">
              <p style="font-weight:700;color:#1e293b;font-size:14px;margin:0 0 4px">${place.name}</p>
              <p style="font-size:12px;color:#f97316;margin:0 0 6px;font-weight:600">★ ${place.rating}</p>
              <p style="font-size:11px;color:#64748b;margin:0 0 8px">${place.neighborhood}</p>
              <a href="/${place.citySlug}/${place.slug}" style="display:inline-block;background:#f97316;color:white;font-size:11px;font-weight:600;padding:4px 10px;border-radius:6px;text-decoration:none">
                View details →
              </a>
            </div>`,
            { maxWidth: 240 }
          );
      });
    };

    init();

    return () => {
      if (mapRef.current) {
        (mapRef.current as { remove(): void }).remove();
        mapRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-2xl overflow-hidden"
      style={{ minHeight: 400 }}
    />
  );
}
