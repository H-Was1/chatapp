import { getCurrentUser } from "@/app/lib/action/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
import prismadb from "@/app/lib/prismadb";

interface Params {
  conversationId?: string;
}

export async function POST(req: Request, { params }: { params: Params }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // const body = await req.json();
    const conversation = await prismadb.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });
    if (!conversation) {
      return new NextResponse("Invalid id", { status: 400 });
    }
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }
    const updatedMessage = await prismadb.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });
    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.log(error, "Error_MESSAGE_SEEN");

    return new NextResponse("internal error", { status: 500 });
  }
}
