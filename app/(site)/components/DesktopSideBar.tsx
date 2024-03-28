"use client";

import useRoutes from "@/hooks/useRoutes";
import React, { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import Avatar from "./Avatar";

interface DesktopSideBarProps {
  currentUser: User;
}

function DesktopSideBar({ currentUser }: DesktopSideBarProps) {
  const routes = useRoutes();
  const [IsOpen, setIsOpen] = useState(false);
  // console.log(currentUser);

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-20 lg:w-20 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col xl:px-6 justify-between">
      <nav className="mt-4 flex flex-col justify-between">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {routes.map((item) => (
            <DesktopItem
              key={item.label}
              href={item.href}
              label={item.label}
              active={item.active}
              onClick={item.onClick}
              Icon={item.icon}
            />
          ))}
        </ul>
      </nav>
      <nav className="mt-4 flex justify-between items-center">
        <div
          className="cursor-pointer hover:opacity-75 transition"
          onClick={() => setIsOpen(true)}
        >
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
}

export default DesktopSideBar;
