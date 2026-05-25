import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session: any =
      await getServerSession(
        authOptions
      );

    if (!session?.user?.email) {
      return NextResponse.json(
        [],
      );
    }

    const user =
      await prisma.user.findUnique({
        where: {
          email:
            session.user.email,
        },

        include: {
          connectedAccounts: true,
        },
      });

    return NextResponse.json(
      user?.connectedAccounts ||
        []
    );
  } catch {
    return NextResponse.json(
      [],
    );
  }
}