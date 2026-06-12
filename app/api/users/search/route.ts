import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } =
    new URL(req.url);

  const query =
    searchParams.get("q");

  if (!query || query.length < 3) {
    return Response.json([]);
  }

  const users =
    await prisma.user.findMany({
      where: {
        username: {
          contains: query,
          mode: "insensitive",
        },
      },

      take: 10,

      select: {
        id: true,
        username: true,
        favoriteGame: true,
        avatarUrl: true,
      },
    });

  return Response.json(users);
}