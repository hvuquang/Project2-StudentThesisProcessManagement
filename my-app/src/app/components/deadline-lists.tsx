"use client";
import React, { useEffect, useState } from "react";
import { DeadlineItem } from "./deadline-item";
import { DeadlineItemObj } from "../types/types";
import { useSession } from "next-auth/react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { GETgetAllRegisterTopic } from "@/app/api/topic-api";
import { RegisteredTopic } from "@/app/types/types";
import { GETgetDeadlineByID } from "../api/deadline-api";
const EXAMPLE_ARRAY: DeadlineItemObj[] = [
  {
    tieu_de: "Nộp bài tập thực hành 01",
    noi_dung:
      "Sinh viên làm các bài tập thực hành trong file đính kèm và nộp theo quy định sau: Tên thư mục theo quy tắc: BTTuan01_MSSV_HoVaTen",
    ngay_bat_dau: "30/7",
    ngay_ket_thuc: "30/7",
    file: "",
    ma_gv: "thay trong",
  },
  {
    tieu_de: "Nộp bài tập thực hành 02",
    noi_dung:
      "Sinh viên làm các bài tập thực hành trong file đính kèm và nộp theo quy định sau: Tên thư mục theo quy tắc: BTTuan01_MSSV_HoVaTen",
    ngay_bat_dau: "30/7",
    ngay_ket_thuc: "30/7",
    file: "",
    ma_gv: "thay trong",
  },
  {
    tieu_de: "Nộp bài tập thực hành 03",
    noi_dung:
      "Sinh viên làm các bài tập thực hành trong file đính kèm và nộp theo quy định sau: Tên thư mục theo quy tắc: BTTuan01_MSSV_HoVaTen",
    ngay_bat_dau: "30/7",
    ngay_ket_thuc: "30/7",
    file: "",
    ma_gv: "thay trong",
  },
  {
    tieu_de: "Nộp bài tập thực hành 04",
    noi_dung:
      "Sinh viên làm các bài tập thực hành trong file đính kèm và nộp theo quy định sau: Tên thư mục theo quy tắc: BTTuan01_MSSV_HoVaTen",
    ngay_bat_dau: "30/7",
    ngay_ket_thuc: "30/7",
    file: "",
    ma_gv: "thay trong",
  },
  {
    tieu_de: "Nộp bài tập thực hành 05",
    noi_dung:
      "Sinh viên làm các bài tập thực hành trong file đính kèm và nộp theo quy định sau: Tên thư mục theo quy tắc: BTTuan01_MSSV_HoVaTen",
    ngay_bat_dau: "30/7",
    ngay_ket_thuc: "30/7",
    file: "",
    ma_gv: "thay trong",
  },
];
export const DeadlineList = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [deadlineList, setDeadlineList] = useState<string[]>();
  const [doneDeadline, setDoneDeadline] = useState<string[]>();
  const { isLoading, error, data } = useQuery({
    queryKey: ["registeredTopics"],
    queryFn: GETgetAllRegisterTopic,
  });
  const [registeredTopic, setRegisteredTopic] = useState<RegisteredTopic[]>();

  function getRegisteredTopic() {
    data.map((item: RegisteredTopic) => {
      let arr: RegisteredTopic[] = [];
      if (item.ma_sv?._id === session!.user!._id) {
        arr.push(item);
      }
      setRegisteredTopic(arr);
      getDeadlineFromRegisteredTopic(arr);
    });
  }

  function getDeadlineFromRegisteredTopic(arr: RegisteredTopic[]) {
    arr?.map((item) => {
      setDeadlineList(item.id_deadlines);
      setDoneDeadline(item.deadlines_done);
      console.log("Danh sách deadline: " + item.id_deadlines);
    });
  }

  useEffect(() => {
    async function fetchData() {
      if (session?.user?.account_type === "sv") {
        await getRegisteredTopic();
      }
      console.log(data);
    }
    fetchData();
  }, [data]);

  return (
    <div className="flex flex-col gap-3 overflow-y-visible">
      <p>Deadline chưa hoàn thành</p>
      {deadlineList?.map((item) => {
        return (
          <div>
            <DeadlineItem id={item} status="pending" />
          </div>
        );
      })}
      <div className="mb-5 border w-full h-[1px]"></div>
      <p>Deadline đã hoàn thành</p>
      {doneDeadline?.map((item) => {
        return (
          <div>
            <DeadlineItem id={item} status="fullfilled" />
          </div>
        );
      })}
    </div>
  );
};
