"use client";
import BreadcrumbDashboard from "@/app/components/breadcrumb";
import {
  Breadcrumb,
  BreadcrumbContainer,
  BreadcrumbItem,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button/Button";
import { LayoutDashboard, Link } from "lucide-react";
import React from "react";
import DashboardLayout from "../layout-for-dashboard/layout-for-dashboard";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  return (
    <div>
      <DashboardLayout>
        <div id="container" className="flex justify-around items-center mt-10">
          <Button
            variant={"default"}
            onClick={() => {
              router.push("/pages/notificationpage");
            }}
          >
            Thông báo
          </Button>
          <Button
            variant={"default"}
            onClick={() => {
              router.push("/pages/folderpage");
            }}
          >
            Tài liệu
          </Button>
          <Button
            variant={"default"}
            onClick={() => {
              router.push("/pages/deadlinepage");
            }}
          >
            Deadline
          </Button>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Dashboard;
