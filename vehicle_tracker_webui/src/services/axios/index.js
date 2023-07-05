import Axios from "axios";
import { setupInterceptorsTo } from "./interceptor";

const axios = setupInterceptorsTo(
  Axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  })
);

export default axios;
