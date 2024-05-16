import { UserStatsResponseType, UserStatsType, UserType } from "@/types";
import axios from "axios";
import { deleteCookie, setCookie } from "cookies-next";
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
        setCookie("AccessToken", tokens.accessToken);
        setCookie("RefreshToken", tokens.refreshToken);
        return await SwitchMethod(url, method, body, userConfig);
      } catch (error) {
        deleteCookie("AccessToken");
        deleteCookie("RefreshToken");
        deleteCookie("token");
        window.location.href = "/";
      }
    }
  }
};
export const GetUser = async () => {
  const decodedUser = (await RequestFetch("/api/auth/jwt/decode", "post"))
    ?.data as UserType;
  const user = (await RequestFetch(`/api/user/${decodedUser.UserEmail}`, "get"))
    ?.data;
  return user as UserType & { stats: UserStatsType };
};
