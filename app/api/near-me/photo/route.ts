import { NextResponse } from "next/server";

const GKEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// Proxy Google Places photos server-side so the API key never appears in browser requests.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ref = searchParams.get("ref");
  const maxwidth = searchParams.get("maxwidth") ?? "600";

  if (!ref || !GKEY) {
    return new NextResponse(null, { status: 400 });
  }

  const url =
    `https://maps.googleapis.com/maps/api/place/photo` +
    `?maxwidth=${maxwidth}&photo_reference=${encodeURIComponent(ref)}&key=${GKEY}`;

  try {
    const upstream = await fetch(url);
    const buffer = await upstream.arrayBuffer();
    const contentType = upstream.headers.get("content-type") ?? "image/jpeg";

    return new NextResponse(buffer, {
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=86400, immutable",
      },
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
