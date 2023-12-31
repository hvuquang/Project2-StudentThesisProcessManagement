"use client";
import {
  GETgetAllRegisterTopic,
  PUTTeacherConfirmRequestChangeTopic,
} from "@/app/api/topic-api";
import { RegisteredTopic } from "@/app/types/types";
import { Button } from "@/components/ui/button/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ChangeTopic = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const allRegisterTopic = useQuery({
    queryKey: ["registeredTopics"],
    queryFn: GETgetAllRegisterTopic,
  });
  // let topic: RegisteredTopic[] = [];
  const teacherConfirmRequestChangeTopic = useMutation({
    mutationFn: ({ student_id }: { student_id: string }) => {
      return PUTTeacherConfirmRequestChangeTopic({ student_id });
    },
    onSuccess: () => {
      toast.success("Chấp thuận yêu cầu ĐTĐT thành công");
      queryClient.invalidateQueries({ queryKey: ["registeredTopics"] });
    },
    onError: (err) => {
      toast.error("Chấp thuận yêu cầu ĐTĐT thất bại: " + err);
    },
  });
  useEffect(() => {
    if (allRegisterTopic.data) {
      setTopic(
        allRegisterTopic.data.filter((item: RegisteredTopic) => {
          return item.change_topic === "chờ gv xác nhận";
        })
      );
    }
  }, [allRegisterTopic.data]);
  const [filteredTopics, setTopic] = useState<RegisteredTopic[]>([]);
  const renderListChangeTopicFromStudent = () => {
    if (filteredTopics.length > 0) {
      console.log(filteredTopics);
      return filteredTopics.map((item: RegisteredTopic) => {
        return (
          <div className="flex justify-between border-2 p-5 rounded-md hover:cursor-pointer hover:border-indigo-500 transition-all delay-100 duration-300">
            <div>
              <p>Họ tên: {item.ma_sv?.fullname}</p>
              <p>Email: {item.ma_sv?.email}</p>
              <p>Đề tài cũ: {item.id_topic}</p>
              <p>Đề tài mới muốn đổi: {item.id_new_topic?.topic_name}</p>
            </div>
            <div className="flex flex-col gap-5">
              <Button
                type="submit"
                variant={"default"}
                onClick={() => {
                  teacherConfirmRequestChangeTopic.mutate({
                    student_id: item.ma_sv?._id || "",
                  });
                }}
              >
                Chấp thuận
              </Button>
              <Button
                type="submit"
                variant={"outline"}
                // onClick={() => {
                //   studentRequestChangeTopic.mutate({
                //     student_id: session!.user?._id || "",
                //     new_topic_id: topicItem._id || "",
                //   });
                // }}
              >
                Từ chối
              </Button>
            </div>
          </div>
        );
      });
    } else return <></>;
  };
  return (
    <div className="flex w-4/5 m-auto justify-center content-center flex-col">
      {session?.user?.account_type === "gv" && (
        <h1 className="text-center text-2xl my-10 uppercase">
          Danh sách sinh viên muốn ĐTĐT
        </h1>
      )}
      <div id="container" className="h-80 overflow-auto overflow-y-auto">
        {/* {requestList} */}
        {session?.user?.account_type === "gv" &&
          renderListChangeTopicFromStudent()}
      </div>
    </div>
  );
};

export default ChangeTopic;
