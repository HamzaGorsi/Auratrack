import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } =
    new URL(req.url);

  const puuid =
    searchParams.get("puuid");

  if (!puuid) {
    return NextResponse.json(
      {
        error: "Missing puuid",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const response = await fetch(
      `https://eu.api.riotgames.com/val/ranked/v1/by-puuid/${puuid}`,
      {
        headers: {
          "X-Riot-Token":
            process.env.RIOT_API_KEY!,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            "Failed to fetch rank",
        },
        {
          status: response.status,
        }
      );
    }

    const data =
      await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      {
        error:
          "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}