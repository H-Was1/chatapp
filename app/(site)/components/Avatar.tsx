"use client";
import useActiveList from "@/app/lib/action/useActiveList";
import { User } from "next-auth";
import Image from "next/image";
import user from "pusher-js/types/src/core/user";
import React from "react";
interface avatarProps {
  user?: User;
}
function Avatar({ user }: avatarProps) {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image
          src={user?.image || "/images/placeholder.jpg"}
          alt="avatar"
          fill
        ></Image>
      </div>
      {isActive && (
        <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3"></span>
      )}
    </div>
  );
}

export default Avatar;
