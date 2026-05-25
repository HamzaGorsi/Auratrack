import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const players =
      await prisma.searchHistory.groupBy({
        by: [
          "username",
          "platform",
        ],

        _count: {
          username: true,
        },

        orderBy: {
          _count: {
            username: "desc",
          },
        },

        take: 8,
      });

    return Response.json(players);
  } catch {
    return Response.json([]);
  }
}