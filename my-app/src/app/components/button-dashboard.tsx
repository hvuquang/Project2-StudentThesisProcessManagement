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
import React from "react";
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

export const ButtonDashboard = () => {
  const handleSubmit = () => {};
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="min-w-screen ml-10 mt-3 flex gap-10">
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
            onSubmit={handleSubmit}
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
              <Popover className="col-span-3">
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

      <Button className="w-20" variant={"outline"}>
        Xóa
      </Button>
    </div>
  );
};
