import axios from "axios";
import { url } from "@/app/lib/constants";
import { Topic, Notification, Report } from "../types/types";

export async function POSTaddReport({
  report,
  teacher_id,
}: {
  report: Report;
  teacher_id: string;
}) {
  try {
    console.log("Report: " + report);
    await axios
      .post(url + `v1/report/addReport/${teacher_id}`, {
        loai_bao_cao: report?.loai_bao_cao,
        noi_dung: report?.noi_dung,
        ngay_bat_dau: report?.ngay_bat_dau,
        ngay_ket_thuc: report?.ngay_ket_thuc,
        file: report?.file,
      })
      .then((res) => {
        console.log(
          "Tạo report thành công: " +
            res.data.loai_bao_cao +
            ", " +
            res.data.noi_dung
        );
      });
  } catch (err) {
    throw err;
  }
}

export async function PUTupdateStatusDeadline({
  studentID,
  deadlineID,
  file,
}: {
  studentID: string;
  deadlineID: string;
  file: File;
}) {
  try {
    const formData = new FormData();
    if (file) formData.append("file", file);
    await axios.put(
      url + `v1/deadline/done_deadline/${studentID}&${deadlineID}`,
      formData
    );
  } catch (err) {
    throw err;
  }
}

export async function GETgetDeadlineByID(deadline_id: string | undefined) {
  try {
    const response = await axios.get(
      url + `v1/deadline/deadlineById/${deadline_id}`
    );
    console.log("Deadline Item: " + response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function GETgetAllDeadlineByTeacherID(
  teacher_id: string | undefined
) {
  try {
    const response = await axios.get(
      url + `v1/deadline/allDeadlinesByTeacherId/${teacher_id}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
}
