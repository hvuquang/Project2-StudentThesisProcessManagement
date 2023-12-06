"use client";
import React from "react";
import { DeadlineItem } from "./deadline-item";
import { DeadlineItemObj } from "../types/types";

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
  return (
    <div className="flex flex-col gap-3 overflow-y-visible">
      {EXAMPLE_ARRAY.map((deadline) => {
        return <DeadlineItem deadline={deadline} />;
      })}
    </div>
  );
};
