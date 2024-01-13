"use client";
import React, { useEffect, useState } from "react";
import { DeadlineItem } from "./deadline-item";
import {
  DeadlineItemObj,
  Report,
  SubmitDeadline,
  SubmitReport,
} from "../types/types";
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
  const [isSelectedBtn, setIsSelectedBtn] = useState("report");
  const [deadlineList, setDeadlineList] = useState<string[]>();
  const [doneDeadline, setDoneDeadline] = useState<string[]>();
  const [reportList, setReportList] = useState<string[]>();
  const [doneReport, setDoneReport] = useState<string[]>();
  const [allDeadlines, setAllDeadlines] = useState<DeadlineItemObj[]>();
  const [submitReports, setSubmitReports] = useState<SubmitReport[]>();
  const [submitReport, setSubmitReport] = useState<Report>();
  const [submitDeadlines, setSubmitDeadlines] = useState<SubmitDeadline[]>();
  const { isLoading, error, data } = useQuery({
    queryKey: ["registeredTopics"],
    queryFn: GETgetAllRegisterTopic,
  });
  const [registeredTopic, setRegisteredTopic] = useState<RegisteredTopic[]>();

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

  const [currentPage, setCurrentPage] = useState("deadline");

  const renderContent = () => {
    switch (currentPage) {
      case "report":
        return (
          <div>
            <div>
              <div className="bg-red-500 text-white px-4 py-2 rounded-md shadow my-3">
                <span className="font-semibold">Report chưa hoàn thành</span>
              </div>
              {reportList?.map((item) => {
                return (
                  <div>
                    <DeadlineItem
                      type="report"
                      id={item}
                      status="pending"
                      currentPage={currentPage}
                    />
                  </div>
                );
              })}
              <div className="bg-green-700 text-white px-4 py-2 rounded-md shadow my-3">
                <span className="font-semibold">Report đã hoàn thành</span>
              </div>
              {doneReport?.map((item) => {
                return (
                  <div>
                    <DeadlineItem
                      submitReports={submitReports}
                      type="report"
                      id={item}
                      status="fullfilled"
                      currentPage={currentPage}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      case "deadline":
        return (
          <div>
            <div>
              <div className="bg-red-500 text-white px-4 py-2 rounded-md shadow my-3">
                <span className="font-semibold">Deadline chưa hoàn thành</span>
              </div>
              {deadlineList?.map((item) => {
                return (
                  <div>
                    <DeadlineItem type="deadline" id={item} status="pending" />
                  </div>
                );
              })}
              <div className="bg-green-700 text-white px-4 py-2 rounded-md shadow my-3">
                <span className="font-semibold">Deadline đã hoàn thành</span>
              </div>
              {doneDeadline?.map((item) => {
                console.log(submitDeadlines);
                return (
                  <div>
                    <DeadlineItem
                      submitDeadlines={submitDeadlines}
                      type="deadline"
                      id={item}
                      status="fullfilled"
                      currentPage={currentPage}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      default:
        return (
          <div>
            <div>
              <div className="bg-red-500 text-white px-4 py-2 rounded-md shadow my-3">
                <span className="font-semibold">Deadline chưa hoàn thành</span>
              </div>
              {deadlineList?.map((item) => {
                return (
                  <div>
                    <DeadlineItem
                      type="deadline"
                      id={item}
                      status="pending"
                      currentPage={currentPage}
                    />
                  </div>
                );
              })}
              <div className="bg-green-700 text-white px-4 py-2 rounded-md shadow my-3">
                <span className="font-semibold">Deadline đã hoàn thành</span>
              </div>
              {doneDeadline?.map((item) => {
                return (
                  <div>
                    <DeadlineItem
                      submitDeadlines={submitDeadlines}
                      type="deadline"
                      id={item}
                      status="fullfilled"
                      currentPage={currentPage}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-3 overflow-y-visible">
      {session?.user?.account_type === "sv" && (
        <div>
          <div className="flex flex-row gap-10 text-center justify-center">
            <button
              className={`flex-1 text-black rounded-md font-bold p-3 ${
                currentPage === "report" ? "bg-indigo-500" : ""
              }`}
              onClick={() => setCurrentPage("report")}
            >
              Report
            </button>
            <button
              className={`flex-1 text-hsl(var(--foreground)) rounded-md font-bold p-3 ${
                currentPage === "deadline" ? "bg-indigo-500" : ""
              }`}
              onClick={() => setCurrentPage("deadline")}
            >
              Deadline
            </button>
          </div>
          <div>{renderContent()}</div>
        </div>
      )}
      {session?.user?.account_type === "gv" && (
        <div>
          {allDeadlines?.map((item) => {
            return (
              <DeadlineItem
                type="deadline"
                deadlineObj={item}
                status="normal"
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
