import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.searchHistory.delete({
      where: {
        id,
      },
    });

    return Response.json({
      success: true,
    });
  } catch {
    return Response.json(
      {
        error: "Failed to delete search",
      },
      {
        status: 500,
      }
    );
  }
}