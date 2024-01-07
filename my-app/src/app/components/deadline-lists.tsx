"use client";
import React, { useEffect, useState } from "react";
import { DeadlineItem } from "./deadline-item";
import { DeadlineItemObj, Report, SubmitReport } from "../types/types";
import { useSession } from "next-auth/react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { GETgetAllRegisterTopic } from "@/app/api/topic-api";
import { RegisteredTopic } from "@/app/types/types";
import {
  GETgetAllDeadlineByTeacherID,
  GETgetDeadlineByID,
} from "../api/deadline-api";
import { toast } from "sonner";

export const DeadlineList = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [deadlineList, setDeadlineList] = useState<string[]>();
  const [doneDeadline, setDoneDeadline] = useState<string[]>();
  const [reportList, setReportList] = useState<string[]>();
  const [doneReport, setDoneReport] = useState<string[]>();
  const [allDeadlines, setAllDeadlines] = useState<DeadlineItemObj[]>();
  const [submitReports, setSubmitReports] = useState<SubmitReport[]>();
  const [submitReport, setSubmitReport] = useState<Report>();
  const [submitDeadlines, setSubmitDeadlines] = useState<DeadlineItemObj[]>();
  const { isLoading, error, data } = useQuery({
    queryKey: ["registeredTopics"],
    queryFn: GETgetAllRegisterTopic,
  });
  const [registeredTopic, setRegisteredTopic] = useState<RegisteredTopic[]>();
  // useEffect(() => {
  //   async function fetchAllDeadline() {
  //     if (session?.user?.account_type === "gv") {
  //       const response = await GETgetAllDeadlineByTeacherID(session?.user?._id);
  //       setAllDeadlines(response);
  //       console.log("All deadlines: " + response);
  //     }
  //   }
  //   fetchAllDeadline();
  // }, []);
  function getRegisteredTopic() {
    if (data)
      data.map((item: RegisteredTopic) => {
        let arr: RegisteredTopic[] = [];
        if (item.ma_sv?._id === session!.user!._id) {
          arr.push(item);
        }
        setRegisteredTopic(arr);
        getDeadlineFromRegisteredTopic(arr);
      });
  }

  function getDeadlineFromRegisteredTopic(arr: RegisteredTopic[]) {
    arr?.map((item) => {
      setDeadlineList(item.id_deadlines);
      setDoneDeadline(item.deadlines_done);
      setDoneReport(item.reports_done);
      setReportList(item.reports);
      setSubmitReports(item.submit_reports);
      setSubmitDeadlines(item.submit_deadlines);
    });
  }

  useEffect(() => {
    async function fetchData() {
      if (session?.user?.account_type === "sv") {
        await getRegisteredTopic();
      }
    }
    async function fetchAllDeadline() {
      if (session?.user?.account_type === "gv") {
        const response = await GETgetAllDeadlineByTeacherID(session?.user?._id);
        setAllDeadlines(response);
      }
    }
    fetchAllDeadline();
    fetchData();
  }, [data]);

  return (
    <div className="flex flex-col gap-3 overflow-y-visible">
      {session?.user?.account_type === "sv" && (
        <div className="flex flex-col gap-10">
          <div>
            <p>Deadline chưa hoàn thành</p>
            {deadlineList?.map((item) => {
              return (
                <div>
                  <DeadlineItem type="deadline" id={item} status="pending" />
                </div>
              );
            })}
            <div className="border w-full h-[1px]"></div>
            <p>Deadline đã hoàn thành</p>
            {doneDeadline?.map((item) => {
              return (
                <div>
                  <DeadlineItem
                    submitDeadlines={submitDeadlines}
                    type="deadline"
                    id={item}
                    status="fullfilled"
                  />
                </div>
              );
            })}
          </div>
          <div>
            <p>Report chưa hoàn thành</p>
            {reportList?.map((item) => {
              return (
                <div>
                  <DeadlineItem type="report" id={item} status="pending" />
                </div>
              );
            })}
            <div className="border w-full h-[1px]"></div>
            <p>Report đã hoàn thành</p>
            {doneReport?.map((item) => {
              return (
                <div>
                  <DeadlineItem
                    submitReports={submitReports}
                    type="report"
                    id={item}
                    status="fullfilled"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {session?.user?.account_type === "gv" && (
        <>
          {allDeadlines?.map((item) => {
            return <DeadlineItem deadlineObj={item} status="normal" />;
          })}
        </>
      )}
    </div>
  );
};
