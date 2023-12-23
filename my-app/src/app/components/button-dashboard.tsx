"use client";
import { Button } from "@/components/ui/button/Button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/form/inputs/input/Input";
import React, { useEffect, useState } from "react";
import { Label } from "../../components/ui/label/Label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar/Calendar";
import { usePathname } from "next/navigation";
import { POSTaddTopic } from "../api/topic-api";
import { Topic, Notification, DeadlineItemObj } from "../types/types";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "sonner";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import FileInput from "./file-input";
import { POSTaddNotification } from "../api/notification-api";
import { POSTaddDeadline } from "../api/deadline-api";

type ButtonDashboard = {
  className?: string;
};

export const ButtonDashboard = (className: ButtonDashboard) => {
  const queryClient = useQueryClient();
  const { data: teacherSession } = useSession();
  const addTopicMutation = useMutation({
    mutationFn: POSTaddTopic,
    onSuccess: () => {
      toast.success("Add topic successfully");
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
    onError: () => {
      toast.error("Invalid Information");
    },
  });
  const addNotification = useMutation({
    mutationFn: POSTaddNotification,
    onSuccess: () => {
      toast.success("Thêm thông báo thành công");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast.error("Lỗi. Vui lòng kiểm tra lại");
    },
  });

  const addDeadline = useMutation({
    mutationFn: POSTaddDeadline,
    onSuccess: () => {
      toast.success("Tạo deadline thành công");
      queryClient.invalidateQueries({ queryKey: ["deadlines"] });
    },
    onError: () => {
      toast.error("Lỗi. Vui lòng kiểm tra lại");
    },
  });

  const [topic, setTopic] = useState<Topic>({
    topic_name: "",
    topic_description: "",
  });
  const [notification, setNotification] = useState<Notification>({
    tieu_de: "",
    file: null,
  });

  const [deadline, setDeadline] = useState<DeadlineItemObj>({
    tieu_de: "",
    noi_dung: "",
    ngay_bat_dau: "",
    ngay_ket_thuc: "",
    ma_gv: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (page === "deadlinepage" && teacherSession?.user) {
      addDeadline.mutate({
        deadline: deadline,
        teacher_id: teacherSession.user._id || "",
      });
      return;
    } else if (page === "notificationpage") {
      addNotification.mutate({
        tieu_de: notification.tieu_de,
        file: notification.file,
      });
      return;
    } else if (teacherSession?.user) {
      addTopicMutation.mutate({
        topic: topic,
        teacher_id: teacherSession.user._id || "",
      });
    }
    return;
  };

  const handleChange = (
    topic_name?: string,
    topic_description?: string,
    file?: FileList,
    deadline_title?: string,
    deadline_content?: string,
    deadline_start?: string,
    deadline_end?: string
  ) => {
    if (page === "notificationpage") {
      setNotification({
        tieu_de: topic_name,
        file: file,
      });
      return;
    }
    if (page === "deadlinepage") {
      setDeadline({
        tieu_de: deadline_title,
        noi_dung: deadline_content,
        ngay_bat_dau: startDate?.toISOString(),
        ngay_ket_thuc: endDate?.toISOString(),
      });
      return;
    }
    setTopic({
      topic_name: topic_name,
      topic_description: topic_description,
    });
  };

  const pathname = usePathname();
  const [page, setPage] = useState("");
  const handlePathname = () => {
    const subPathname: string[] = pathname.split("/");
    const subPathArrayLength = subPathname.length - 1;
    let pageName = subPathname[subPathArrayLength];
    if (pageName === "deadlinepage") {
      setPage("deadlinepage");
    }
    if (pageName === "registerthesis") {
      setPage("registerthesis");
    }
    if (pageName === "notificationpage") {
      setPage("notificationpage");
    }
  };
  useEffect(() => {
    handlePathname();
  }, []);
  const handleFilesChange = (files: FileList | null) => {
    // Do something with the selected files
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name);
      setNotification({
        tieu_de: notification.tieu_de ?? "",
        file: files,
      });
      console.log("Selected Files:", fileNames);
    } else {
      console.log("No files selected");
    }
  };
  // handlePathname();
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(new Date());
  useEffect(() => {
    let start = startDate?.toISOString();
    let end = endDate?.toISOString();
    setDeadline({
      tieu_de: deadline.tieu_de,
      noi_dung: deadline.noi_dung,
      ngay_bat_dau: start,
      ngay_ket_thuc: end,
    });
  }, [startDate, endDate]);
  return (
    <div className={cn(className)}>
      {page === "deadlinepage" && (
        <div className="min-w-screen ml-10 my-3 flex justify-end">
          <Dialog>
            <DialogTrigger>
              <Button className="min-w-20 w-max" variant={"default"}>
                Tạo deadline cho sinh viên
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[35rem] pt-5 px-3 md:max-w-[40rem]">
              <DialogHeader title="Tạo deadline" />
              <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Tiêu đề deadline
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                    onChange={(e) => {
                      handleChange(
                        "",
                        "",
                        undefined,
                        e.target.value,
                        deadline.noi_dung,
                        deadline.ngay_bat_dau,
                        deadline.ngay_ket_thuc
                      );
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Nội dung deadline
                  </Label>
                  <Input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3"
                    onChange={(e) => {
                      handleChange(
                        "",
                        "",
                        undefined,
                        deadline.tieu_de,
                        e.target.value,
                        deadline.ngay_bat_dau,
                        deadline.ngay_ket_thuc
                      );
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Ngày bắt đầu
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal col-span-3",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? (
                          format(startDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Ngày kết thúc
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal col-span-3",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? (
                          format(endDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <DialogFooter>
                  <Button type="submit" variant={"secondary"}>
                    THÊM
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* <Button className="w-20" variant={"outline"}>
            Xóa
          </Button> */}
        </div>
      )}
      {page === "registerthesis" && (
        <div className="min-w-screen ml-10 my-3 flex justify-end">
          <Dialog>
            <DialogTrigger>
              <Button className="min-w-20 w-max" variant={"default"}>
                Thêm đề tài KLTN
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[35rem] pt-5 px-3 md:max-w-[40rem]">
              <DialogHeader title="Đăng ký đề tài KLTN" />
              <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Tên đề tài
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                    onChange={(e) => {
                      handleChange(e.target.value, topic?.topic_description);
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Nội dung đề tài
                  </Label>
                  <Input
                    id="username"
                    defaultValue="@peduarte"
                    className="col-span-3"
                    onChange={(e) => {
                      handleChange(topic.topic_name, e.target.value);
                    }}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" variant={"secondary"}>
                    THÊM
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* <Button className="w-20" variant={"outline"}>
            Xóa
          </Button> */}
        </div>
      )}
      {page === "notificationpage" && (
        <div className="min-w-screen ml-10 my-3 flex justify-end">
          <Dialog>
            <DialogTrigger>
              <Button className="min-w-20 w-max" variant={"default"}>
                Thêm thông báo
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[35rem] pt-5 px-3 md:max-w-[40rem]">
              <DialogHeader title="Đăng ký đề tài KLTN" />
              <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nội dung tiêu đề
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                    onChange={(e) => {
                      handleChange(e.target.value, "", undefined);
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    File
                  </Label>
                  <FileInput onFilesChange={handleFilesChange} />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    variant={"secondary"}
                    onClick={handleSubmit}
                  >
                    Thêm thông báo
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* <Button className="w-20" variant={"outline"}>
            Xóa
          </Button> */}
        </div>
      )}
    </div>
  );
};
