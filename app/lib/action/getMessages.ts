"use server";

import prismadb from "../prismadb";

const getMessages = async (conversationId: string) => {
  try {
    const messages = await prismadb.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return messages;
  } catch (error) {
    return [];
  }
};
export default getMessages;
