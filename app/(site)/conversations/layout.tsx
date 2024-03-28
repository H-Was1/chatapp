import React from "react";
import SideBar from "../components/SideBar";
import ConversationList from "../components/ConversationList";
import getConversations from "@/app/lib/action/getConversations";

async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  return (
    <SideBar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </SideBar>
  );
}

export default ConversationsLayout;
