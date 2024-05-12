import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  UserName: string;
  @IsEmail()
  UserEmail: string;
  @IsString()
  @Length(8, 20)
  UserPassword: string;
}
