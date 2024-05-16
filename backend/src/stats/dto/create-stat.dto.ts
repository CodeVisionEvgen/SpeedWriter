import {
  IsArray,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserStatsType } from 'types/user.type';

export class CreateStatDto {
  @IsString()
  ref: string;
  @IsDefined()
  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  stats?: UserStatsType;
  @IsOptional()
  @ValidateNested()
  @IsArray()
  completedLevels?: string[];
}
