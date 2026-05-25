import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function POST(
  req: Request
) {
  try {
    const session: any =
      await getServerSession(
        authOptions
      );

    if (
      !session?.user?.username
    ) {
      return Response.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await req.json();

    const {
      username,
      email,
    } = body;

    const updatedUser =
      await prisma.user.update({
        where: {
          username:
            session.user.username,
        },

        data: {
          username,
          email,
        },
      });

    return Response.json(
      updatedUser
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Failed to update settings",
      },
      {
        status: 500,
      }
    );
  }
}