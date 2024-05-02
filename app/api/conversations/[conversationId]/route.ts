interface Params {
  conversationId?: string;
}

import { getCurrentUser } from "@/app/lib/action/getCurrentUser";
import { NextResponse } from "next/server";
import prismadb from "@/app/lib/prismadb";
import { pusherServer } from "@/app/lib/pusher";

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const existingConversation = await prismadb.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    if (!existingConversation) {
      return new NextResponse("Invalid id", { status: 400 });
    }
    const deletedConversation = await prismadb.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });
    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          "conversation:remove",
          existingConversation
        );
      }
    });
    return NextResponse.json(deletedConversation);
  } catch (error) {
    return new NextResponse("internal error", { status: 500 });
  }
}
