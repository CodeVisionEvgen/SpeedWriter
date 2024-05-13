import { IsString, IsEmail, Length, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  UserName?: string;
  @IsEmail()
  UserEmail: string;
  @IsString()
  @Length(8, 20)
  UserPassword?: string;
}
