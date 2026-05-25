import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    username,
    platform,

    bio,
    favoriteGame,
    bannerUrl,
  } = body;

  const player = await prisma.player.update({
    where: {
      username_platform: {
        username,
        platform,
      },
    },

    data: {
      bio,
      favoriteGame,
      bannerUrl,
    },
  });

  return Response.json(player);
}