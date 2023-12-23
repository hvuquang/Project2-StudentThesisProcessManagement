"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout-for-dashboard/layout-for-dashboard";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  GETgetAllNotification,
  PUTupdateNotification,
} from "@/app/api/notification-api";
import { Label } from "@/components/ui/label/Label";
import { Input } from "@/components/ui/form/inputs/input/Input";
import { Button } from "@/components/ui/button/Button";
import { Topic, Notification } from "@/app/types/types";
import { toast } from "sonner";
import { time } from "console";
import Link from "next/link";
import { url } from "@/app/lib/constants";
const NotificationPage = () => {
  const [notificationItem, setNotificationItem] = useState<Notification | null>(
    {
      tieu_de: "",
      file: null,
      _id: "",
    }
  );
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["notifications"],
    queryFn: GETgetAllNotification,
  });
  const updateNotificationMutation = useMutation({
    mutationFn: (notification: Notification) => {
      return PUTupdateNotification(notification);
    },
    onSuccess: () => {
      toast.success("Update successfully");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (err) => {
      toast.error("Error: " + err);
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notificationItem) updateNotificationMutation.mutate(notificationItem);
    return;
  };
  const handleChange = (
    tieu_de?: string,
    topic_description?: string,
    _id?: string,
    date?: string
  ) => {
    setNotificationItem({
      tieu_de: tieu_de,
      file: null,
      _id: _id,
    });
  };
  let files: File[];
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
      // second: "2-digit",
    });
  };
  const convertToArray = (item: Notification) => {
    if (item.file) {
      let extension = (item.file as string).split(".").pop();
      let filename = (item.file as string).split("\\").pop();
      switch (extension) {
        case "doc":
        case "docx":
          return (
            <Link href={url + item.file}>
              <p className="ml-5">
                <span className="mr-3">📄</span>
                {filename}
              </p>
            </Link>
          ); // Word icon
        case "pdf":
          return (
            <Link href={url + item.file}>
              <p className="ml-5">
                <span className="mr-3">📕</span>
                {filename}
              </p>
            </Link>
          ); // Word icon
        case "jpg":
        case "jpeg":
        case "png":
          return (
            <Link href={url + item.file}>
              <p className="ml-5">
                <span className="mr-3">🖼️</span>
                {filename}
              </p>
            </Link>
          ); // Word icon; // Image icon
        case "mp3":
          return <span>🎵</span>; // Audio icon
        default:
          return (
            <Link href={url + item.file}>
              <p className="ml-5">
                <span className="mr-3">📁</span>
                {filename}
              </p>
            </Link> // Default icon)
          );
      }
    }
    // return <Link href={url + item.file}>File</Link>;
  };

  return (
    <DashboardLayout>
      {data?.map((item: Notification) => (
        <div className="w-full">
          <div className="flex justify-between w-full">
            <Dialog>
              <DialogTrigger>
                <div>
                  <p className="text-indigo-500 hover:underline">
                    {item.tieu_de}
                  </p>

                  {/* <p>{item.file}</p> */}
                </div>
              </DialogTrigger>
              <DialogContent className="min-w-[35rem] pt-5 px-3 md:max-w-[40rem]">
                <DialogHeader title="Cập nhật đề tài KLTN" />
                <form
                  className="grid gap-4 py-4"
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Tên đề tài
                    </Label>

                    <Input
                      id="name"
                      defaultValue={item.tieu_de}
                      className="col-span-3"
                      onChange={(e) => {
                        handleChange(e.target.value, undefined, item._id);
                      }}
                    />
                  </div>
                  {/* <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Nội dung đề tài
                  </Label>
                  <Input
                    id="username"
                    defaultValue={topicItem.topic_description}
                    className="col-span-3"
                    onChange={(e) => {
                      handleChange(
                        undefined,
                        e.target.value,
                        topicItem._id ?? ""
                      );
                    }}
                  />
                </div> */}
                  <DialogFooter>
                    <Button type="submit" variant={"secondary"}>
                      Cập nhật đề tài
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <div>
              <p>{formatDate(item.createdAt as string)}</p>
            </div>
          </div>

          <p className="text-sm text-left ml-5 mb-5">{convertToArray(item)}</p>
          <div className="mb-5 border w-full h-[1px]"></div>
        </div>
      ))}
    </DashboardLayout>
  );
};

export default NotificationPage;
