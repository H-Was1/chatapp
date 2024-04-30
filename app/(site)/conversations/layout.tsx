import React from "react";
import SideBar from "../components/SideBar";
import ConversationList from "../components/ConversationList";
import getConversations from "@/app/lib/action/getConversations";
import getUsers from "@/app/lib/action/getUsers";

async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    <SideBar>
      <div className="h-full">
        <ConversationList initialItems={conversations} users={users} />
        {children}
      </div>
    </SideBar>
  );
}

export default ConversationsLayout;
