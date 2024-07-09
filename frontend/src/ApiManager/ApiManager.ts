import axios, { AxiosResponse } from "axios";
import ENDPOINTS from "./EndPoints";
// import { appConfig } from "@/config";

// const BASE_URL: string = appConfig.apiURL;

class ApiManager {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static predictImage = (data: FormData, model: string): Promise<AxiosResponse<any, any>> => {
    const url = "/api" + ENDPOINTS.PREDICT_IMAGE(model);
    return axios.post(url, data);
  };
}

export default ApiManager;
