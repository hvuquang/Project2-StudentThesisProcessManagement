import React from "react";
import "./layout.css";

const Dashboard = () => {
  return (
    <div>
      <p className="text-center font-extrabold my-7 text-2xl">
        TRANG ĐĂNG KÝ KHÓA LUẬN TỐT NGHIỆP - TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN
      </p>
      <div className="bg-white w-3/5 p-3 m-auto rounded-xl border-slate-300 ">
        <p className="p-0 font-extrabold my-6">
          SINH VIÊN THOÁT RA ĐĂNG NHẬP LẠI NẾU BỊ LỖI KHÔNG TẢI ĐƯỢC DANH SÁCH
          HƯỚNG DẪN ĐĂNG KÝ KHÓA LUẬN TỐT NGHIỆP
        </p>
        <ol className="list-decimal p-4">
          <li>Nhấp vào Đăng ký Khóa Luận Tốt Nghiệp</li>
          <li>Chọn đề tài khóa luận tốt nghiệp cùng giảng viên hướng dẫn</li>
          <li>Nhấn nút Đăng ký</li>
          <li>Chờ hệ thống xử lý và hoàn thành xử lý</li>
          <li>
            Sau khi có kết quả xử lý, sinh viên quan sát tiến trình thực sự khóa
            luận
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Dashboard;
