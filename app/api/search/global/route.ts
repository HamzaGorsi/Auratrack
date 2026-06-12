import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } =
    new URL(req.url);

  const query =
    searchParams.get("q");

  if (!query) {
    return Response.json([]);
  }

  const players =
    await prisma.player.findMany({
      where: {
        username: {
          contains: query,
          mode: "insensitive",
        },
      },

      take: 20,

      select: {
        id: true,
        username: true,
        platform: true,
      },
    });

  return Response.json(players);
}