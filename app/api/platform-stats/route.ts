import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      players,
      matches,
      users,
      tournaments,
    ] = await Promise.all([
      prisma.player.count(),
      prisma.match.count(),
      prisma.user.count(),
      prisma.activity.count(),
    ]);

    return Response.json({
      trackedPlayers: players,
      matchesAnalyzed: matches,
      liveUsers: users,
      gamesSupported: 2,
      dailyMatches: matches,
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