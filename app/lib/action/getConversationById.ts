"use server";

import prismadb from "../prismadb";
import { getCurrentUser } from "./getCurrentUser";

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) return null;
    const conversation = await prismadb.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    return conversation;
  } catch (error) {
    return null;
  }
};
export default getConversationById;