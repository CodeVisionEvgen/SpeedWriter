import { IsEnum, IsString } from 'class-validator';
import { LevelDifficultyEnums } from 'src/schemas/level.schema';

export class CreateLevelDto {
  @IsString()
  LevelName: string;
  @IsEnum(LevelDifficultyEnums)
  LevelDifficulty: LevelDifficultyEnums;
  @IsString()
  LevelText: string;
}
