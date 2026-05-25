import { prisma } from "@/lib/prisma";

import { calculateRank } from "@/lib/rank";

export async function GET(
  req: Request,
  context: {
    params: Promise<{
      platform: string;
      username: string;
    }>;
  }
) {
  const { platform, username } =
    await context.params;

  const player = await prisma.player.findUnique({
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

  const matches =
    await prisma.match.findMany({
      where: {
        playerId: player.id,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 20,
    });

  const kd =
    player.deaths > 0
      ? Number(
          (
            player.kills /
            player.deaths
          ).toFixed(2)
        )
      : player.kills;

  const winrate =
    player.games > 0
      ? (
          (player.wins /
            player.games) *
          100
        ).toFixed(1)
      : "0.0";

  const calculatedRank =
    calculateRank(
      Number(kd),
      player.wins,
      player.games
    );

  if (
    player.rank !==
    calculatedRank
  ) {
    await prisma.player.update({
      where: {
        id: player.id,
      },

      data: {
        rank: calculatedRank,
      },
    });
  }

  return Response.json({
    player: {
      ...player,

      rank: calculatedRank,

      kd,

      winrate,
    },

    matches,
  });
}