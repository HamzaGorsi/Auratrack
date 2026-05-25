import { prisma } from "@/lib/prisma";

export async function GET() {
  const activities =
    await prisma.activity.findMany({
      orderBy: {
        createdAt: "desc",
      },

      take: 25,
    });

  return Response.json(
    activities
  );
}