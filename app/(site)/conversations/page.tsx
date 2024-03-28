"use client";
import EmptyState from "@/app/components/EmptyState";
import useConversation from "@/hooks/use-conversation";
import clsx from "clsx";
import React from "react";

function Home() {
  const { isOpen } = useConversation();
  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
}

export default Home;
