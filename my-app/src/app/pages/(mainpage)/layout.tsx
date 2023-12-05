import Navbar from "@/app/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  return (
    <div>
      <Navbar></Navbar>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
