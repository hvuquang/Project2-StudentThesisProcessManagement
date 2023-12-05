"use client";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { useRouter, usePathname } from "next/navigation";
import path from "path";
import React, { useState } from "react";

type BreadcrumbItem = {
  pathname?: string;
  name?: string;
  href?: string;
};

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  {
    pathname: "dashboard",
  },
];

const BreadcrumbDashboard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [breadcrumbItems, setBreadcrumbItemsState] = useState([]);

  const handlePathname = (): string => {
    const subPathname: string[] = pathname.split("/");
    const subPathArrayLength = subPathname.length - 1;
    let actualPathname = subPathname[subPathArrayLength];
    if (actualPathname === "dashboard") return "";
    if (actualPathname === "notificationpage") {
      actualPathname = "Thông báo";
    }
    if (actualPathname === "deadlinepage") {
      actualPathname = "Deadline";
    }
    if (actualPathname === "folderpage") {
      actualPathname = "Tài liệu";
    }
    return actualPathname;
  };

  return (
    <div className="ml-10 mt-10">
      <Breadcrumb>
        <BreadcrumbItem href="/pages/dashboard">
          <span className="text-indigo-600 text-medium font-bold">
            Trang chủ / {handlePathname()}
          </span>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbDashboard;
