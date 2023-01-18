import { Job } from "@/api/types";
import axios from "axios";

const getJobs = async () => {
  const baseUrl = process.env.VUE_APP_API_URL;
  const response = await axios.get<Job[]>(`${baseUrl}/jobs`);
  return response.data;
};

export default getJobs;
