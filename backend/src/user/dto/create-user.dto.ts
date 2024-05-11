import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  UserName: string;
  @IsEmail()
  UserEmail: string;
  @IsString()
  UserPassword: string;
}
