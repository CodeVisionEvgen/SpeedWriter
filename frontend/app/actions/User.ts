import { UserType } from "@/types";
import axios from "axios";
import { setCookie } from "cookies-next";
const config = {
  withCredentials: true,
};
const SwitchMethod = async (
  url: string,
  method: "post" | "get" | "patch" | "delete",
  body?: unknown,
  userConfig?: any
) => {
  let request;
  switch (method) {
    case "get":
      request = await axios.get(url, { ...userConfig, ...config });
      break;
    case "post":
      request = await axios.post(url, body, { ...userConfig, ...config });
      break;
    case "delete":
      request = await axios.delete(url, { ...userConfig, ...config });
      break;
    case "patch":
      request = await axios.patch(url, body, { ...userConfig, ...config });
  }
  return request;
};

export const RequestFetch = async (
  url: string,
  method: "post" | "get" | "patch" | "delete",
  body?: unknown,
  userConfig?: any
) => {
  try {
    const response = await SwitchMethod(url, method, body, userConfig);
    return response;
  } catch (error: any) {
    if (error.response.status == 401) {
      try {
        const tokens = (
          await axios.post("/api/auth/refresh", {
            withCredentials: true,
          })
        ).data;
        setCookie("AccessToken", tokens.AccessToken);
        setCookie("RefreshToken", tokens.RefreshToken);
        return await SwitchMethod(url, method, body, userConfig);
      } catch (error) {
        window.location.href = "/";
      }
    }
  }
};
export const GetUser = async () => {
  const user = await RequestFetch("/api/auth/jwt/decode", "post");

  return user?.data as UserType;
};
