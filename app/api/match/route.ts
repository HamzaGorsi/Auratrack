import { prisma } from "@/lib/prisma";

import { achievements } from "@/lib/achievements";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    username,
    platform,

    kills,
    deaths,
    wins,
  } = body;

  const player =
    await prisma.player.findUnique({
      where: {
        username_platform: {
          username,
          platform,
        },
      },

      include: {
        achievements: true,
      },
    });

  if (!player) {
    return Response.json(
      { error: "Player not found" },
      { status: 404 }
    );
  }

  const match =
    await prisma.match.create({
      data: {
        kills,
        deaths,
        wins,

        playerId: player.id,
      },
    });

  // LIVE ACTIVITY
  await prisma.activity.create({
    data: {
      type: "MATCH",

      message: `${username} completed a match with ${kills} kills`,
    },
  });

  // UPDATED STATS
  const totalKills =
    player.kills + kills;

  const totalDeaths =
    player.deaths + deaths;

  const totalWins =
    player.wins + wins;

  const totalGames =
    player.games + 1;

  const kd =
    totalDeaths > 0
      ? totalKills / totalDeaths
      : totalKills;

  // ACHIEVEMENT CHECKS
  const unlocked =
    player.achievements.map(
      (a) => a.title
    );

  async function unlock(
    title: string
  ) {
    const achievement =
      achievements.find(
        (a) => a.title === title
      );

    if (!achievement) return;

    if (unlocked.includes(title))
      return;

    await prisma.achievement.create({
      data: {
        title:
          achievement.title,

        description:
          achievement.description,

        icon: achievement.icon,

        playerId: player.id,
      },
    });

    await prisma.activity.create({
      data: {
        type: "ACHIEVEMENT",

        message: `${username} unlocked "${achievement.title}"`,
      },
    });
  }

  if (totalGames >= 1) {
    await unlock("First Blood");
  }

  if (kd >= 2) {
    await unlock("Sharpshooter");
  }

  if (totalWins >= 25) {
    await unlock(
      "Elite Competitor"
    );
  }

  if (kd >= 5) {
    await unlock("Unstoppable");
  }

  if (totalGames >= 100) {
    await unlock("Veteran");
  }
await prisma.player.update({
  where: {
    id: player.id,
  },

  data: {
    kills: totalKills,

    deaths: totalDeaths,

    wins: totalWins,

    games: totalGames,
  },
});
  return Response.json(match);
}