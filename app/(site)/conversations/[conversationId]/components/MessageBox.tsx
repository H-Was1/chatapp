"use client";
import Avatar from "@/app/(site)/components/Avatar";
import { fullMessageType } from "@/types";
import clsx from "clsx";
import { format } from "date-fns/format";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import ImageModal from "./ImageModal";

interface Props {
  data: fullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<Props> = ({ data, isLast }) => {
  const session = useSession();
  const isOwn = session?.data?.user?.email === data.sender.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data.sender.email)
    .map((user) => user.name)
    .join(", ");
  const [imageModalOpen, setImageModalOpen] = useState(false);
  // ----------------- clsx ---------------------------------------

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-400 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );
  // ------------------ Handlers ---------------------------------

  // --------------------- JSX ------------------------------------
  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.image ? (
            <Image
              src={data.image}
              alt="Image"
              height={288}
              width={288}
              onClick={() => setImageModalOpen(true)}
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            ></Image>
          ) : (
            <div className="">{data.body}</div>
          )}
        </div>
        {isLast && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
