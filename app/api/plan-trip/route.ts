import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { places } from "@/lib/data";

const BUDGET_LABEL: Record<string, string> = {
  "30": "€30/day — budget traveler",
  "50": "€50/day — mid-range",
  "100": "€100/day — comfortable",
  "150": "€150+/day — luxury",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { city, days, budget, interests, travelStyle } = body as {
      city: string;
      days: number;
      budget: string;
      interests: string[];
      travelStyle: string;
    };

    if (!city || !days) {
      return NextResponse.json({ error: "city and days are required" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured. Add it to .env.local." },
        { status: 500 }
      );
    }

    const cityName = city.charAt(0).toUpperCase() + city.slice(1);
    const budgetLabel = BUDGET_LABEL[budget] ?? `€${budget}/day`;
    const interestList = (interests ?? []).join(", ") || "Food, Monuments";

    const cityPlaces = places
      .filter((p) => p.citySlug === city)
      .map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        categories: p.categories,
        neighborhood: p.neighborhood,
        priceLevel: p.priceLevel,
        rating: p.rating,
        description: p.description.slice(0, 120),
        address: p.address,
      }));

    const prompt = `You are a world-class travel expert. Create a practical day-by-day itinerary.

Trip: ${days} day(s) in ${cityName}
Budget: ${budgetLabel}
Travel style: ${travelStyle}
Interests: ${interestList}

Our curated places in ${cityName} (prefer these when relevant — use exact id values):
${JSON.stringify(cityPlaces, null, 2)}

Return ONLY a JSON object — no markdown, no explanation. Use this exact structure:
{
  "city": "${cityName}",
  "days": [
    {
      "day": 1,
      "theme": "Evocative day theme",
      "morning": [
        {
          "time": "8:30 AM",
          "timeOfDay": "morning",
          "name": "Place name",
          "placeId": "exact-id-from-list or null",
          "category": "breakfast",
          "description": "What to do / what to order (1-2 sentences)",
          "duration": "45 min",
          "address": "Street address",
          "walkingHint": "8 min walk to next stop",
          "tip": "Practical local tip"
        }
      ],
      "afternoon": [ /* 2 stops: lunch + activity/sight */ ],
      "evening": [ /* 1-2 stops: aperitivo/dinner */ ]
    }
  ],
  "estimatedDailyBudget": "~€XX–€XX",
  "tips": ["Tip 1", "Tip 2", "Tip 3"]
}

Rules:
- 2 stops morning, 2 stops afternoon, 1-2 stops evening per day
- Match budget: ${budgetLabel}
- Match style: ${travelStyle}
- Focus on: ${interestList}
- Use placeId from our list where it fits; null otherwise
- Keep descriptions punchy and useful
- Add 3-5 practical tips`;

    const client = new Groq({ apiKey });
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = (completion.choices[0]?.message?.content ?? "")
      .trim()
      .replace(/^```(?:json)?\n?/, "")
      .replace(/\n?```$/, "");

    let itinerary: unknown;
    try {
      itinerary = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "Could not parse itinerary JSON", detail: raw.slice(0, 400) },
        { status: 500 }
      );
    }

    return NextResponse.json({ itinerary });
  } catch (err) {
    console.error("[/api/plan-trip]", err);
    return NextResponse.json(
      { error: "Internal server error", detail: String(err) },
      { status: 500 }
    );
  }
}
