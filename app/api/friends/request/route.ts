import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    senderUsername,
    receiverUsername,
  } = body;

  const sender =
    await prisma.user.findUnique({
      where: {
        username: senderUsername,
      },
    });

  const receiver =
    await prisma.user.findUnique({
      where: {
        username: receiverUsername,
      },
    });

  if (!sender || !receiver) {
    return Response.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  const existing =
    await prisma.friendRequest.findFirst({
      where: {
        senderId: sender.id,

        receiverId: receiver.id,
      },
    });

  if (existing) {
    return Response.json(
      {
        error:
          "Request already exists",
      },
      { status: 400 }
    );
  }

  const request =
    await prisma.friendRequest.create({
      data: {
        senderId: sender.id,

        receiverId: receiver.id,
      },
    });

  // NOTIFICATION
  await prisma.notification.create({
    data: {
      type: "FRIEND_REQUEST",

      message: `${sender.username} sent you a friend request`,

      userId: receiver.id,
    },
  });

  // LIVE ACTIVITY
  await prisma.activity.create({
    data: {
      type: "SOCIAL",

      message: `${sender.username} sent a friend request to ${receiver.username}`,
    },
  });

  return Response.json(request);
}