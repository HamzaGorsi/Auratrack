import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function GET() {
  const session: any =
    await getServerSession(
      authOptions
    );

  if (
    !session?.user?.username
  ) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const user =
    await prisma.user.findUnique({
      where: {
        username:
          session.user.username,
      },
    });

  return Response.json(user);
}