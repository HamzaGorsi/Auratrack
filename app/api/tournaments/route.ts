import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.liquipedia.net/api/v3/tournament",
      {
        headers: {
          Authorization: `Apikey ${process.env.LIQUIPEDIA_API_KEY}`,
        },

        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error();
    }

    const data = await res.json();

    return NextResponse.json(data);

  } catch {
    return NextResponse.json([]);
  }
}