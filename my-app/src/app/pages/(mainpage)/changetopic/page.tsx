"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const ChangeTopic = () => {
  const { data: session } = useSession();
  const [requestList, setRequestList] = useState([
    <div
      key={1}
      className="flex bg-white p-3 m-auto mt-4 rounded-xl border-slate-300 justify-around"
    >
      <p>Tên đề tài mới</p>
      <p>Giáo viên hướng dẫn</p>
      <p>Trạng thái</p>
    </div>,
  ]);
  function handleClick() {
    setRequestList(
      requestList.concat(
        <div className="flex bg-white p-3 m-auto mt-4 rounded-xl border-slate-300 justify-around">
          <p>Tên đề tài mới</p>
          <p>Giáo viên hướng dẫn</p>
          <p>Trạng thái</p>
        </div>
      )
    );
  }
  return (
    <div className="flex w-4/5 m-auto justify-center content-center flex-col">
      <div className="bg-white p-5 my-2 rounded-xl border-slate-300 ">
        <p>Đề tài đang thực hiện: Quản lý khóa luận tốt nghiệp</p>
        <p>Giáo viên hướng dẫn: Thầy Trọng</p>
        <p>{session?.user?.account_type}</p>
      </div>
      <button
        className="bg-slate-500 w-1/5 m-auto p-4 my-10 rounded-md text-white"
        onClick={handleClick}
      >
        Nộp đơn ĐTĐT
      </button>
      <div id="container" className="h-80 overflow-auto">
        {requestList}
      </div>
    </div>
  );
};

export default ChangeTopic;
