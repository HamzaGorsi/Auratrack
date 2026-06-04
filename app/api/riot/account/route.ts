import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  
  const { searchParams } = new URL(req.url);
const gameName = searchParams.get("gameName");
  const tagLine = searchParams.get("tagLine");

  if (!gameName || !tagLine) {
    return NextResponse.json(
      { error: "Missing Riot ID" },
      { status: 400 }
    );
  }

  try {
    console.log(process.env.RIOT_API_KEY);
    const response = await fetch(
      `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      {
        headers: {
          "X-Riot-Token": process.env.RIOT_API_KEY!,
        },
      }
    );

    if (!response.ok) {
  const errorText = await response.text();

  console.error(
    "RIOT ACCOUNT ERROR:",
    response.status,
    errorText
  );

  return NextResponse.json(
    {
      error: errorText,
      status: response.status,
    },
    {
      status: response.status,
    }
  );
}

    const data = await response.json();
     return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}