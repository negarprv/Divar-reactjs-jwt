import axios from "axios";
import { getNewTokens } from "services/token";
import { setCookie } from "src/utils/cookie";
import { getCookie } from "utils/cookie";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (req) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      req.headers["Authorization"] = `bearer ${accessToken}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalReq = error.config;
    if (error.response.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      const res = await getNewTokens();
      if (!res?.response) return;
      setCookie(res.response.data);

      return api(originalReq);
    }
  }
);
