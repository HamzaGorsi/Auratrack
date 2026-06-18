import { prisma } from "@/lib/prisma";

export async function saveMatches(
  playerId: string,
  matches: any[]
) {
  for (const match of matches) {
    await prisma.match.upsert({
      where: {
        externalMatchId:
          match.externalMatchId,
      },

      update: {},

      create: {
        externalMatchId:
          match.externalMatchId,

        game: match.game,

        mode: match.mode,

        map: match.score,

        result: match.result,

        kills: match.kills,

        deaths: match.deaths,

        assists: match.assists,

        playerId,
      },
    });
  }
}