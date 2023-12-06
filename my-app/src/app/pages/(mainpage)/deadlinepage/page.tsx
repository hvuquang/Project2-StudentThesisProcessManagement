import React from "react";
import DashboardLayout from "../layout-for-dashboard/layout-for-dashboard";
import { DeadlineList } from "@/app/components/deadline-lists";

const DeadlinePage = () => {
  return (
    <DashboardLayout>
      <div>
        <DeadlineList />
      </div>
    </DashboardLayout>
  );
};

export default DeadlinePage;
