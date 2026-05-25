import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const searches =
      await prisma.searchHistory.findMany({
        orderBy: {
          createdAt: "desc",
        },

        take: 6,
      });

    return NextResponse.json(searches);
  } catch {
    return NextResponse.json(
      {
        error:
          "Failed to fetch searches",
      },
      {
        status: 500,
      }
    );
  }
}