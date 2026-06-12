import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session: any =
  await getServerSession(authOptions);

  if (!session?.user) {
  return Response.json(
    [],
    { status: 401 }
  );
}

const user =
  await prisma.user.findFirst({
    where: {
      id: (session.user as any).id,
    },
  });

  if (!user) {
    return Response.json([]);
  }

  const requests =
    await prisma.friendRequest.findMany({
      where: {
        receiverId: user.id,
        status: "PENDING",
      },

      include: {
        sender: {
          select: {
            username: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return Response.json(requests);
}