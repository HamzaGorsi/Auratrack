import { prisma } from "@/lib/prisma";

export async function GET() {
  const matches = await prisma.match.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
    include: { player: true },
  });

  return Response.json(matches);
}