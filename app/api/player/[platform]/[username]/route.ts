import { prisma } from "@/lib/prisma";
import {
  henrikFetch,
  parseHenrikMatches,
} from "@/lib/henrik";

export const dynamic = "force-dynamic";

const DB_TIMEOUT_MS = 8000;

async function upsertPlayerWithTimeout(
  data: {
    username: string;
    platform: string;
    kills: number;
    deaths: number;
    wins: number;
    games: number;
    rank: string;
  }
) {
  try {
    return await Promise.race([
      prisma.player.upsert({
        where: {
          username_platform: {
            username: data.username,
            platform: data.platform,
          },
        },
        update: {
          kills: data.kills,
          deaths: data.deaths,
          wins: data.wins,
          games: data.games,
          rank: data.rank,
        },
        create: {
          username: data.username,
          platform: data.platform,
          kills: data.kills,
          deaths: data.deaths,
          wins: data.wins,
          games: data.games,
          rank: data.rank,
        },
      }),
      new Promise<never>((_, reject) => {
        setTimeout(
          () =>
            reject(
              new Error("Database timeout")
            ),
          DB_TIMEOUT_MS
        );
      }),
    ]);
  } catch (error) {
    console.error("Player upsert failed:", error);

    return {
      id: "temp",
      username: data.username,
      platform: data.platform,
      kills: data.kills,
      deaths: data.deaths,
      wins: data.wins,
      games: data.games,
      rank: data.rank,
      bio: "",
      favoriteGame: "Valorant",
      bannerUrl: "",
      avatarUrl: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: null,
    };
  }
}

async function loadRiotValorantProfile(
  username: string,
  platform: string
) {
  const [gameName, tagLine] = username.split("#");

  if (!gameName || !tagLine) {
    return Response.json(
      { error: "Invalid Riot ID. Use name#tag format." },
      { status: 400 }
    );
  }

  if (!process.env.HENRIK_API_KEY) {
    return Response.json(
      {
        error:
          "HENRIK_API_KEY is not configured. Add it in Vercel environment variables.",
      },
      { status: 503 }
    );
  }

  const encodedName = encodeURIComponent(gameName);
  const encodedTag = encodeURIComponent(tagLine);

  const accountRes = await henrikFetch(
    `/valorant/v1/account/${encodedName}/${encodedTag}`
  );

  if (!accountRes.ok) {
  const text = await accountRes.text();

  console.log(
    "HENRIK STATUS:",
    accountRes.status
  );

  console.log(
    "HENRIK RESPONSE:",
    text
  );

  return Response.json(
    {
      error: text,
    },
    {
      status: accountRes.status,
    }
  );
}

  const accountJson = await accountRes.json();
  const account = accountJson?.data;

  if (!account) {
    return Response.json(
      { error: "Player not found" },
      { status: 404 }
    );
  }

  const region = (
    account.region ?? "eu"
  ).toLowerCase();
  const puuid = account.puuid as
    | string
    | undefined;

  const [mmrRes, matchesRes] = await Promise.all([
    henrikFetch(
      `/valorant/v2/mmr/${region}/${encodedName}/${encodedTag}`
    ),
    henrikFetch(
  `/valorant/v3/matches/${region}/${encodedName}/${encodedTag}?size=5`
),
  ]);
  
  let rankData: any = null;

  if (mmrRes.ok) {
    rankData = await mmrRes.json().catch(() => null);
  }

  let matchesData: unknown[] = [];

  if (matchesRes.ok) {
    const matchesJson = await matchesRes
      .json()
      .catch(() => null);

    matchesData = Array.isArray(matchesJson?.data)
      ? matchesJson.data
      : [];
  }

  const {
    formattedMatches,
    totalKills,
    totalDeaths,
    wins,
    games,
    kd,
    winrate,
  } = parseHenrikMatches(
    matchesData,
    gameName,
    tagLine,
    puuid
  );

  const rank =
  rankData?.data?.current_data
    ?.currenttierpatched ??
  "Not Ranked Yet";

  const elo =
    rankData?.data?.current_data?.elo ?? 0;

  const peakRank =
  rankData?.data?.highest_rank
    ?.patched_tier ??
  "Not Ranked Yet";

  const player = await upsertPlayerWithTimeout({
    username,
    platform,
    kills: totalKills,
    deaths: totalDeaths,
    wins,
    games,
    rank,
  });

  return Response.json({
    player: {
      ...player,
      username:
        account.name && account.tag
          ? `${account.name}#${account.tag}`
          : username,
      kd,
      winrate,
      matches: games,
      rank,
      elo,
      peakRank,
      accountLevel: account.account_level ?? 0,
      card: account.card?.large ?? account.card?.wide ?? "",
      puuid: account.puuid ?? null,
      region,
      lastUpdated: new Date().toISOString(),
    },
    matches: formattedMatches,
  });
}

export async function GET(
  _req: Request,
  context: {
    params: Promise<{
      platform: string;
      username: string;
    }>;
  }
) {
  try {
    const { platform, username: rawUsername } =
      await context.params;

    const username = decodeURIComponent(
      rawUsername
    );

    if (platform.toUpperCase() === "RIOT") {
      return loadRiotValorantProfile(
        username,
        platform
      );
    }

    const existing = await Promise.race([
      prisma.player.findUnique({
        where: {
          username_platform: {
            username,
            platform,
          },
        },
        include: {
  matches: {
    orderBy: { createdAt: "desc" },
    take: 10,
  },

  achievements: true,

  user: {
    select: {
      username: true,
    },
  },
},
      }),
      new Promise<null>((resolve) => {
        setTimeout(() => resolve(null), DB_TIMEOUT_MS);
      }),
    ]);

    if (!existing) {
      return Response.json(
        { error: "Player not found" },
        { status: 404 }
      );
    }

    const kd =
      existing.deaths > 0
        ? (
            existing.kills / existing.deaths
          ).toFixed(2)
        : existing.kills.toString();

    const winrate =
      existing.games > 0
        ? (
            (existing.wins / existing.games) *
            100
          ).toFixed(1)
        : "0.0";

    return Response.json({
      player: {
        ...existing,
        kd,
        winrate,
        matches: existing.games,
      },
      matches: existing.matches.map(
        (match) => ({
          id: match.id,
          kills: match.kills,
          deaths: match.deaths,
          result: match.result ?? "Unknown",
          createdAt: match.createdAt,
        })
      ),
    });
  } catch (error) {
    console.error("Player route error:", error);

    return Response.json(
      { error: "Failed to load player" },
      { status: 500 }
    );
  }
}
