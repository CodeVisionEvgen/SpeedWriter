import { LevelDifficultyEnums } from 'schemas/level.schema';

export class CreateLevelDto {
  LevelName: string;
  LevelDifficulty: LevelDifficultyEnums;
  LevelText: string;
}
