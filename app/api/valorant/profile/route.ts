import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const name = searchParams.get("name");
  const tag = searchParams.get("tag");

  if (!name || !tag) {
    return NextResponse.json(
      { error: "Missing Riot ID" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.henrikdev.xyz/valorant/v2/mmr/kr/${name}/${tag}`
    );

    const data = await response.json();

    if (!response.ok || data.errors) {
      return NextResponse.json(
        { error: "Player not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}