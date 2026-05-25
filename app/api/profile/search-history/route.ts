import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user =
      await prisma.user.findFirst();

    if (!user) {
      return Response.json([]);
    }

    const history =
      await prisma.searchHistory.findMany({
        where: {
          userId: user.id,
        },

        orderBy: {
          createdAt: "desc",
        },

        take: 10,
      });

    return Response.json(history);
  } catch (error) {
    console.error(error);

    return Response.json([]);
  }
}