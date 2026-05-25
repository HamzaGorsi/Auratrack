import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const { username } = body;

  const user =
    await prisma.user.findUnique({
      where: {
        username,
      },
    });

  if (!user) {
    return Response.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  const notifications =
    await prisma.notification.findMany({
      where: {
        userId: user.id,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 20,
    });

  return Response.json(
    notifications
  );
}