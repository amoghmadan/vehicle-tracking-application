import { LOCAL_STORAGE_KEY } from "../../constants";

const onRequest = (config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  if (JSON.parse(import.meta.env.VITE_PUBLIC_DEBUG || "false")) {
    console.info(`[request] [${JSON.stringify(config)}]`);
  }
  return config;
};

const onRequestError = (error) => {
  if (JSON.parse(import.meta.env.VITE_PUBLIC_DEBUG || "false")) {
    console.error(`[request error] [${JSON.stringify(error)}]`);
  }
  return Promise.reject(error);
};

const onResponse = (response) => {
  if (JSON.parse(import.meta.env.VITE_PUBLIC_DEBUG || "false")) {
    console.info(`[response] [${JSON.stringify(response)}]`);
  }
  return response;
};

const onResponseError = (error) => {
  if (error.message == "Network Error") {
    return Promise.reject(error.message);
  }
  try {
    switch (error.response?.status) {
      case 400:
        break;
      case 401:
        localStorage.clear();
        break;
      case 403:
        break;
      case 404:
        break;
      case 500:
        break;
      case 504:
        break;
      default:
        return Promise.reject(error);
    }
  } catch (e) {
    if (JSON.parse(import.meta.env.VITE_PUBLIC_DEBUG || "false")) {
      console.error(`[response error] [${JSON.stringify(e)}]`);
    }
  }
  if (JSON.parse(import.meta.env.VITE_PUBLIC_DEBUG || "false")) {
    console.error(`[response error] [${JSON.stringify(error)}]`);
  }
  return Promise.reject(error.message);
};

export function setupInterceptorsTo(axiosInstance) {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
