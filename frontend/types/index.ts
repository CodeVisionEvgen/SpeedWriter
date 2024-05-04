import { SVGProps } from "react";

export enum LevelDifficultyEmuns {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
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
