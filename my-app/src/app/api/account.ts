import axios from "axios";
import { url } from "@/app/lib/constants";

export async function GETgetASingleAccount(account: string) {
  try {
    const response = await axios.get(
      url + `v1/account/getASingleAccount/${account}`
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
}
