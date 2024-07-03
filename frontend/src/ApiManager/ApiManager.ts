import axios, { AxiosResponse } from "axios";
import ENDPOINTS from "./EndPoints";
import { appConfig } from "@/config";

const BASE_URL: string = appConfig.apiURL;

const apiRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

class ApiManager {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static predictImage = (data: FormData): Promise<AxiosResponse<any, any>> => {
    const url = BASE_URL + ENDPOINTS.PREDICT_IMAGE();
    return apiRequest.post(url, data);
  };
}

export default ApiManager;
