import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function POST(
  req: Request
) {
  const session: any =
  await getServerSession(
    authOptions
  );
  console.log(session);

  if (!session?.user?.username) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const {
    bio,
    favoriteGame,
    avatarUrl,
    bannerUrl,
  } = body;

  const user =
    await prisma.user.update({
      where: {
  username:
    session.user.username
      },

      data: {
        bio,
        favoriteGame,
        avatarUrl,
        bannerUrl,
      },
    });

  return Response.json(user);
}