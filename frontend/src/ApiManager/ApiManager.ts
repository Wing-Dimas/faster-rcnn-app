import axios, { AxiosResponse } from "axios";
import ENDPOINTS from "./EndPoints";
import { appConfig } from "@/config";

// const BASE_URL: string = appConfig.apiURL;
const apiRequest = axios.create({
  baseURL: appConfig.apiURL,
  headers: {
    "Content-Type": "application/json",
  },
});

class ApiManager {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static predictImage = (data: FormData, model: string): Promise<AxiosResponse<any, any>> => {
    const isDev = appConfig.env === "local";
    if (isDev) {
      const url = "/api" + ENDPOINTS.PREDICT_IMAGE(model);
      return axios.post(url, data);
    } else {
      const url = ENDPOINTS.PREDICT_IMAGE(model);
      return apiRequest.post(url, data);
    }
  };
}

export default ApiManager;
