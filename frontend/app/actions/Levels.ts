import { GetLevelsByPageType, ILevel } from "@/types";
import axios, { AxiosResponse } from "axios";
import { RequestFetch } from "./User";
export async function FetchLevels(): Promise<
  AxiosResponse<any, any> | undefined
> {
  return RequestFetch("/api/levels", "get");
}
export async function GetLevelByPage(
  page: number = 1,
  diff: string = "",
  q: string = ""
): Promise<AxiosResponse<any, any> | undefined> {
  const url = `/api/levels/page/${page}?max=8&diff=${
    diff === "every" ? "" : diff
  }&q=${q}`;
  return RequestFetch(url, "get");
}
export async function GetLevelById(
  id: string
): Promise<AxiosResponse<any, any> | undefined> {
  const url = `/api/levels/level/${id}`;
  return RequestFetch(url, "get");
}
export async function CreateLevel(
  level: Pick<ILevel, "LevelDifficulty" | "LevelName" | "LevelText">
): Promise<AxiosResponse<any, any> | undefined> {
  const UserConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const url = "/api/levels";
  return RequestFetch(url, "post", level, UserConfig);
}
export async function UpdateLevel(
  id: string,
  level: Pick<ILevel, "LevelDifficulty" | "LevelName" | "LevelText">
): Promise<AxiosResponse<any, any> | undefined> {
  const url = `/api/levels/${id}`;
  return RequestFetch(url, "patch", level, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export async function GetLevelsLength() {
  return RequestFetch("/api/levels/length", "get");
}
export async function DeleteLevels(
  ids: string[]
): Promise<AxiosResponse<any, any> | undefined> {
  const url = `/api/levels/${ids.join(",")}`;
  return RequestFetch(url, "delete");
}
