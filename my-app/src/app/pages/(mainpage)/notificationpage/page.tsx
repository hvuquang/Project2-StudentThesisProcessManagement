"use client";
import BreadcrumbDashboard from "@/app/components/breadcrumb";
import React from "react";
import DashboardLayout from "../layout-for-dashboard/layout-for-dashboard";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button/Button";

const NotificationPage = () => {
  const router = useRouter();
  return (
    <DashboardLayout>
      <h1>NotificationPage</h1>
      <Button
        variant={"default"}
        onClick={() => {
          router.push("/pages/notificationpage1");
        }}
      >
        Thông báo
      </Button>
    </DashboardLayout>
  );
};

export default NotificationPage;
