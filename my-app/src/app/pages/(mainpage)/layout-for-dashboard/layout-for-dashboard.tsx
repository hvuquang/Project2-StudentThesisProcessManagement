"use client";
import { GETgetAllRegisterTopic } from "@/app/api/topic-api";
import BreadcrumbDashboard from "@/app/components/breadcrumb";
import { ButtonDashboard } from "@/app/components/button-dashboard";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { da } from "date-fns/locale";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

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
