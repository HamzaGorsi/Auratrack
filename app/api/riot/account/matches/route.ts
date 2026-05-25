import { NextResponse } from "next/server";
import {
  getCache,
  setCache,
} from "@/lib/cache";
export async function GET(req: Request) {
  const { searchParams } =
    new URL(req.url);

  const puuid =
    searchParams.get("puuid");
const matchId =
  searchParams.get("matchId");
  if (matchId) {
    const cached =
  getCache(matchId);

if (cached) {
  return NextResponse.json(
    cached
  );
}
  try {
    const response = await fetch(
      `https://europe.api.riotgames.com/val/match/v1/matches/${matchId}`,
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
            "Failed to fetch match",
        },
        {
          status: response.status,
        }
      );
    }

    const data =
      await response.json();
setCache(matchId, data);
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
      `https://europe.api.riotgames.com/val/match/v1/matchlists/by-puuid/${puuid}?size=5`,
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
            "Failed to fetch matches",
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