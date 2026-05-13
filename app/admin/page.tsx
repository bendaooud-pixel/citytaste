"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cities as initialCities, places as initialPlaces } from "@/lib/data";
import type { City, Place } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

type Tab = "cities" | "places";
type Modal = { type: "city" | "place"; data?: City | Place } | null;
type ImgStatus = "idle" | "loading" | "ok" | "error";

interface PhotoModal {
  place: Place;
  urls: [string, string, string];
  statuses: [ImgStatus, ImgStatus, ImgStatus];
}

const PRICE_LABEL = ["", "$", "$$", "$$$", "$$$$"];

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("cities");
  const [cities, setCities] = useState<City[]>(initialCities);
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [modal, setModal] = useState<Modal>(null);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [photoModal, setPhotoModal] = useState<PhotoModal | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [testUrl, setTestUrl] = useState("");
  const [testStatus, setTestStatus] = useState<ImgStatus>("idle");

  // ── City form state ──
  const [cityForm, setCityForm] = useState<Partial<City>>({});

  // ── Place form state ──
  const [placeForm, setPlaceForm] = useState<Partial<Place>>({});

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const openCityModal = (city?: City) => {
    setCityForm(city ?? {});
    setModal({ type: "city", data: city });
  };

  const openPlaceModal = (place?: Place) => {
    setPlaceForm(place ?? {});
    setModal({ type: "place", data: place });
  };

  const openPhotoModal = (place: Place) => {
    const photos = place.photos ?? [];
    setPhotoModal({
      place,
      urls: [photos[0] ?? "", photos[1] ?? "", photos[2] ?? ""] as [string, string, string],
      statuses: ["idle", "idle", "idle"],
    });
    setTestUrl("");
    setTestStatus("idle");
  };

  const testPhotoUrl = (index: number) => {
    if (!photoModal) return;
    const url = photoModal.urls[index];
    if (!url.trim()) return;
    setPhotoModal((pm) => pm ? {
      ...pm,
      statuses: pm.statuses.map((s, i) => i === index ? "loading" : s) as [ImgStatus, ImgStatus, ImgStatus],
    } : null);
    const img = new window.Image();
    img.onload = () => setPhotoModal((pm) => pm ? {
      ...pm,
      statuses: pm.statuses.map((s, i) => i === index ? "ok" : s) as [ImgStatus, ImgStatus, ImgStatus],
    } : null);
    img.onerror = () => setPhotoModal((pm) => pm ? {
      ...pm,
      statuses: pm.statuses.map((s, i) => i === index ? "error" : s) as [ImgStatus, ImgStatus, ImgStatus],
    } : null);
    img.src = url;
  };

  const savePhotos = () => {
    if (!photoModal) return;
    const validUrls = photoModal.urls.filter((u) => u.trim() !== "");
    if (validUrls.length === 0) return;
    setPlaces((prev) =>
      prev.map((p) => p.id === photoModal.place.id ? { ...p, photos: validUrls } : p)
    );
    setPhotoModal(null);
    showToast(`✓ Photos updated for ${photoModal.place.name}`);
  };

  // Test any URL
  useEffect(() => {
    if (!testUrl.trim()) { setTestStatus("idle"); return; }
    setTestStatus("loading");
    const img = new window.Image();
    const url = testUrl;
    img.onload = () => { if (testUrl === url) setTestStatus("ok"); };
    img.onerror = () => { if (testUrl === url) setTestStatus("error"); };
    img.src = url;
  }, [testUrl]);

  const saveCity = () => {
    if (!cityForm.name) return;
    if (modal?.data) {
      setCities((prev) => prev.map((c) => (c.id === (modal.data as City).id ? { ...c, ...cityForm } as City : c)));
    } else {
      const newCity: City = {
        id: `city-${Date.now()}`,
        name: cityForm.name ?? "",
        country: cityForm.country ?? "",
        flag: cityForm.flag ?? "🏙️",
        description: cityForm.description ?? "",
        image: cityForm.image ?? "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400",
        slug: (cityForm.name ?? "").toLowerCase().replace(/\s+/g, "-"),
        coordinates: { lat: 0, lng: 0 },
        placeCount: 0,
        highlights: [],
      };
      setCities((prev) => [...prev, newCity]);
    }
    setModal(null);
  };

  const savePlace = () => {
    if (!placeForm.name) return;
    if (modal?.data) {
      setPlaces((prev) => prev.map((p) => (p.id === (modal.data as Place).id ? { ...p, ...placeForm } as Place : p)));
    } else {
      const newPlace: Place = {
        id: `place-${Date.now()}`,
        citySlug: placeForm.citySlug ?? cities[0]?.slug ?? "",
        name: placeForm.name ?? "",
        slug: (placeForm.name ?? "").toLowerCase().replace(/\s+/g, "-"),
        categories: placeForm.categories ?? ["restaurants"],
        address: placeForm.address ?? "",
        neighborhood: placeForm.neighborhood ?? "",
        rating: placeForm.rating ?? 4.5,
        reviewCount: placeForm.reviewCount ?? 0,
        priceLevel: (placeForm.priceLevel ?? 2) as 1 | 2 | 3 | 4,
        lat: placeForm.lat ?? 0,
        lng: placeForm.lng ?? 0,
        photos: placeForm.photos ?? ["https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"],
        openingHours: placeForm.openingHours ?? {},
        isHalal: placeForm.isHalal ?? false,
        isFamilyFriendly: placeForm.isFamilyFriendly ?? false,
        hasTerrace: placeForm.hasTerrace ?? false,
        description: placeForm.description ?? "",
        reviewSummary: placeForm.reviewSummary ?? "",
        reviews: [],
        googleMapsUrl: placeForm.googleMapsUrl ?? "",
      };
      setPlaces((prev) => [...prev, newPlace]);
    }
    setModal(null);
  };

  const deleteCity = (id: string) => {
    if (confirm("Delete this city?")) setCities((prev) => prev.filter((c) => c.id !== id));
  };

  const deletePlace = (id: string) => {
    if (confirm("Delete this place?")) setPlaces((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredPlaces = places.filter((p) => {
    const matchCity = cityFilter === "all" || p.citySlug === cityFilter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCity && matchSearch;
  });

  const filteredCities = cities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-1">
                Dashboard
              </p>
              <h1
                className="text-3xl font-bold text-slate-900"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Admin Panel
              </h1>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-4 py-2.5 rounded-xl">
              <span>⚠️</span>
              <span>Connected to local data — link Supabase to persist changes</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Cities", value: cities.length, icon: "🏙️" },
              { label: "Places", value: places.length, icon: "🍽️" },
              { label: "Paris spots", value: places.filter((p) => p.citySlug === "paris").length, icon: "🇫🇷" },
              { label: "Barcelona spots", value: places.filter((p) => p.citySlug === "barcelona").length, icon: "🇪🇸" },
            ].map(({ label, value, icon }) => (
              <div key={label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="text-3xl">{icon}</div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">{value}</div>
                  <div className="text-slate-500 text-xs">{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs + search */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 flex-wrap gap-4">
              <div className="flex rounded-xl bg-slate-100 p-1 gap-1">
                {(["cities", "places"] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => { setTab(t); setSearch(""); }}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                      tab === t
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <input
                  type="text"
                  placeholder={`Search ${tab}…`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="text-sm border border-slate-200 rounded-xl px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400"
                />
                {tab === "places" && (
                  <select
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400/40 bg-white"
                  >
                    <option value="all">All cities</option>
                    {cities.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
                  </select>
                )}
                <button
                  onClick={() => tab === "cities" ? openCityModal() : openPlaceModal()}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm"
                >
                  <span>+</span> Add {tab === "cities" ? "City" : "Place"}
                </button>
              </div>
            </div>

            {/* Cities table */}
            {tab === "cities" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="text-left px-5 py-3 font-semibold text-slate-600">City</th>
                      <th className="text-left px-5 py-3 font-semibold text-slate-600">Country</th>
                      <th className="text-left px-5 py-3 font-semibold text-slate-600">Slug</th>
                      <th className="text-left px-5 py-3 font-semibold text-slate-600">Places</th>
                      <th className="text-right px-5 py-3 font-semibold text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredCities.map((city) => (
                      <tr key={city.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5 font-medium text-slate-800">
                          {city.flag} {city.name}
                        </td>
                        <td className="px-5 py-3.5 text-slate-600">{city.country}</td>
                        <td className="px-5 py-3.5">
                          <code className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs">{city.slug}</code>
                        </td>
                        <td className="px-5 py-3.5 text-slate-600">
                          {places.filter((p) => p.citySlug === city.slug).length}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openCityModal(city)}
                              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteCity(city.id)}
                              className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg transition-colors font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Places table */}
            {tab === "places" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="text-left px-5 py-3 font-semibold text-slate-600">Name</th>
                      <th className="text-left px-5 py-3 font-semibold text-slate-600">City</th>
                      <th className="text-left px-5 py-3 font-semibold text-slate-600">Categories</th>
                      <th className="text-left px-5 py-3 font-semibold text-slate-600">Rating</th>
                      <th className="text-left px-5 py-3 font-semibold text-slate-600">Price</th>
                      <th className="text-right px-5 py-3 font-semibold text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredPlaces.map((place) => (
                      <tr key={place.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            {place.photos?.[0] && (
                              <div className="relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                                <Image
                                  src={place.photos[0]}
                                  alt={place.name}
                                  fill
                                  className="object-cover"
                                  sizes="36px"
                                />
                              </div>
                            )}
                            <span className="font-medium text-slate-800">{place.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-slate-600 capitalize">{place.citySlug}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex flex-wrap gap-1">
                            {place.categories.slice(0, 2).map((cat) => (
                              <span key={cat} className="text-xs bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full border border-orange-100">
                                {cat}
                              </span>
                            ))}
                            {place.categories.length > 2 && (
                              <span className="text-xs text-slate-400">+{place.categories.length - 2}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="font-semibold text-amber-500">★ {place.rating}</span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-600">{PRICE_LABEL[place.priceLevel]}</td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openPhotoModal(place)}
                              className="text-xs bg-violet-50 hover:bg-violet-100 text-violet-600 px-3 py-1.5 rounded-lg transition-colors font-medium"
                            >
                              🖼 Photos
                            </button>
                            <button
                              onClick={() => openPlaceModal(place)}
                              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deletePlace(place.id)}
                              className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg transition-colors font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Edit/Add Modal ── */}
      {modal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">
                {modal.data ? "Edit" : "Add"} {modal.type === "city" ? "City" : "Place"}
              </h2>
              <button
                onClick={() => setModal(null)}
                className="text-slate-400 hover:text-slate-600 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              {modal.type === "city" ? (
                <>
                  <Field label="City Name *" value={cityForm.name ?? ""} onChange={(v) => setCityForm((f) => ({ ...f, name: v }))} />
                  <Field label="Country" value={cityForm.country ?? ""} onChange={(v) => setCityForm((f) => ({ ...f, country: v }))} />
                  <Field label="Flag emoji" value={cityForm.flag ?? ""} onChange={(v) => setCityForm((f) => ({ ...f, flag: v }))} placeholder="🏙️" />
                  <Field label="Cover image URL" value={cityForm.image ?? ""} onChange={(v) => setCityForm((f) => ({ ...f, image: v }))} />
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={cityForm.description ?? ""}
                      onChange={(e) => setCityForm((f) => ({ ...f, description: e.target.value }))}
                      className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400/40 resize-none"
                    />
                  </div>
                </>
              ) : (
                <>
                  <Field label="Place Name *" value={placeForm.name ?? ""} onChange={(v) => setPlaceForm((f) => ({ ...f, name: v }))} />
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">City</label>
                    <select
                      value={placeForm.citySlug ?? ""}
                      onChange={(e) => setPlaceForm((f) => ({ ...f, citySlug: e.target.value }))}
                      className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400/40 bg-white"
                    >
                      {cities.map((c) => <option key={c.id} value={c.slug}>{c.flag} {c.name}</option>)}
                    </select>
                  </div>
                  <Field label="Address" value={placeForm.address ?? ""} onChange={(v) => setPlaceForm((f) => ({ ...f, address: v }))} />
                  <Field label="Neighbourhood" value={placeForm.neighborhood ?? ""} onChange={(v) => setPlaceForm((f) => ({ ...f, neighborhood: v }))} />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Rating (0–5)</label>
                      <input
                        type="number" min={0} max={5} step={0.1}
                        value={placeForm.rating ?? ""}
                        onChange={(e) => setPlaceForm((f) => ({ ...f, rating: parseFloat(e.target.value) }))}
                        className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400/40"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Price Level</label>
                      <select
                        value={placeForm.priceLevel ?? 2}
                        onChange={(e) => setPlaceForm((f) => ({ ...f, priceLevel: parseInt(e.target.value) as 1|2|3|4 }))}
                        className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400/40 bg-white"
                      >
                        <option value={1}>$ Budget</option>
                        <option value={2}>$$ Moderate</option>
                        <option value={3}> $$$ Upscale</option>
                        <option value={4}>$$$$ Fine Dining</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-2">Categories</label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => {
                        const active = placeForm.categories?.includes(cat.id);
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() =>
                              setPlaceForm((f) => ({
                                ...f,
                                categories: active
                                  ? (f.categories ?? []).filter((c) => c !== cat.id)
                                  : [...(f.categories ?? []), cat.id],
                              }))
                            }
                            className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                              active
                                ? "bg-orange-500 text-white border-orange-500"
                                : "border-slate-200 text-slate-600 hover:border-orange-300"
                            }`}
                          >
                            {cat.emoji} {cat.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    {[
                      { key: "isHalal", label: "Halal" },
                      { key: "isFamilyFriendly", label: "Family" },
                      { key: "hasTerrace", label: "Terrace" },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!placeForm[key as keyof Place]}
                          onChange={(e) => setPlaceForm((f) => ({ ...f, [key]: e.target.checked }))}
                          className="accent-orange-500"
                        />
                        <span className="text-sm text-slate-700">{label}</span>
                      </label>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={placeForm.description ?? ""}
                      onChange={(e) => setPlaceForm((f) => ({ ...f, description: e.target.value }))}
                      className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400/40 resize-none"
                    />
                  </div>
                  <Field label="Google Maps URL" value={placeForm.googleMapsUrl ?? ""} onChange={(v) => setPlaceForm((f) => ({ ...f, googleMapsUrl: v }))} />
                  <Field label="Phone" value={placeForm.phone ?? ""} onChange={(v) => setPlaceForm((f) => ({ ...f, phone: v }))} />
                  <Field label="Menu URL" value={placeForm.menuUrl ?? ""} onChange={(v) => setPlaceForm((f) => ({ ...f, menuUrl: v }))} />
                </>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100">
              <button
                onClick={() => setModal(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={modal.type === "city" ? saveCity : savePlace}
                className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors shadow-sm"
              >
                {modal.data ? "Save Changes" : `Add ${modal.type === "city" ? "City" : "Place"}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Photo Management Modal ── */}
      {photoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setPhotoModal(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Edit Photos</h2>
                <p className="text-sm text-slate-500 mt-0.5">{photoModal.place.name}</p>
              </div>
              <button
                onClick={() => setPhotoModal(null)}
                className="text-slate-400 hover:text-slate-600 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Photo rows */}
              {([0, 1, 2] as const).map((i) => (
                <div key={i} className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Photo {i + 1}
                  </label>
                  <div className="flex gap-3 items-start">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                      {photoModal.urls[i] && photoModal.statuses[i] !== "error" ? (
                        <Image
                          src={photoModal.urls[i]}
                          alt={`Photo ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 text-2xl">
                          {photoModal.statuses[i] === "error" ? "🚫" : "🖼"}
                        </div>
                      )}
                    </div>

                    {/* Input + controls */}
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={photoModal.urls[i]}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPhotoModal((pm) => pm ? {
                            ...pm,
                            urls: pm.urls.map((u, idx) => idx === i ? val : u) as [string, string, string],
                            statuses: pm.statuses.map((s, idx) => idx === i ? "idle" : s) as [ImgStatus, ImgStatus, ImgStatus],
                          } : null);
                        }}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400/40 focus:border-violet-400 placeholder:text-slate-300"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => testPhotoUrl(i)}
                          disabled={!photoModal.urls[i].trim()}
                          className="text-xs bg-violet-50 hover:bg-violet-100 text-violet-600 px-3 py-1.5 rounded-lg transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Preview
                        </button>
                        <span className="text-sm">
                          {photoModal.statuses[i] === "loading" && (
                            <span className="text-slate-400 animate-pulse">Testing…</span>
                          )}
                          {photoModal.statuses[i] === "ok" && (
                            <span className="text-emerald-600 font-semibold">✅ Working</span>
                          )}
                          {photoModal.statuses[i] === "error" && (
                            <span className="text-red-500 font-semibold">❌ Broken</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Divider */}
              <div className="border-t border-slate-100 pt-5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  Test any URL
                </p>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={testUrl}
                    onChange={(e) => setTestUrl(e.target.value)}
                    placeholder="Paste any image URL to test…"
                    className="flex-1 text-xs border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400/40 placeholder:text-slate-300"
                  />
                  <span className="text-xl w-7 text-center flex-shrink-0">
                    {testStatus === "idle" && ""}
                    {testStatus === "loading" && <span className="text-slate-300 animate-pulse text-sm">…</span>}
                    {testStatus === "ok" && "✅"}
                    {testStatus === "error" && "❌"}
                  </span>
                </div>
                {testStatus === "ok" && testUrl && (
                  <div className="mt-3 relative h-32 rounded-xl overflow-hidden border border-slate-200">
                    <Image src={testUrl} alt="Test preview" fill className="object-cover" sizes="520px" unoptimized />
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100">
              <button
                onClick={() => setPhotoModal(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={savePhotos}
                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-colors shadow-sm"
              >
                Save Photos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-slate-900 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-fade-in">
          {toast}
        </div>
      )}

      <Footer />
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400/40 placeholder:text-slate-300"
      />
    </div>
  );
}
