import { prisma } from "@/lib/prisma";

export async function GET() {
  const players = await prisma.player.findMany({
    orderBy: {
      kills: "desc",
    },
    take: 100,
  });

  const leaderboard = players.map((player) => {
    const kd =
      player.deaths > 0
        ? (
            player.kills / player.deaths
          ).toFixed(2)
        : player.kills.toString();

    const winrate =
      player.games > 0
        ? (
            (player.wins / player.games) *
            100
          ).toFixed(1)
        : "0.0";

    return {
  ...player,
  game:
    player.favoriteGame ||
    "Valorant",
  kd,
  winrate,
};
  });

  return Response.json(leaderboard);
}