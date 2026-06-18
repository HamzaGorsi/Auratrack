import { prisma } from "@/lib/prisma";
const supportedGames = [
  "Valorant",
  "Fortnite",
  "Apex Legends",
  "Counter-Strike 2",
  "Rocket League",
  "Rainbow Six Siege",
];
export async function GET() {
  try {
    const today = new Date();

today.setHours(0, 0, 0, 0);

const [
  players,
  matches,
  users,
  tournaments,
  dailyMatches,
] = await Promise.all([
  prisma.player.count(),

  prisma.match.count(),

  prisma.user.count(),

  prisma.activity.count(),

  prisma.match.count({
    where: {
      createdAt: {
        gte: today,
      },
    },
  }),
]);

    return Response.json({
      trackedPlayers: players,
      matchesAnalyzed: matches,
      liveUsers: users,
gamesSupported: supportedGames.length,
      dailyMatches,
      tournaments,
    });
  } catch {
    return Response.json({
      trackedPlayers: 0,
      matchesAnalyzed: 0,
      liveUsers: 0,
      gamesSupported: 0,
      dailyMatches: 0,
      tournaments: 0,
    });
  }
}