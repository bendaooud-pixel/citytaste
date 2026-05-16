import Link from "next/link";
import Image from "next/image";
import type { City } from "@/lib/types";

interface CityCardProps {
  city: City;
}

export default function CityCard({ city }: CityCardProps) {
  return (
    <Link href={`/${city.slug}`} className="group block">
      <article className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={city.image}
            alt={`${city.name}, ${city.country}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Flag + Place count */}
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow">
              {city.placeCount} spots
            </span>
          </div>

          {/* City info */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium mb-1">
                  {city.flag} {city.country}
                </p>
                <h2
                  className="text-white text-2xl font-bold"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {city.name}
                </h2>
              </div>
              <div className="flex items-center justify-center w-9 h-9 bg-brand-orange rounded-full text-white shadow-lg group-hover:scale-110 transition-transform">
                →
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-4">
          <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
            {city.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {city.highlights.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-orange-50 text-brand-orange-dark font-medium px-2.5 py-1 rounded-full border border-orange-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
