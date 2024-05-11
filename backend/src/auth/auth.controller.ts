import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from 'guards/google-oauth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { FileRequestType } from 'types/file.type';
import { UserService } from 'src/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarApiService } from 'src/avatar-api/avatar-api.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly avatarApiService: AvatarApiService,
  ) {}
  @UseGuards(GoogleOauthGuard)
  @Get('google/callback')
  googleCallback(@Req() req: Request & { user: any }) {
    return req.user;
  }

  @UseInterceptors(FileInterceptor('UserPicture'))
  @Post('signup')
  async create(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [new FileTypeValidator({ fileType: /.(png|jpg|jpeg)/ })],
      }),
    )
    UserPicture: FileRequestType,
    @Body()
    createUserDto: CreateUserDto,
  ) {
    if (UserPicture && UserPicture.size > 500000)
      return new BadRequestException('Picture must to be lower than 0.5mb');

    let userPicture: string = '';
    if (!UserPicture) {
      userPicture = await this.avatarApiService.CreateAvatar(
        createUserDto.UserName,
      );
    } else {
      userPicture = UserPicture.buffer.toString('base64');
    }

    try {
      await this.avatarApiService.SaveAvatar(userPicture);
    } catch (error) {
      throw new BadGatewayException('Failed to save avatar');
    }

    return this.userService.create({
      UserPictire: userPicture,
      ...createUserDto,
    });
  }
}
