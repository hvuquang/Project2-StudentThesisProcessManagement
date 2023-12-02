import Navbar from "@/app/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";



const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Navbar></Navbar>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
