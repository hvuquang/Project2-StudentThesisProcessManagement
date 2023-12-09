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
import { GETgetAllTopic } from "../api/topic-api";
import { Topic } from "../types/types";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function CustomTable({ className }: { className?: string }) {
  const { data: session } = useSession();
  const [topics, setTopics] = useState<Topic[]>([]);

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

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topicsData = await GETgetAllTopic();
        setTopics(topicsData);
        console.log(topicsData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTopics();
  }, []);
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
          {topics.map((topic) => (
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
                        <DropdownMenuItem className="text-white bg-red-500 hover:bg-red-600 focus:text-none focus:bg-red-600">
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
