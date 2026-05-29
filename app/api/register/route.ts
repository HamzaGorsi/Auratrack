import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      password,
      username,
    } = body;

    const existing =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existing) {
      return Response.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashed =
      await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        username,
      },
    });

    // CREATE PLAYER PROFILE
    await prisma.player.create({
      data: {
        username,
        platform: "RIOT",

        userId: user.id,
      },
    });

    return Response.json(user);

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Registration failed",
      },
      {
        status: 500,
      }
    );
  }
}