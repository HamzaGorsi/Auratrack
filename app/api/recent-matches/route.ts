import { prisma } from "@/lib/prisma";

export async function GET() {
  const matches =
    await prisma.match.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

  return Response.json(matches);
}