import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  UserName: string;
  @IsEmail()
  UserEmail: string;
  // @IsDataURI()
  // UserPicture: any;
}
