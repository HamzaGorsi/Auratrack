import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, platform } = body;

  if (!username || !platform) {
    return Response.json({ error: "Missing data" }, { status: 400 });
  }

  // simulate match stats (we'll replace with real API later)

  const player =
  await prisma.player.upsert({
    where: {
      username_platform: {
        username,
        platform,
      },
    },

    update: {},

    create: {
      username,
      platform,

      kills: 0,
      deaths: 0,
      wins: 0,
      games: 0,
    },
  });
  return Response.json(player);
}