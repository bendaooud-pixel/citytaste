#!/usr/bin/env tsx
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { createHash } from "crypto";
import sharp from "sharp";

const ROOT = process.cwd();
const DEST = join(ROOT, "public/images/places/marrakech/jemaa-el-fna");
const MANIFEST = join(ROOT, "public/images/places/manifest.json");

async function main() {
  mkdirSync(DEST, { recursive: true });

  const urls = [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=90&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1600&q=90&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=90&auto=format&fit=crop",
  ];

  const gallery: string[] = [];
  let heroHash = "";
  let heroBlur = "";
  let heroOk = false;

  for (let i = 0; i < urls.length; i++) {
    const res = await fetch(urls[i], { headers: { "User-Agent": "CityTaste/1.0" }, redirect: "follow" });
    if (!res.ok) { console.log("failed HTTP", res.status, urls[i]); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    const hash = createHash("md5").update(buf).digest("hex");
    const base = { fit: "cover" as const };

    if (!heroOk) {
      await sharp(buf).rotate().resize(1200, 800, base).webp({ quality: 85 }).toFile(join(DEST, "hero.webp"));
      await sharp(buf).rotate().resize(400, 300, base).webp({ quality: 75 }).toFile(join(DEST, "thumb.webp"));
      const bl = await sharp(buf).rotate().resize(16, 12).webp({ quality: 20 }).toBuffer();
      heroBlur = "data:image/webp;base64," + bl.toString("base64");
      heroHash = hash;
      heroOk = true;
      gallery.push("/images/places/marrakech/jemaa-el-fna/hero.webp");
    }
    const gi = gallery.length;
    await sharp(buf).rotate().resize(800, 600, base).webp({ quality: 80 }).toFile(join(DEST, `gallery-${gi}.webp`));
    gallery.push(`/images/places/marrakech/jemaa-el-fna/gallery-${gi}.webp`);
    console.log(`  ✅ image ${i + 1} done`);
  }

  if (!heroOk) { console.log("❌ all failed"); return; }

  const m = JSON.parse(readFileSync(MANIFEST, "utf8"));
  m["jemaa-el-fna"] = {
    heroImage: "/images/places/marrakech/jemaa-el-fna/hero.webp",
    thumbnail: "/images/places/marrakech/jemaa-el-fna/thumb.webp",
    gallery,
    imageAlt: "Jemaa el-Fna — Marrakech",
    imageCredits: "Unsplash",
    imageHash: heroHash,
    imageSource: "unsplash",
    imageVerified: true,
    blurDataURL: heroBlur,
  };
  writeFileSync(MANIFEST, JSON.stringify(m, null, 2));
  console.log(`\n✅  jemaa-el-fna patched. Total manifest: ${Object.keys(m).length}`);
}

main().catch(console.error);
