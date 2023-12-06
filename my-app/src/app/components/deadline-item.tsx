"use client";
import { Button } from "@/components/ui/button/Button";
import React from "react";

import { DeadlineItemObj } from "../types/types";
import { useRouter } from "next/navigation";

export const DeadlineItem = ({ deadline }: { deadline: DeadlineItemObj }) => {
  const ROUTER = useRouter();
  return (
    <div className="pl-5 pr-2">
      <Button
        className="text-md text-indigo-600 p-0 font-semibold"
        variant={"link"}
        content={deadline.tieu_de}
        onClick={() => {
          ROUTER.push(`/pages/deadlinepage/${deadline.tieu_de}`);
        }}
      >
        {deadline.tieu_de}
      </Button>
      <p className=" text-sm pl-2">{deadline.noi_dung}</p>
    </div>
  );
};
