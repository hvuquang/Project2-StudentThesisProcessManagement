"use client";
import BreadcrumbDashboard from "@/app/components/breadcrumb";
import { ButtonDashboard } from "@/app/components/button-dashboard";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React from "react";

type Layout = {
  children?: React.ReactNode;
  className?: string;
};

const DashboardLayout = ({ children, className }: Layout) => {
  const { data: session } = useSession();
  return (
    <div className={cn("w-full min-h-screen ", className)}>
      <BreadcrumbDashboard />
      <div
        className={cn(
          "rounded-sm border border-gray-300 mx-10 my-5 min-h-screen p-3"
        )}
      >
        {session?.user?.account_type === "gv" && <ButtonDashboard />}
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
