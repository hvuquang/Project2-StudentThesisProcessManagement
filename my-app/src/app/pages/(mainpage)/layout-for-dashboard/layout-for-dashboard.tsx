import BreadcrumbDashboard from "@/app/components/breadcrumb";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <BreadcrumbDashboard />
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
