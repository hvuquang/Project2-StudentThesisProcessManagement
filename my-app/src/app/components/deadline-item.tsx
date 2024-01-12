"use client";
import { Button } from "@/components/ui/button/Button";
import React, { useEffect, useState } from "react";
import { Label } from "../../components/ui/label/Label";
import { Calendar } from "@/components/ui/calendar/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/form/inputs/input/Input";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { DeadlineItemObj, Report, SubmitReport } from "../types/types";
import { useRouter } from "next/navigation";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  GETgetDeadlineByID,
  PUTupdateStatusDeadline,
} from "../api/deadline-api";
import { cn } from "@/lib/utils";
import FileInput from "./file-input";
import fullfilled from "../../../public/fullfilled.png";
import pending from "../../../public/pending.png";
import Image from "next/image";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { GETgetReportByID, PUTupdateStatusReport } from "../api/report-api";
import { url } from "../lib/constants";
import Link from "next/link";
import { divider } from "@nextui-org/react";
export const DeadlineItem = ({
  id,
  status,
  deadlineObj,
  type,
  report,
  submitDeadlines,
  submitReports,
  currentPage,
}: {
  id?: string;
  status: string;
  deadlineObj?: DeadlineItemObj;
  type?: string;
  report?: Report;
  submitDeadlines?: DeadlineItemObj[];
  submitReports?: SubmitReport[];
  currentPage?: string;
}) => {
  const ROUTER = useRouter();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File>();
  const [deadlineItem, setDeadlineItem] = useState<DeadlineItemObj>();
  const [reportItem, setReportItem] = useState<Report>();
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(new Date());
  const [submitFile, setSubmitFile] = useState<string>();
  useEffect(() => {
    if (submitReports !== undefined && submitReports?.length > 0) {
      let submitReport = submitReports.filter((item) => {
        return item.id_report === id;
      });
      if (submitReport !== undefined && submitReport.length > 0) {
        setSubmitFile(submitReport[0].file as string);
      }
    }
  }, [currentPage]);
  const convertToArray = (item: string) => {
    if (item) {
      let extension = (item as string).split(".").pop();
      let filename = (item as string).split("\\").pop();
      switch (extension) {
        case "doc":
        case "docx":
          return (
            <Link href={url + item}>
              <p className="ml-5">
                <span className="mr-3">📄</span>
                {filename}
              </p>
            </Link>
          ); // Word icon
        case "pdf":
          return (
            <Link href={url + item}>
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
            <Link href={url + item}>
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
            <Link href={url + item}>
              <p className="ml-5">
                <span className="mr-3">📁</span>
                {filename}
              </p>
            </Link> // Default icon)
          );
      }
    }
    //   // return <Link href={url + item.file}>File</Link>;
  };
  useEffect(() => {
    async function fetchData() {
      if (status === "normal") {
        setStartDate(new Date(deadlineObj?.ngay_bat_dau as string));
        setEndDate(new Date(deadlineObj?.ngay_ket_thuc as string));
        return;
      }
      const res = await GETgetDeadlineByID(id);
      if (res) {
        setDeadlineItem(res);
        setStartDate(new Date(res.ngay_bat_dau));
        setEndDate(new Date(res.ngay_ket_thuc));
      }
      const reportRes = await GETgetReportByID(id);
      if (reportRes) {
        setReportItem(reportRes);
        setStartDate(new Date(reportRes.ngay_bat_dau));
        setEndDate(new Date(reportRes.ngay_ket_thuc));
      }
    }
    fetchData();
  }, [currentPage]);
  const handleFilesChange = (files: FileList | null) => {
    // Do something with the selected files
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name);
      // setNotification({
      //   tieu_de: notification.tieu_de ?? "",
      //   file: files,
      // });
      setFile(files[0]);
      console.log("Selected Files:", fileNames);
    } else {
      console.log("No files selected");
    }
  };
  const updateStatusDeadline = useMutation({
    mutationFn: PUTupdateStatusDeadline,
    onSuccess: () => {
      toast.success("Nộp deadline thành công");
      queryClient.invalidateQueries({ queryKey: ["registeredTopics"] });
    },
    onError: () => {
      toast.error("Lỗi. Vui lòng kiểm tra lại");
    },
  });

  const updateStatusReport = useMutation({
    mutationFn: PUTupdateStatusReport,
    onSuccess: () => {
      toast.success("Nộp report thành công");
      queryClient.invalidateQueries({ queryKey: ["registeredTopics"] });
    },
    onError: () => {
      toast.error("Lỗi. Vui lòng kiểm tra lại");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (session?.user) {
      updateStatusDeadline.mutate({
        studentID: session?.user?._id as string,
        deadlineID: id as string,
        file: file as File,
      });
    }
    return;
  };
  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (session?.user) {
      updateStatusReport.mutate({
        studentID: session?.user?._id as string,
        reportID: id as string,
        file: file as File,
        loai_bao_cao: reportItem?.loai_bao_cao as string,
      });
    }

    return;
  };
  return (
    <div>
      {type === "deadline" && (
        <div className="pl-5 pr-2">
          <div className="flex gap-10">
            {status === "pending" && (
              <Image
                alt="pending-status"
                src={pending}
                width={50}
                height={50}
              />
            )}
            {status === "fullfilled" && (
              <Image
                alt="fullfilled-status"
                src={fullfilled}
                width={50}
                height={50}
              />
            )}
            <Dialog>
              <DialogTrigger>
                <div className="my-3">
                  <p className="text-indigo-500 hover:underline text-left">
                    {status === "normal"
                      ? deadlineObj?.tieu_de
                      : deadlineItem?.tieu_de}
                  </p>
                  <p className="text-left ml-5 text-sm">
                    {status === "normal" ? (
                      <span className="font-semibold">Nội dung: </span>
                    ) : (
                      ""
                    )}

                    {status === "normal" ? deadlineObj?.noi_dung : ""}
                  </p>
                  {deadlineObj?.file ? (
                    <div className="text-left ml-5 text-sm">
                      {status === "normal" ? (
                        <div>
                          <span className="font-semibold">File tham khảo:</span>
                          {convertToArray(deadlineObj?.file as string)}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </DialogTrigger>
              <DialogContent className="min-w-[35rem] pt-5 px-3 md:max-w-[40rem]">
                <DialogHeader title="Tạo deadline" />
                <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Tiêu đề deadline
                    </Label>
                    {session?.user?.account_type === "gv" ? (
                      <Input
                        id="name"
                        defaultValue={
                          status === "normal"
                            ? deadlineObj?.tieu_de
                            : deadlineItem?.tieu_de
                        }
                        className="col-span-3"
                        // onChange={(e) => {
                        //   handleChange(
                        //     "",
                        //     "",
                        //     undefined,
                        //     e.target.value,
                        //     deadline.noi_dung,
                        //     deadline.ngay_bat_dau,
                        //     deadline.ngay_ket_thuc
                        //   );
                        // }}
                      />
                    ) : (
                      <Input
                        id="name"
                        readOnly
                        defaultValue={
                          status === "normal"
                            ? deadlineObj?.tieu_de
                            : deadlineItem?.tieu_de
                        }
                        className="col-span-3"
                        // onChange={(e) => {
                        //   handleChange(
                        //     "",
                        //     "",
                        //     undefined,
                        //     e.target.value,
                        //     deadline.noi_dung,
                        //     deadline.ngay_bat_dau,
                        //     deadline.ngay_ket_thuc
                        //   );
                        // }}
                      />
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Nội dung deadline
                    </Label>
                    {session?.user?.account_type === "gv" ? (
                      <Input
                        id="username"
                        defaultValue={
                          status === "normal"
                            ? deadlineObj?.noi_dung
                            : deadlineItem?.noi_dung
                        }
                        className="col-span-3"
                        // onChange={(e) => {
                        //   handleChange(
                        //     "",
                        //     "",
                        //     undefined,
                        //     deadline.tieu_de,
                        //     e.target.value,
                        //     deadline.ngay_bat_dau,
                        //     deadline.ngay_ket_thuc
                        //   );
                        // }}
                      />
                    ) : (
                      <Input
                        readOnly
                        id="username"
                        defaultValue={
                          status === "normal"
                            ? deadlineObj?.noi_dung
                            : deadlineItem?.noi_dung
                        }
                        className="col-span-3"
                      />
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Ngày bắt đầu
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          disabled
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal col-span-3 disabled:opacity-100",
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
                          disabled
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal col-span-3 disabled:opacity-100",
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
                          disabled
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Nộp deadline
                    </Label>

                    <FileInput onFilesChange={handleFilesChange} />
                  </div>
                  {deadlineObj?.file ? (
                    <div className="">
                      File đã nộp: {convertToArray(deadlineObj?.file as string)}
                    </div>
                  ) : (
                    ""
                  )}
                  <DialogFooter>
                    <Button type="submit" variant={"secondary"}>
                      {/* NỘP */}
                      {session?.user?.account_type === "gv"
                        ? "Cập nhật"
                        : "Nộp"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          {status === "normal" && (
            <div className="mb-5 border w-full h-[1px]"></div>
          )}
        </div>
      )}
      {type === "report" && (
        <div className="pl-5 pr-2">
          <div className="flex gap-10">
            {status === "pending" && (
              <Image
                alt="pending-status"
                src={pending}
                width={50}
                height={50}
              />
            )}
            {status === "fullfilled" && (
              <Image
                alt="fullfilled-status"
                src={fullfilled}
                width={50}
                height={50}
              />
            )}
            <Dialog>
              <DialogTrigger>
                <p className="text-indigo-500 hover:underline">
                  {status === "normal"
                    ? deadlineObj?.tieu_de
                    : reportItem?.noi_dung}
                </p>
              </DialogTrigger>
              <DialogContent className="min-w-[35rem] pt-5 px-3 md:max-w-[40rem]">
                <DialogHeader title="Tạo báo cáo" />
                <form className="grid gap-4 py-4" onSubmit={handleSubmitReport}>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Tiêu đề báo cáo
                    </Label>
                    <Input
                      readOnly
                      id="name"
                      defaultValue={
                        status === "normal"
                          ? deadlineObj?.tieu_de
                          : reportItem?.loai_bao_cao
                      }
                      className="col-span-3"
                      // onChange={(e) => {
                      //   handleChange(
                      //     "",
                      //     "",
                      //     undefined,
                      //     e.target.value,
                      //     deadline.noi_dung,
                      //     deadline.ngay_bat_dau,
                      //     deadline.ngay_ket_thuc
                      //   );
                      // }}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Nội dung báo cáo
                    </Label>
                    <Input
                      readOnly
                      id="username"
                      defaultValue={
                        status === "normal"
                          ? deadlineObj?.noi_dung
                          : reportItem?.noi_dung
                      }
                      className="col-span-3"
                      // onChange={(e) => {
                      //   handleChange(
                      //     "",
                      //     "",
                      //     undefined,
                      //     deadline.tieu_de,
                      //     e.target.value,
                      //     deadline.ngay_bat_dau,
                      //     deadline.ngay_ket_thuc
                      //   );
                      // }}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Ngày bắt đầu
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          disabled
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal col-span-3 disabled:opacity-100",
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
                          disabled
                          variant={"outline"}
                          className={cn(
                            "justify-start text-left font-normal col-span-3 disabled:opacity-100",
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
                          disabled
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Nộp báo cáo
                    </Label>

                    <FileInput onFilesChange={handleFilesChange} />
                  </div>
                  {submitFile ? (
                    <div className="">
                      File đã nộp: {convertToArray(submitFile)}
                    </div>
                  ) : (
                    ""
                  )}
                  <DialogFooter>
                    {submitFile ? (
                      ""
                    ) : (
                      <Button type="submit" variant={"secondary"}>
                        NỘP
                      </Button>
                    )}
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
};
