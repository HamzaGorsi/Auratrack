import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  if (!query) {
    return Response.json([]);
  }

  const results = await prisma.player.findMany({
    where: {
      username: {
        contains: query,
      },
    },
    take: 10,
  });

  return Response.json(results);
}