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
import { Topic } from "../types/types";
import { useSession } from "next-auth/react";
import { Toaster, toast } from "sonner";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

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
  let [topic, setTopic] = useState<Topic>({
    topic_name: "",
    topic_description: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teacherSession?.user) {
      addTopicMutation.mutate({
        topic: topic,
        teacher_id: teacherSession.user._id || "",
      });
    }
    return;
  };

  const handleChange = (topic_name: string, topic_description: string) => {
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
  };
  useEffect(() => {
    handlePathname();
  }, []);
  // handlePathname();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className={cn(className)}>
      {page === "deadlinepage" && (
        <div className="min-w-screen ml-10 mt-3 flex gap-5">
          <Dialog>
            <DialogTrigger>
              <Button className="w-20" variant={"default"}>
                Thêm
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[35rem] pt-5 px-3 md:max-w-[40rem]">
              <DialogHeader title="Tạo deadline" />
              <form
                action="POST"
                className="grid gap-4 py-4"
                // onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Tiêu đề deadline
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
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
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
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
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </form>
              <DialogFooter>
                <Button type="submit" variant={"secondary"}>
                  THÊM
                </Button>
              </DialogFooter>
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
    </div>
  );
};
