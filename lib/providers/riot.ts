import { Provider } from "./types";

export const riotProvider: Provider = {
  async searchPlayer(username) {
  const split =
    username.split("#");

  const gameName = split[0];
  const tagLine = split[1];

  if (!gameName || !tagLine) {
    return null;
  }

  try {
    const res = await fetch(
      `/api/riot/account?gameName=${encodeURIComponent(
        gameName
      )}&tagLine=${encodeURIComponent(
        tagLine
      )}`
    );

    if (!res.ok) {
      return null;
    }

    const data =
      await res.json();

    const rankRes =
  await fetch(
    `/api/riot/account/rank?puuid=${data.puuid}`
  );

let rankData = null;

if (rankRes.ok) {
  rankData =
    await rankRes.json();
}

return {
  username:
    `${data.gameName}#${data.tagLine}`,

  platform: "RIOT",
  puuid: data.puuid,
  avatar: "",

  rank:
    rankData?.currenttierpatched ||
    "Unranked",

  level:
    rankData?.ranking_in_tier || 0,
};
  } catch {
    return null;
  }
},
async getMatches(username) {
  try {
  const profile =
    await this.searchPlayer(
      username
    );

  if (!profile?.puuid) {
    return [];
  }

    const matchesRes = await fetch(
      `/api/riot/account/matches?puuid=${profile.puuid}`
    );

    if (!matchesRes.ok) {
      return [];
    }

    const matchesData =
      await matchesRes.json();

    const detailedMatches =
  await Promise.all(
    matchesData.history.map(
      async (matchId: string) => {
        const matchRes =
          await fetch(
            `/api/riot/account/matches?matchId=${matchId}`
          );

        if (!matchRes.ok) {
          return null;
        }

        const matchData =
          await matchRes.json();

       const playerData =
  matchData.players.players.find(
    (player: any) =>
      player.puuid ===
      profile.puuid
  );

if (!playerData) {
  return null;
}

return {
  game: "Valorant",

  result:
    playerData.teamId ===
    matchData.teams.find(
      (team: any) => team.won
    )?.teamId
      ? "VICTORY"
      : "DEFEAT",

  mode:
  matchData.matchInfo
    ?.queueId === "competitive"
      ? "Competitive"

      : matchData.matchInfo
          ?.queueId === "unrated"
        ? "Unrated"

      : matchData.matchInfo
          ?.queueId === "swiftplay"
        ? "Swiftplay"

      : "Valorant",

  score:
  matchData.matchInfo
    ?.mapId
      ?.split("/")
      .pop()
      ?.replace(
        "Juliett",
        "Sunset"
      )
      ?.replace(
        "Triad",
        "Lotus"
      )
      ?.replace(
        "Bonsai",
        "Split"
      )
      ?.replace(
        "Ascent",
        "Ascent"
      )
      ?.replace(
        "Port",
        "Icebox"
      )
      ?.replace(
        "Pitt",
        "Pearl"
      )
      ?.replace(
        "Canyon",
        "Fracture"
      )
      ?.replace(
        "Foxtrot",
        "Breeze"
      ) ||
  "Unknown Map",

  kills:
    playerData.stats.kills,

  deaths:
    playerData.stats.deaths,

 assists:
  playerData.stats.assists,
};
      }
    )
  );

return detailedMatches.filter(Boolean);

  } catch {
    return [];
  }
},
};