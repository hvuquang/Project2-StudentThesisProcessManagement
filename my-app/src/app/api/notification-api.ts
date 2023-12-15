import axios from "axios";
import { useSession } from "next-auth/react";
import { url } from "@/app/lib/constants";
import { Topic, Notification } from "../types/types";

export async function POSTaddNotification(notification: Notification) {
  try {
    const formData = new FormData();
    formData.append("tieu_de", notification.title || "");
    // formData.append("file", notification.file);
    if (notification.file)
      for (let i = 0; i < notification.file.length; i++) {
        formData.append("file", notification.file[i]);
      }
    await axios.post(url + `v1/notification/addNotification`, formData);
  } catch (err) {
    throw err;
  }
}
