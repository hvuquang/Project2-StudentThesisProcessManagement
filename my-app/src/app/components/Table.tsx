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
  GETgetAllRegisterTopic,
  GETgetAllTopic,
  POSTregisterTopic,
  PUTStudentRequestChangeTopic,
  PUTupdateTopic,
} from "../api/topic-api";
import { RegisteredTopic, Topic } from "../types/types";
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
import { GETgetASingleAccount } from "../api/account";

export function CustomTable({ className }: { className?: string }) {
  const queryClient = useQueryClient();
  const [teacher, setTeacher] = useState("");
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

  const studentRequestChangeTopic = useMutation({
    mutationFn: ({
      student_id,
      new_topic_id,
    }: {
      student_id: string;
      new_topic_id: string;
    }) => {
      return PUTStudentRequestChangeTopic({ student_id, new_topic_id });
    },
    onSuccess: () => {
      toast.success("Gửi yêu cầu ĐTĐT thành công");
      // queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
    onError: (err) => {
      toast.error("Gửi yêu cầu ĐTĐT thất bại: " + err);
    },
  });

  // const [studentTopic, setStudentTopic] = useState<RegisteredTopic>();
  const [modal, setModal] = useState(false);
  const { data: session } = useSession();
  const { data } = useQuery({
    queryKey: ["topics"],
    queryFn: GETgetAllTopic,
  });

  const allRegisterTopic = useQuery({
    queryKey: ["registeredTopics"],
    queryFn: GETgetAllRegisterTopic,
  });

  // const singleAccount = useQuery({
  //   queryKey: ["account"],
  //   queryFn: () => GETgetASingleAccount,
  // });

  useEffect(() => {
    console.log("from dashboard: " + allRegisterTopic.data);
  }, [allRegisterTopic.data]);

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
  let firstTopic: RegisteredTopic = {};
  const renderRegisterTopic = () => {
    if (session?.user?.account_type === "gv") return <></>;
    let matchingTopics = [];
    if (allRegisterTopic && allRegisterTopic.data) {
      matchingTopics = allRegisterTopic.data.filter((item: RegisteredTopic) => {
        return item.ma_sv?._id === session?.user?._id && item.active;
      });
      console.log("Topic đăng ký:");
      console.log(matchingTopics);
    }
    if (matchingTopics.length > 0) {
      const teacherName = GETgetASingleAccount(matchingTopics[0].ma_gv);
      console.log(teacherName);
      //   .then((res) => {
      //     console.log(res);
      //     setTeacher(res);
      //     return res;
      //   })
      //   .catch((err) => {
      //     throw err;
      //   });
      firstTopic = matchingTopics[0];
      // setStudentTopic(firstTopic);
      return (
        <div className="bg-white p-5 my-2 rounded-xl border border-slate-300 text-black">
          <p>
            <span className="font-semibold">Đề tài đang thực hiện: </span>
            {matchingTopics[0].topic_name ?? ""}
          </p>
          <p>
            <span className="font-semibold">Giảng viên phụ trách: </span>
            {/* {teacherName.fullname ?? ""} */}
          </p>
          <p>
            <span className="font-semibold">Điểm: </span>
            {matchingTopics[0].score ?? ""}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderButton = (topicItem: Topic) => {
    // sinh viên đã đky topic
    if (firstTopic.topic_name && firstTopic.active === true) {
      console.log(firstTopic);
      if (
        firstTopic.id_topic === topicItem._id &&
        topicItem.trang_thai !== "Chưa đăng ký"
      ) {
        return <p className="text-green-500">Đang đăng ký</p>;
      } else if (topicItem.trang_thai === "Đã đăng ký")
        return <p>Đã đăng ký</p>;
      // else if (topicItem.trang_thai === "Chưa đăng ký") return <p>Đăng ký</p>;
      return (
        <Button
          type="submit"
          variant={"default"}
          onClick={() => {
            studentRequestChangeTopic.mutate({
              student_id: session!.user?._id || "",
              new_topic_id: topicItem._id || "",
            });
          }}
        >
          ĐTĐT
        </Button>
      );
    } else if (topicItem.trang_thai === "Đã đăng ký") {
      return <p>Đã đăng ký</p>;
    } else {
      // sinh viên chưa đky đề tài
      return (
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
      );
    }
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
      title: "Chi tiết",
    },
    {
      key: 3,
      title: "Trạng thái đăng ký",
    },
    {
      key: 4,
      title: "Điểm",
    },
    {
      key: 5,
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
      {renderRegisterTopic()}
      {/* <div className="flex flex-col gap-3 m-auto pt-8"></div> */}
      <Table className="mx-auto w-full text-default mt-5">
        <TableHeader className="[&_tr]:bg-info">
          <TableRow className=" text-center">
            {filteredTableHeadItems.map((item) => (
              <TableHead className="text-center" key={item.key}>
                {item.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="max-h-[120px] overflow-y-auto">
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
                  {/* {topicItem.trang_thai === "Đã đăng ký" ? (
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
                  )} */}
                  {renderButton(topicItem)}
                </TableCell>
              )}

              <TableCell className="text-center">
                {topicItem.score ?? ""}
              </TableCell>

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
