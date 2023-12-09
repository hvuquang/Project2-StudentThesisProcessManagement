import axios from "axios";
import { useSession } from "next-auth/react";
import { url } from "@/app/lib/constants";
import { Topic } from "../types/types";

export async function POSTaddTopic(topic: Topic, teacher_id: string) {
  try {
    const response = await axios
      .post(url + `v1/topic/addTopic/${teacher_id}`, {
        topic_name: topic.topic_name,
        topic_description: topic.topic_description,
      })
      .then((res) => {
        console.log(res.data);
      });
  } catch (err) {
    console.log(err);
  }
}
