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
  GETgetAllRegisterTopicsByTeacherId,
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
import InputWithIcons from "./input-icon";

export function CustomTable({
  className,
  type,
}: {
  className?: string;
  type?: string;
}) {
  const queryClient = useQueryClient();

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

  const [thesis, setThesis] = useState<RegisteredTopic[]>([]);
  async function getThesisByIDTeacher() {
    if (session?.user?._id) {
      // getThesis(session.user._id);
      const data = await GETgetAllRegisterTopicsByTeacherId(
        session.user._id
      ).then((res) => {
        setThesis(res);
        console.log(res);
      });
      return data;
    }
  }

  const renderScoreComponent = (topicItem: RegisteredTopic) => {
    return (
      <div>
        {topicItem.score === "Chưa có kết quả" ? (
          <InputWithIcons
            thesis_id={topicItem._id!}
            getData={getThesisByIDTeacher}
          />
        ) : (
          topicItem.score
        )}
      </div>
    );
  };

  useEffect(() => {
    getThesisByIDTeacher();
    // console.log("from dashboard: " + allRegisterTopic.data);
  }, []);

  let [topic, setTopic] = useState<Topic>({
    topic_name: "",
    topic_description: "",
    _id: "",
  });
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
      title: "Tên sinh viên",
    },
    {
      key: 2,
      title: "Email sinh viên",
    },
    {
      key: 3,
      title: "Điểm",
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
      <h1 className="text-center text-2xl8 text-black mt-5">
        DANH SÁCH CÁC SINH VIÊN ĐĂNG KÝ ĐỀ TÀI ĐỒ ÁN TỐT NGHIỆP CỦA GIẢNG VIÊN
      </h1>
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
          {thesis?.map((topicItem: RegisteredTopic) => (
            <TableRow key={topicItem._id}>
              <TableCell className="text-center">
                {topicItem.topic_name}
              </TableCell>
              <TableCell className="text-center">
                {topicItem.ma_sv?.fullname}
              </TableCell>
              <TableCell className="text-center">
                {topicItem.ma_sv?.email}
              </TableCell>
              {session?.user?.account_type === "gv" && (
                <TableCell className="text-center">
                  {renderScoreComponent(topicItem)}
                </TableCell>
              )}
              {/*  */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
