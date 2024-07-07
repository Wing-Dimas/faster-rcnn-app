import axios, { AxiosResponse } from "axios";
import ENDPOINTS from "./EndPoints";
// import { appConfig } from "@/config";

// const BASE_URL: string = appConfig.apiURL;

const apiRequest = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

class ApiManager {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static predictImage = (data: FormData, model: string): Promise<AxiosResponse<any, any>> => {
    const url = ENDPOINTS.PREDICT_IMAGE(model);
    return axios.post(`/api/predict?model=${model}`, data);
  };
}

export default ApiManager;
