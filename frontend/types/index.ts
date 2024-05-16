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

// export type CardAchievementStyleType = {
//   bgColor: string;
// };
export interface IAchievement {
  title: string;
  descriptions: string;
  image: string;
}
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
  header?: ReactNode | JSX.Element | null;
  body?: ReactNode | JSX.Element | null;
  footer?: ReactNode | JSX.Element | null;
};

export enum SwitchSelectMode {
  none = "none",
  single = "single",
  multiple = "multiple",
}

type MongoDbMetaType = {
  exp: number;
  iat: number;
};

export type UserType = {
  UserName: string;
  UserEmail: string;
  UserPicture: string;
} & MongoDbMetaType;

export type UserStatsResponseType = {
  ref: string;
  stats: UserStatsType;
};

export type UserStatsType = {
  HardLevels: number;
  MediumLevels: number;
  EasyLevels: number;
  SpeedWriting: number;
  Mistakes: number;
  completedLevels: string[];
};
