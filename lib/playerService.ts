import { gameStats } from "./gameData";

export type PlayerStatsResponse = {
  username: string;
  platform: string;
  stats: typeof gameStats;
};

// This is your "backend logic layer"
export async function getPlayerStats(
  username: string,
  platform: string
): Promise<PlayerStatsResponse> {
  // Later we replace this with Riot / PSN / Xbox APIs

  return {
    username,
    platform,
    stats: gameStats,
  };
}