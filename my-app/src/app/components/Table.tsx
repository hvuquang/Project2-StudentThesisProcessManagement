"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/TableNew";
import { useSession } from "next-auth/react";
import { ButtonDashboard } from "./button-dashboard";
import { DELETEdeleteTopic, GETgetAllTopic } from "../api/topic-api";
import { Topic } from "../types/types";
import Link from "next/link";
import axios from "axios";
// import { useSession } from "next-auth/react";
import { url } from "@/app/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function CustomTable({ className }: { className?: string }) {
  const queryClient = useQueryClient();
  const delTopicMutation = useMutation({
    mutationFn: (topic_id: string) => {
      return DELETEdeleteTopic(topic_id);
    },
    onSuccess: () => {
      toast.success("Xóa thành công");
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });

  const { data: session } = useSession();
  const [topics, setTopics] = useState<Topic[]>([]);
  const { isLoading, error, data } = useQuery({
    queryKey: ["topics"],
    queryFn: GETgetAllTopic,
  });

  const TABLE_HEAD_ITEMS = [
    {
      key: 0,
      title: "Tên đề tài",
    },
    {
      key: 1,
      title: "Giáo viên đăng ký",
    },
    {
      key: 2,
      title: "Trạng thái đăng ký",
    },
    {
      key: 3,
      title: "Chi tiết",
    },
    {
      key: 4,
      title: "Chỉnh sửa",
    },
  ];
  //* for each item, if it not 4, it will be included in the new array
  const filteredTableHeadItems =
    session?.user?.account_type === "gv"
      ? TABLE_HEAD_ITEMS
      : TABLE_HEAD_ITEMS.filter((item) => item.key !== 4);
  return (
    <div className={cn("mx-auto", className)}>
      {session?.user?.account_type === "gv" && (
        <ButtonDashboard className="justify-end" />
      )}
      {/* <div className="flex flex-col gap-3 m-auto pt-8"></div> */}
      <Table className="mx-auto w-full text-default">
        <TableHeader className="[&_tr]:bg-info">
          <TableRow className=" text-center">
            {filteredTableHeadItems.map((item) => (
              <TableHead className="text-center" key={item.key}>
                {item.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((topic: Topic) => (
            <TableRow key={topic.topic_name}>
              <TableCell className="text-center">{topic.topic_name}</TableCell>
              <TableCell className="text-center">
                {topic.ma_gv?.fullname}
              </TableCell>
              <TableCell className="text-center">{topic.trang_thai}</TableCell>
              <TableCell className="text-center">
                <Link className="text-indigo-600 hover:underline" href="#">
                  Chi tiết
                </Link>
              </TableCell>

              {/* <TableCell className="text-center">Chỉnh sửa</TableCell> */}

              <TableCell className="text-center">
                {session?.user?.account_type === "gv" &&
                  topic.ma_gv?.email === session?.user?.email && (
                    // <Button>Chỉnh sửa</Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger>Chỉnh sửa</DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {/* <DropdownMenuLabel>Chỉnh sửa</DropdownMenuLabel> */}
                        <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            delTopicMutation.mutate(topic._id ?? "");
                          }}
                          className="text-white bg-red-500 hover:bg-red-600 focus:text-none focus:bg-red-600"
                        >
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
