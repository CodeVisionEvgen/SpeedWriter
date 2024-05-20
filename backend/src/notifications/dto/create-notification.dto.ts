import { IsBoolean } from 'class-validator';

export class CreateNotifyDto {
  @IsBoolean()
  new: boolean;
  @IsBoolean()
  read: boolean;
}
