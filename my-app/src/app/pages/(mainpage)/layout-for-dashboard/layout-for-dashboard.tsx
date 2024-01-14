"use client";
import { GETgetAllAccount } from "@/app/api/account";
import BreadcrumbDashboard from "@/app/components/breadcrumb";
import { ButtonDashboard } from "@/app/components/button-dashboard";
import { Calendar } from "@/app/components/calendar";
import { Account } from "@/app/types/types";
import { Button } from "@/components/ui/button/Button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@nextui-org/react";
import Image from "next/image";

type Layout = {
  children?: React.ReactNode;
  className?: string;
};

const DashboardLayout = ({ children, className }: Layout) => {
  const { data: session } = useSession();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { isLoading, error, data } = useQuery({
    queryKey: ["accounts"],
    queryFn: GETgetAllAccount,
  });
  const renderAccountComponent = () => {
    if (data) {
      return data.map((item: Account) => {
        return (
          <div className="border-b hover:cursor-pointer">
            <Dialog>
              <DialogTrigger asChild>
                <div className="text-left flex gap-5 text-xs p-3">
                  <Image
                    src="/hacker.png"
                    className="w-[32px] h-[32px] rounded-e"
                    alt="Your Company"
                    width={10}
                    height={10}
                  />
                  <div className="flex-1">
                    <p className="text-left">{item.fullname}</p>
                    <p className="font-light">
                      {item.account_type === "gv" ? "Giảng viên" : "Sinh viên"}
                    </p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] p-5">
                <DialogHeader title="Hồ sơ tài khoản" />
                <div className="flex justify-around items-start">
                  <Image
                    className="mx-auto"
                    src="/hacker.png"
                    alt="Your Company"
                    width={100}
                    height={100}
                  />
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Họ tên
                      </Label>
                      <Input
                        id="name"
                        value={item.fullname}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        value={item.email}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Vai trò
                      </Label>
                      <Input
                        id="roles"
                        value={
                          item.account_type === "gv" ? "Giáo viên" : "Sinh viên"
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        );
      });
    }
    return <></>;
  };
  return (
    <div className={cn("w-full min-h-screen h-screen text-sm", className)}>
      <BreadcrumbDashboard />
      <div className="flex justify-between mx-5 gap-5">
        <div
          className={cn(
            "rounded-sm border border-gray-300 my-5 min-h-screen p-3 flex-1"
          )}
        >
          {session?.user?.account_type === "gv" && <ButtonDashboard />}
          {children}
        </div>
        <div className="w-[250px] h-auto">
          <div className="rounded-sm border border-gray-300 p-3 my-5">
            <p>
              Hệ thống website khóa luận tốt nghiệp - Trường đại học Công Nghệ
              Thông Tin, kênh thông tin môn học hữu ích cho Giảng viên và Sinh
              viên.
            </p>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-sm border border-gray-300 text-xs"
          />
          <div className="rounded-sm border border-gray-300 p-3 my-5">
            <p className="font-medium">Thành viên trong hệ thống</p>
            <div className="h-[200px] overflow-y-auto scroll-thi">
              {renderAccountComponent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
