"use client";
import { useEffect, useRef } from "react";

export interface GMapPlace {
  placeId: string;
  name: string;
  lat: number;
  lng: number;
  rating: number | null;
  vicinity: string;
}

interface Props {
  places: GMapPlace[];
  userLat: number;
  userLng: number;
  zoom?: number;
}

export default function NearMeResultsMapBase({ places, userLat, userLng, zoom = 15 }: Props) {
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

      // Dashed 1.5 km radius circle
      L.circle([userLat, userLng], {
        radius: 1500,
        color: "#3B82F6",
        fillColor: "#3B82F6",
        fillOpacity: 0.04,
        weight: 1.5,
        dashArray: "5 5",
      }).addTo(map);

      // User location
      const userIcon = L.divIcon({
        html: `<div style="width:14px;height:14px;background:#3B82F6;border:3px solid white;border-radius:50%;box-shadow:0 0 0 6px rgba(59,130,246,0.2)"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
        className: "",
      });
      L.marker([userLat, userLng], { icon: userIcon })
        .addTo(map)
        .bindPopup("<b>You are here</b>");

      // Place markers
      places.forEach((p) => {
        const icon = L.divIcon({
          html: `<div class="ct-marker">★</div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          popupAnchor: [0, -20],
          className: "",
        });
        const mapsUrl = `https://www.google.com/maps/place/?q=place_id:${p.placeId}`;
        L.marker([p.lat, p.lng], { icon })
          .addTo(map)
          .bindPopup(
            `<div style="padding:10px;min-width:170px;font-family:system-ui,sans-serif">
              <p style="font-weight:700;color:#1e293b;font-size:13px;margin:0 0 3px">${p.name}</p>
              ${p.rating ? `<p style="font-size:12px;color:#f97316;font-weight:600;margin:0 0 4px">★ ${p.rating}</p>` : ""}
              <p style="font-size:11px;color:#64748b;margin:0 0 8px">${p.vicinity}</p>
              <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer"
                style="display:inline-block;background:#f97316;color:white;font-size:11px;font-weight:600;padding:4px 10px;border-radius:6px;text-decoration:none">
                Open in Maps →
              </a>
            </div>`,
            { maxWidth: 220 }
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
