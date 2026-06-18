import { prisma } from "@/lib/prisma";

export async function updatePlayerStats(
  playerId: string
) {
  const matches =
    await prisma.match.findMany({
      where: {
        playerId,
      },
    });

  const games =
    matches.length;

  const kills =
    matches.reduce(
      (sum, match) =>
        sum + match.kills,
      0
    );

  const deaths =
    matches.reduce(
      (sum, match) =>
        sum + match.deaths,
      0
    );

  const wins =
    matches.filter(
      (match) =>
        match.result ===
        "VICTORY"
    ).length;

  await prisma.player.update({
    where: {
      id: playerId,
    },

    data: {
      games,
      kills,
      deaths,
      wins,

      lastSyncedAt:
        new Date(),
    },
  });
}