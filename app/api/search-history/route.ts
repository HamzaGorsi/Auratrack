import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session =
    await getServerSession(authOptions);

  if (!session) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const user =
    await prisma.user.findFirst();

  if (!user) {
    return Response.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  const body: {
    username: string;
    platform: string;
  } = await req.json();

  await prisma.searchHistory.deleteMany({
    where: {
      userId: user.id,
      username: body.username,
      platform: body.platform,
    },
  });

  const history =
    await prisma.searchHistory.create({
      data: {
        username: body.username,
        platform: body.platform,
        userId: user.id,
      },
    });

  return Response.json(history);
}