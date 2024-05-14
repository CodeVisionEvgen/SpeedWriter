import { ReactNode, SVGProps } from "react";

export enum LevelDifficultyEmuns {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export type RequestArgsType = {
  diff: LevelDifficultyEmuns | "every";
  query: string;
};

export type GetLevelsByPageType = {
  maxPages: number;
  countDocs: number;
  docs: ILevel[];
};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface ILevel {
  _id: string;
  LevelPosition: number;
  LevelName: string;
  LevelDifficulty: LevelDifficultyEmuns;
  LevelText: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type ModalContent = {
  header: ReactNode | JSX.Element | null;
  body: ReactNode | JSX.Element | null;
};

export enum SwitchSelectMode {
  none = "none",
  single = "single",
  multiple = "multiple",
}

export type UserType = {
  UserName: string;
  UserEmail: string;
  UserPicture: string;
  exp: number;
  iat: number;
};
