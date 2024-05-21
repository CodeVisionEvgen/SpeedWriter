import { IsArray, IsString, ValidateNested } from 'class-validator';

export class CreateAchievementDto {
  @IsString()
  ref: string;
  @IsArray()
  @ValidateNested()
  achievements?: number[];
}
