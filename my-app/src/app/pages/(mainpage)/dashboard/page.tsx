"use client";
import BreadcrumbDashboard from "@/app/components/breadcrumb";
import {
  Breadcrumb,
  BreadcrumbContainer,
  BreadcrumbItem,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button/Button";
import { LayoutDashboard, Link } from "lucide-react";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout-for-dashboard/layout-for-dashboard";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  return (
    <div>
      <DashboardLayout>
        <div id="container" className="flex flex-col items-start gap-5 mt-5">
          <Button
            variant={"link"}
            onClick={() => {
              router.push("/pages/notificationpage");
            }}
          >
            TRANG THÔNG BÁO
          </Button>
          {/* <Button
            variant={"default"}
            onClick={() => {
              router.push("/pages/folderpage");
            }}
          >
            Tài liệu
          </Button> */}
          <Button
            variant={"link"}
            onClick={() => {
              router.push("/pages/deadlinepage");
            }}
          >
            TRANG DEADLINE
          </Button>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Dashboard;
