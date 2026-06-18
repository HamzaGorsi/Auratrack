import { prisma } from "@/lib/prisma";
import { syncPlayer } from "@/lib/sync/syncPlayer";
export async function GET(req: Request) {
  try {
    const { searchParams } =
      new URL(req.url);

    const query =
      searchParams.get("q");

    if (!query) {
      return Response.json([]);
    }

    // username#tag
    const [gameName, tagLine] =
      query.split("#");

    if (!gameName || !tagLine) {
      return Response.json(
        {
          error:
            "Use RiotID#TAG format",
        },
        {
          status: 400,
        }
      );
    }

    // RIOT ACCOUNT API
    const accountRes = await fetch(
      `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      {
        headers: {
          "X-Riot-Token":
            process.env.RIOT_API_KEY!,
        },
      }
    );

    if (!accountRes.ok) {
      return Response.json(
        {
          error:
            "Riot player not found",
        },
        {
          status: 404,
        }
      );
    }

    const account =
      await accountRes.json();

    // UPSERT PLAYER
    const player =
      await prisma.player.upsert({
        where: {
          username_platform: {
            username:
              `${gameName}#${tagLine}`,

            platform: "RIOT",
          },
        },

        update: {},

        create: {
          username:
            `${gameName}#${tagLine}`,

          platform: "RIOT",

          kills: 0,
          deaths: 0,
          wins: 0,
          games: 0,

          rank: "Unranked",
        },
      });
await syncPlayer(
  `${gameName}#${tagLine}`,
  "RIOT",
  player.id
);
    return Response.json({
      ...player,
      puuid: account.puuid,
      gameName:
        account.gameName,
      tagLine:
        account.tagLine,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Search failed",
      },
      {
        status: 500,
      }
    );
  }
}