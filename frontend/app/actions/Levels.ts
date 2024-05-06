import { ILevel } from "@/types";
import axios from "axios";
export async function FetchLevels(): Promise<ILevel[]> {
  const data = (await axios("/api/levels")).data;
  return data as Promise<ILevel[]>;
}
export async function GetLevelById(id: string): Promise<ILevel> {
  const data = (await axios(`/api/levels/${id}`)).data;
  return data as Promise<ILevel>;
}
export async function CreateLevel(
  level: Pick<ILevel, "LevelDifficulty" | "LevelName" | "LevelText">
): Promise<ILevel> {
  const request = await axios.post("/api/levels", level, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return request.data;
}
export async function UpdateLevel(
  id: string,
  level: Pick<ILevel, "LevelDifficulty" | "LevelName" | "LevelText">
): Promise<ILevel> {
  const request = await axios.patch(`/api/levels/${id}`, level, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return request.data;
}
export async function DeleteLevels(ids: string[]): Promise<ILevel> {
  const request = await axios.delete(`/api/levels/${ids.join(",")}`);
  return request.data;
}
