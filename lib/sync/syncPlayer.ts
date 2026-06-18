import { prisma } from "@/lib/prisma";
import { providers } from "@/lib/providers";

import { saveMatches } from "./saveMatches";
import { updatePlayerStats } from "./updatePlayerStats";

export async function syncPlayer(
  username: string,
  platform: string,
  playerId: string
) {
  const player = await prisma.player.findUnique({
    where: { id: playerId },
  });

  if (!player) return;

  const now = Date.now();
  const lastSync = player.lastSyncedAt?.getTime() || 0;
  const minutesSinceSync = (now - lastSync) / 60000;

  if (minutesSinceSync < 5) return;

  const provider =
    providers[platform as keyof typeof providers];

  if (!provider) return;

  try {
    const rawMatches = await provider.getMatches(username);

    if (!Array.isArray(rawMatches)) return;

    // normalize matches BEFORE saving
    const matches = rawMatches
      .filter((m: any) => m && m.kills != null && m.deaths != null)
      .map((m: any, i: number) => ({
        externalMatchId:
          m.externalMatchId || `${playerId}-${Date.now()}-${i}`,

        game: m.game || "Valorant",
        mode: m.mode || "Unknown",
        map: m.map || m.score || null,
        result: m.result || "UNKNOWN",
        kills: m.kills || 0,
        deaths: m.deaths || 0,
        assists: m.assists || 0,
      }));

    if (matches.length === 0) return;

    await saveMatches(playerId, matches);

    await updatePlayerStats(playerId);

    await prisma.player.update({
      where: { id: playerId },
      data: {
        lastSyncedAt: new Date(),
        riotPuuid: player.riotPuuid ?? null,
      },
    });
  } catch (err) {
    console.error("syncPlayer failed:", err);
  }
}