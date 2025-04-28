import axios from "axios";
import { type CookiesFn, getCookie } from "cookies-next";

const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  let cookieStore: CookiesFn | undefined;
  if (typeof window === "undefined") {
    const { cookies: serverCookies } = await import("next/headers");
    cookieStore = serverCookies;
  }

  const token = await getCookie("token", { cookies: cookieStore });
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { api };
