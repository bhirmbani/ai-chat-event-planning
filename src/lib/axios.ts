import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { toast } from "sonner";

function successResponseInterceptor(response: AxiosResponse) {
  return response;
}
async function errorResponseInterceptor(error: AxiosError) {
  const errDesc = error.response?.data
    ? (error.response.data as any)?.message
    : error.message;
  toast.error(errDesc);

  return Promise.reject(error);
}

async function apiInstance(config: AxiosRequestConfig) {
  const instance = axios.create({
    ...config,
    baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  instance.interceptors.response.use(
    (res) => {
      return successResponseInterceptor(res);
    },
    (err) => {
      return errorResponseInterceptor(err);
    }
  );

  return instance;
}

export default apiInstance({});
