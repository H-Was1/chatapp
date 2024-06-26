"use client";
import { User } from "@prisma/client";
import axios from "axios";
import React, { useCallback, useState } from "react";
import Avatar from "./Avatar";
import { useRouter } from "next/navigation";
import LoadingModal from "./LoadingModal";

interface Props {
  data: User;
}

const UserBox: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [data, router]);

  return (
    <>
      {IsLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="w-full relative flex gap-2 items-center skew-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
