import EmptyState from "@/app/components/EmptyState";
import getConversationById from "@/app/lib/action/getConversationById";
import getMessages from "@/app/lib/action/getMessages";
import React from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import DForm from "./components/DForm";

const page = async ({
  params,
}: {
  params: {
    conversationId: string;
  };
}) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body />
        <DForm />
      </div>
    </div>
  );
};

export default page;
