import EmptyState from "@/app/components/EmptyState";
import React from "react";

function Page() {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState />
    </div>
  );
}

export default Page;
