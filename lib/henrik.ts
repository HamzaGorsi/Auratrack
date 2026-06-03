const HENRIK_BASE = "https://api.henrikdev.xyz";

function getHenrikKey() {
  return process.env.HENRIK_API_KEY?.trim() || "";
}

export async function henrikFetch(
  path: string,
  init?: RequestInit
) {
  const apiKey = getHenrikKey();
  const url = new URL(`${HENRIK_BASE}${path}`);

  if (apiKey) {
    url.searchParams.set("api_key", apiKey);
  }

  const headers = new Headers(init?.headers);

  if (apiKey) {
    headers.set("Authorization", apiKey);
  }

  return fetch(url.toString(), {
    ...init,
    headers,
    cache: "no-store",
  });
}

export type HenrikPlayerStats = {
  kills: number;
  deaths: number;
  assists: number;
  score: number;
};

export type HenrikMatchPlayer = {
  puuid?: string;
  name?: string;
  tag?: string;
  team?: string;
  character?: string;
  stats?: Partial<HenrikPlayerStats>;
};

export type HenrikMatch = {
  metadata?: {
    matchid?: string;
    map?: string;
    mode?: string;
    game_start?: number;
    rounds_played?: number;
  };
  players?: {
    all_players?: HenrikMatchPlayer[];
  } | HenrikMatchPlayer[];
  teams?:
    | {
        red?: { has_won?: boolean; rounds_won?: number };
        blue?: { has_won?: boolean; rounds_won?: number };
      }
    | Array<{ team_id?: string; won?: boolean; rounds_won?: number }>;
};

export function findHenrikPlayer(
  match: HenrikMatch,
  gameName: string,
  tagLine: string,
  puuid?: string
): HenrikMatchPlayer | null {
  const rawPlayers = match.players;
  const players = Array.isArray(rawPlayers)
    ? rawPlayers
    : rawPlayers?.all_players ?? [];

  if (!Array.isArray(players)) {
    return null;
  }

  return (
    players.find((player) => {
      if (puuid && player.puuid === puuid) {
        return true;
      }

      return (
        player.name?.toLowerCase() ===
          gameName.toLowerCase() &&
        player.tag?.toLowerCase() ===
          tagLine.toLowerCase()
      );
    }) ?? null
  );
}

export function getWinningTeam(
  teams: HenrikMatch["teams"]
): string | null {
  if (!teams) {
    return null;
  }

  if (Array.isArray(teams)) {
    const winner = teams.find((team) => team.won);
    return winner?.team_id?.toLowerCase() ?? null;
  }

  if (teams.red?.has_won) {
    return "red";
  }

  if (teams.blue?.has_won) {
    return "blue";
  }

  return null;
}

export function didPlayerWinMatch(
  playerTeam: string | undefined,
  teams: HenrikMatch["teams"]
): boolean {
  const winningTeam = getWinningTeam(teams);

  if (!winningTeam || !playerTeam) {
    return false;
  }

  return playerTeam.toLowerCase() === winningTeam;
}

export type FormattedValorantMatch = {
  id: string;
  game: string;
  gameMode: string;
  map: string;
  platform: string;
  kills: number;
  deaths: number;
  assists: number;
  agent: string;
  result: "VICTORY" | "DEFEAT";
  score: string;
  createdAt: string;
};

export function formatHenrikMatch(
  match: HenrikMatch,
  gameName: string,
  tagLine: string,
  puuid?: string
): FormattedValorantMatch | null {
  try {
    const player = findHenrikPlayer(
      match,
      gameName,
      tagLine,
      puuid
    );

    if (!player?.stats) {
      return null;
    }

    const kills = Number(player.stats.kills ?? 0);
    const deaths = Number(player.stats.deaths ?? 0);
    const assists = Number(
      player.stats.assists ?? 0
    );
    const didWin = didPlayerWinMatch(
      player.team,
      match.teams
    );

    const teams = match.teams;
    let score = "";

    if (teams && !Array.isArray(teams)) {
      const redRounds = teams.red?.rounds_won ?? 0;
      const blueRounds = teams.blue?.rounds_won ?? 0;
      score = `${redRounds}-${blueRounds}`;
    }

    const gameStart =
      match.metadata?.game_start;

    return {
      id:
        match.metadata?.matchid ??
        crypto.randomUUID(),

      game: "Valorant",

      gameMode:
        match.metadata?.mode ?? "Unknown",

      map:
        match.metadata?.map ?? "Unknown Map",

      platform: "RIOT",

      kills,
      deaths,
      assists,

      agent:
        player.character ?? "Unknown",

      result: didWin ? "VICTORY" : "DEFEAT",

      score,

      createdAt: gameStart
        ? new Date(
            gameStart * 1000
          ).toISOString()
        : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function parseHenrikMatches(
  matchesData: unknown,
  gameName: string,
  tagLine: string,
  puuid?: string
) {
  let totalKills = 0;
  let totalDeaths = 0;
  let wins = 0;

  const rawMatches = Array.isArray(matchesData)
    ? matchesData
    : [];

  const formattedMatches = rawMatches
    .map((match) =>
      formatHenrikMatch(
        match as HenrikMatch,
        gameName,
        tagLine,
        puuid
      )
    )
    .filter(
      (
        match
      ): match is FormattedValorantMatch =>
        match !== null
    );

  for (const match of formattedMatches) {
    totalKills += match.kills;
    totalDeaths += match.deaths;

    if (match.result === "VICTORY") {
      wins++;
    }
  }

  const games = formattedMatches.length;

  const kd =
    totalDeaths > 0
      ? (totalKills / totalDeaths).toFixed(2)
      : totalKills.toString();

  const winrate =
    games > 0
      ? ((wins / games) * 100).toFixed(1)
      : "0.0";

  return {
    formattedMatches,
    totalKills,
    totalDeaths,
    wins,
    games,
    kd,
    winrate,
  };
}
