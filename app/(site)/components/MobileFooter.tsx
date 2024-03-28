"use client";

import useRoutes from "@/hooks/useRoutes";
import React, { useState } from "react";
import MobileItem from "./MobileItem";

function MobileFooter() {
  const routes = useRoutes();
  const [IsOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed w-full justify-between bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
      {routes.map((route) => (
        <MobileItem
          key={route.label}
          href={route.href}
          active={route.active}
          onClick={route.onClick}
          Icon={route.icon}
        />
      ))}
    </div>
  );
}

export default MobileFooter;
