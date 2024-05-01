import { SVGProps } from "react";

export enum LevelDifficultyEmuns {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type LevelHeadersType = {
  LevelPosition: number;
  LevelName: string;
  LevelDifficulty: LevelDifficultyEmuns;
};
