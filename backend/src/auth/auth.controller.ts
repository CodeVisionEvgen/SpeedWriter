import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from 'src/auth/guards/google-oauth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { FileRequestType } from 'types/file.type';
import { UserService } from 'src/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarApiService } from 'src/avatar-api/avatar-api.service';
import { Response } from 'express';

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
    console.log(req.user);
    return req.user;
  }

  @HttpCode(200)
  @Post('signin')
  async signin(@Body() body: CreateUserDto) {
    const user = await this.userService.findByName(body.UserName);
    if (!user) throw new BadRequestException('User is not exist');
    if (
      !(await this.authService.comparePasswords(
        body.UserPassword,
        user.UserPassword,
      ))
    )
      throw new UnauthorizedException('Password is wrong');
  }

  @UseInterceptors(FileInterceptor('UserPicture'))
  @Post('signup')
  async signup(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [new FileTypeValidator({ fileType: /.(png|jpg|jpeg)/ })],
      }),
    )
    UserPicture: FileRequestType,
    @Body()
    createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    if (UserPicture && UserPicture.size > 500000)
      return new BadRequestException('Picture must to be lower than 0.5mb');

    if (await this.userService.findByEmail(createUserDto.UserEmail))
      throw new UnauthorizedException('Email is exist');

    if (await this.userService.findByName(createUserDto.UserName))
      throw new UnauthorizedException('User is exist');

    let userPicture: string = '';
    if (!UserPicture) {
      userPicture = await this.avatarApiService.CreateAvatar(
        createUserDto.UserName,
      );
    } else {
      userPicture = UserPicture.buffer.toString('base64');
    }

    try {
      userPicture = (await this.avatarApiService.SaveAvatar(userPicture)).url;
    } catch (error) {
      throw new BadGatewayException('Failed to save avatar');
    }

    const {
      UserEmail,
      _id,
      UserName,
      UserPicture: UserPictureUrl,
    } = await this.userService.create({
      UserPicture: userPicture,
      UserProvider: 'jwt',
      ...createUserDto,
      UserPassword: await this.authService.hashPassword(
        createUserDto.UserPassword,
      ),
    });

    const tokens = await this.authService.genJwtTokens(
      {
        UserPicture: UserPictureUrl,
        UserEmail,
        UserName,
      },
      _id.toString(),
    );

    await this.authService.saveJwtTokens(tokens);

    response.cookie('AccessToken', tokens.accessToken, { httpOnly: true });
    response.cookie('RefreshToken', tokens.refreshToken, { httpOnly: true });

    response.status(201).json(tokens);
  }
}
