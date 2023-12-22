import axios from "axios";
import { url } from "@/app/lib/constants";
import { Topic, Notification, DeadlineItemObj } from "../types/types";

export async function POSTaddDeadline({
  deadline,
  teacher_id,
}: {
  deadline: DeadlineItemObj;
  teacher_id: string;
}) {
  try {
    await axios
      .post(url + `v1/deadline/addDeadline/${teacher_id}`, {
        tieu_de: deadline?.tieu_de,
        noi_dung: deadline?.noi_dung,
        ngay_bat_dau: deadline?.ngay_bat_dau,
        ngay_ket_thuc: deadline?.ngay_ket_thuc,
      })
      .then((res) => {
        console.log("Tạo deadline thành công: " + res.data.ngay_bat_dau);
      });
  } catch (err) {
    throw err;
  }
}

export async function PUTupdateStatusDeadline(notification: Notification) {
  try {
    await axios.put(
      url + `v1/notification/updateNotification/${notification._id}`,
      {
        tieu_de: notification.tieu_de,
        // topic_description: topic.topic_description,
      }
    );
  } catch (err) {
    throw err;
  }
}
