import { prisma } from "@/lib/prisma";

export async function GET() {
  const users =
    await prisma.user.findMany({
      take: 20,

      select: {
        id: true,
        username: true,
        avatarUrl: true,
        favoriteGame: true,
      },
    });

  return Response.json(users);
}