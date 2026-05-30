import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: {
    params: Promise<{
      platform: string;
      username: string;
    }>;
  }
) {
  try {
    const { platform, username } =
      await context.params;

    // username#tag
    const [gameName, tagLine] =
      username.split("#");

    if (!gameName || !tagLine) {
      return Response.json(
        {
          error:
            "Invalid Riot ID",
        },
        {
          status: 400,
        }
      );
    }

    // ACCOUNT LOOKUP
    const accountRes = await fetch(
      `https://api.henrikdev.xyz/valorant/v1/account/${gameName}/${tagLine}`
    );

    if (!accountRes.ok) {
      return Response.json(
        {
          error:
            "Player not found",
        },
        {
          status: 404,
        }
      );
    }

    const accountData =
      await accountRes.json();
console.log("ACCOUNT DATA:", accountData);
    // MMR / RANK
    const mmrRes = await fetch(
      `https://api.henrikdev.xyz/valorant/v2/mmr/ap/${gameName}/${tagLine}`
    );

    let rankData = null;

    if (mmrRes.ok) {
      rankData =
        await mmrRes.json();
    }
console.log("RANK DATA:", rankData);
    // MATCHES
    const matchesRes = await fetch(
      `https://api.henrikdev.xyz/valorant/v3/matches/ap/${gameName}/${tagLine}?size=5`
    );

    let matchesData: any[] = [];

    if (matchesRes.ok) {
      const json =
        await matchesRes.json();

      matchesData =
        json.data || [];
    }
console.log("MATCHES DATA:", matchesData);
    // CALCULATE STATS
    let totalKills = 0;
    let totalDeaths = 0;
    let wins = 0;

   const formattedMatches =
  Array.isArray(matchesData)
    ? matchesData.map(
        (match: any) => {
          const player =
  match.players?.find(
              (p: any) =>
  p.name?.toLowerCase() ===
  gameName.toLowerCase()
            );

          if (!player) {
            return null;
          }

          totalKills +=
            player.stats.kills;

          totalDeaths +=
            player.stats.deaths;

          const winningTeam =
  match.teams.red.has_won
    ? "red"
    : "blue";

const didWin =
  player.team.toLowerCase() ===
  winningTeam;

if (didWin) {
  wins++;
}

return {
  id: match.metadata.matchid,

  map: match.metadata.map,

  mode: match.metadata.mode,

  kills:
    player.stats.kills,

  deaths:
    player.stats.deaths,

  assists:
    player.stats.assists,

  agent:
    player.character,

  result:
    didWin
      ? "Victory"
      : "Defeat",

            createdAt:
              match.metadata.game_start,
          };
        }
      ).filter(Boolean)
    : [];

    const games =
      formattedMatches.length;

    const kd =
      totalDeaths > 0
        ? (
            totalKills /
            totalDeaths
          ).toFixed(2)
        : totalKills.toString();

    const winrate =
      games > 0
        ? (
            (wins / games) *
            100
          ).toFixed(1)
        : "0.0";

    // SAVE/UPDATE PLAYER
    const player =
      await prisma.player.upsert({
        where: {
          username_platform: {
            username,
            platform,
          },
        },

        update: {
          kills: totalKills,
          deaths: totalDeaths,
          wins,
          games,

          rank:
            rankData?.data
              ?.current_data
              ?.currenttierpatched ||
            "Unranked",
        },

        create: {
          username,
          platform,

          kills: totalKills,
          deaths: totalDeaths,
          wins,
          games,

          rank:
            rankData?.data
              ?.current_data
              ?.currenttierpatched ||
            "Unranked",
        },
      });

    return Response.json({
      player: {
        ...player,

        kd,

        winrate,

        rank:
          rankData?.data
            ?.current_data
            ?.currenttierpatched ||
          "Unranked",

        elo:
          rankData?.data
            ?.current_data?.elo || 0,

        peakRank:
          rankData?.data
            ?.highest_rank
            ?.patched_tier ||
          "Unknown",

        card:
          accountData?.data
            ?.card?.large,

        lastUpdated:
          new Date(),
      },

      matches:
        formattedMatches,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Failed to load player",
      },
      {
        status: 500,
      }
    );
  }
}