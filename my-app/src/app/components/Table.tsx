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
import { Input } from "@/components/ui/form/inputs/input/Input";
import {
  DELETEdeleteTopic,
  GETgetAllTopic,
  POSTregisterTopic,
  PUTupdateTopic,
} from "../api/topic-api";
import { Topic } from "../types/types";
import Link from "next/link";
import axios from "axios";
// import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button/Button";
import { Label } from "@/components/ui/label/Label";
import { Dropdown } from "@nextui-org/react";
import { TextArea } from "@/components/ui/form";

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

  const updateTopicMutation = useMutation({
    mutationFn: (topic: Topic) => {
      return PUTupdateTopic(topic);
    },
    onSuccess: () => {
      toast.success("Update successfully");
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
    onError: (err) => {
      toast.error("Error: " + err);
    },
  });

  const registerTopicMutation = useMutation({
    mutationFn: ({
      student_id,
      topic_id,
    }: {
      student_id: string;
      topic_id: string;
    }) => {
      return POSTregisterTopic(student_id, topic_id);
    },
    onSuccess: () => {
      toast.success("Đăng ký thành công");
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
    onError: (err) => {
      toast.error("Đăng ký thất bại: " + err);
    },
  });

  const [modal, setModal] = useState(false);
  const { data: session } = useSession();
  const [topics, setTopics] = useState<Topic[]>([]);
  const { isLoading, error, data } = useQuery({
    queryKey: ["topics"],
    queryFn: GETgetAllTopic,
  });

  let [topic, setTopic] = useState<Topic>({
    topic_name: "",
    topic_description: "",
    _id: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTopicMutation.mutate(topic);
    return;
  };
  const handleChange = (
    topic_name?: string,
    topic_description?: string,
    topic_id?: string
  ) => {
    setTopic({
      topic_name: topic_name ?? topic.topic_name,
      topic_description: topic_description ?? topic.topic_description,
      _id: topic_id,
    });
  };
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
        <ButtonDashboard className="justify-end " />
      )}
      {/* <div className="flex flex-col gap-3 m-auto pt-8"></div> */}
      <Table className="mx-auto h-96 w-full text-default overflow-auto mt-5">
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
          {data?.map((topicItem: Topic) => (
            <TableRow key={topicItem._id}>
              <TableCell className="text-center">
                {topicItem.topic_name}
              </TableCell>
              <TableCell className="text-center">
                {topicItem.ma_gv?.fullname}
              </TableCell>

              <TableCell className="text-center">
                <div className="text-indigo-600 hover:underline">
                  <Dialog>
                    <DialogTrigger>Chi tiết</DialogTrigger>
                    <DialogContent className="min-w-[35rem] pt-5 px-3 md:max-w-[40rem]">
                      <DialogHeader title="Cập nhật đề tài KLTN" />
                      <form
                        className="grid gap-4 py-4"
                        onSubmit={(e) => handleSubmit(e)}
                      >
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Tên đề tài
                          </Label>
                          <Input
                            readOnly
                            id="name"
                            defaultValue={topicItem.topic_name}
                            className="col-span-3"
                            onChange={(e) => {
                              handleChange(
                                e.target.value,
                                undefined,
                                topicItem._id ?? ""
                              );
                            }}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Nội dung đề tài
                          </Label>

                          <Input
                            readOnly
                            id="username"
                            defaultValue={topicItem.topic_description}
                            className="col-span-3"
                            onChange={(e) => {
                              handleChange(
                                undefined,
                                e.target.value,
                                topicItem._id ?? ""
                              );
                            }}
                          />
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
              {session?.user?.account_type === "gv" && (
                <TableCell className="text-center">
                  {topicItem.trang_thai}
                </TableCell>
              )}
              {session?.user?.account_type === "sv" && (
                <TableCell className="text-center">
                  {topicItem.trang_thai === "Đã đăng ký" ? (
                    topicItem.trang_thai
                  ) : (
                    <Button
                      type="submit"
                      variant={"default"}
                      onClick={() => {
                        registerTopicMutation.mutate({
                          student_id: session!.user?._id || "",
                          topic_id: topicItem._id || "",
                        });
                      }}
                    >
                      Đăng ký
                    </Button>
                  )}
                </TableCell>
              )}

              {/* <TableCell className="text-center">Chỉnh sửa</TableCell> */}

              <TableCell className="text-center">
                {session?.user?.account_type === "gv" &&
                  topicItem.ma_gv?.email === session?.user?.email && (
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger>Chỉnh sửa</DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {/* <DropdownMenuItem> */}
                          <DropdownMenuItem
                            onClick={() => {
                              setTopic({
                                topic_name: topicItem.topic_name,
                                topic_description: topicItem.topic_description,
                                _id: topicItem._id,
                              });
                              setModal(!modal);
                            }}
                          >
                            Chỉnh sửa
                          </DropdownMenuItem>
                          {/* </DropdownMenuItem> */}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              delTopicMutation.mutate(topicItem._id ?? "");
                            }}
                            className="text-white bg-red-500 hover:bg-red-600 focus:text-none focus:bg-red-600"
                          >
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Dialog
                        key={topicItem._id}
                        open={topicItem._id === topic._id && modal}
                        onOpenChange={() => {
                          setModal(!modal);
                        }}
                      >
                        {/* <DialogTrigger>
                            <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                          </DialogTrigger> */}
                        <DialogContent className="min-w-[35rem] pt-5 px-3 md:max-w-[40rem]">
                          <DialogHeader title="Cập nhật đề tài KLTN" />
                          <form
                            className="grid gap-4 py-4"
                            onSubmit={(e) => handleSubmit(e)}
                          >
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Tên đề tài
                              </Label>
                              <Input
                                id="name"
                                defaultValue={topicItem.topic_name}
                                className="col-span-3"
                                onChange={(e) => {
                                  handleChange(
                                    e.target.value,
                                    undefined,
                                    topicItem._id ?? ""
                                  );
                                }}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="username" className="text-right">
                                Nội dung đề tài
                              </Label>
                              <Input
                                id="username"
                                defaultValue={topicItem.topic_description}
                                className="col-span-3"
                                onChange={(e) => {
                                  handleChange(
                                    undefined,
                                    e.target.value,
                                    topicItem._id ?? ""
                                  );
                                }}
                              />
                            </div>
                            <DialogFooter>
                              <Button type="submit" variant={"secondary"}>
                                Cập nhật đề tài
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                {/* {session?.user?.account_type === "sv" && (
                  <div>
                    <Button
                      type="submit"
                      variant={"default"}
                      onClick={() => {
                        registerTopicMutation.mutate({
                          student_id: session.user?._id || "",
                          topic_id: topicItem._id || "",
                        });
                      }}
                    >
                      Đăng ký
                    </Button>
                  </div>
                )} */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
