"use client";
import useConversation from "@/hooks/use-conversation";
import { fullMessageType } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";

interface Props {
  initialMessages: fullMessageType[];
}

const Body: React.FC<Props> = ({ initialMessages }) => {
  const [Messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();
  // ----------- Handlers ----------------------------------------

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {Messages.map((message, i) => (
        <MessageBox
          key={message.id}
          isLast={i === Messages.length - 1}
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef}></div>
    </div>
  );
};

export default Body;
