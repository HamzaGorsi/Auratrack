export type PlayerProfile = {
  username: string;
  platform: string;
  puuid?: string;
  avatar?: string;
  rank?: string;
  level?: number;
};

export type Match = {
  game: string;
  result: "VICTORY" | "DEFEAT";
  mode: string;
  score: string;
  kills?: number;
  deaths?: number;
  assists?: number;
  kda?: string;
  rankChange?: string;
};

export type Provider = {
  searchPlayer: (
    username: string
  ) => Promise<PlayerProfile | null>;

  getMatches: (
    username: string
  ) => Promise<Match[]>;
};