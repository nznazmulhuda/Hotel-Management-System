import config from "@/config";
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: config.api,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosPublic;
