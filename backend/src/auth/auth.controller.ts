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
import { Request, Response } from 'express';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { ExtractJwt } from 'passport-jwt';
import { UserType } from 'types/user.type';
import { JwtType } from 'types/jwt.type';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly avatarApiService: AvatarApiService,
    private readonly configService: ConfigService,
  ) {}
  @UseGuards(GoogleOauthGuard)
  @Get('google/callback')
  async googleCallback(
    @Req()
    req: Request & {
      user: UserType;
    },
    @Res() response: Response,
  ) {
    const { user } = req;

    const UserInDB = await this.userService.findByEmail(user.UserEmail);
    let tokens: JwtType | undefined;
    if (!UserInDB) {
      const newUser = await this.userService.create({
        ...user,
        UserProvider: 'google',
      });
      tokens = await this.authService.genJwtTokens(
        {
          UserName: newUser.UserName,
          UserEmail: newUser.UserEmail,
          UserPicture: newUser.UserPicture,
        },
        newUser._id.toString(),
      );
    } else {
      tokens = await this.authService.genJwtTokens(
        {
          UserName: UserInDB.UserName,
          UserEmail: UserInDB.UserEmail,
          UserPicture: UserInDB.UserPicture,
        },
        UserInDB._id.toString(),
      );
    }

    await this.authService.saveJwtTokens(tokens);
    response.cookie('AccessToken', tokens.accessToken, {
      httpOnly: true,
      domain: this.configService.get('FRONT_DOMAIN'),
    });
    response.cookie('RefreshToken', tokens.refreshToken, {
      domain: this.configService.get('FRONT_DOMAIN'),
      httpOnly: true,
    });

    response.status(201).redirect(this.configService.get('FRONT_URL'));
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const refToken = ExtractJwt.fromExtractors([
      (request) => {
        return request.cookies['RefreshToken'];
      },
    ])(req);
    await this.authService.deleteJwt(refToken);
    res.clearCookie('token');
    res.clearCookie('AccessToken');
    res.clearCookie('RefreshToken');
    res.json({ ok: 1 });
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Req() req: Request, @Res() response: Response) {
    const refToken = ExtractJwt.fromExtractors([
      (request) => {
        return request.cookies['RefreshToken'];
      },
    ])(req);
    if (!refToken) throw new UnauthorizedException('Token is not set');

    const { refreshToken: tokenFromDb } =
      await this.authService.findJwt(refToken);
    if (!tokenFromDb) throw new UnauthorizedException('Token is not exists');

    const { _id } = (await this.authService.jwtDecode(tokenFromDb)) as {
      _id: string;
    };

    const user = await this.userService.findById(_id);
    if (!user) throw new UnauthorizedException('User is not exists');

    const tokens = await this.authService.genJwtTokens(
      {
        UserEmail: user.UserEmail,
        UserName: user.UserName,
        UserPicture: user.UserPicture,
      },
      user._id.toString(),
    );

    await this.authService.saveJwtTokens(tokens);
    await this.authService.deleteJwt(tokenFromDb);

    response.cookie('AccessToken', tokens.accessToken, { httpOnly: true });
    response.cookie('RefreshToken', tokens.refreshToken, {
      httpOnly: true,
    });

    response.status(201).redirect(this.configService.get('FRONT_URL'));
  }

  @Post('signin')
  async signin(@Body() body: CreateUserDto, @Res() response: Response) {
    const user = await this.userService.findByProviderAndEmail(
      body.UserEmail,
      'jwt',
    );
    if (!user) throw new BadRequestException('User is not exist');
    if (
      !(await this.authService.comparePasswords(
        body.UserPassword,
        user.UserPassword,
      ))
    )
      throw new UnauthorizedException('Password is wrong');
    const tokens = await this.authService.genJwtTokens(
      {
        UserPicture: user.UserPicture,
        UserEmail: user.UserEmail,
        UserName: user.UserName,
      },
      user._id.toString(),
    );
    await this.authService.saveJwtTokens(tokens);

    response.cookie('AccessToken', tokens.accessToken, { httpOnly: true });
    response.cookie('RefreshToken', tokens.refreshToken, {
      httpOnly: true,
    });

    response.status(200).json(tokens);
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

    response.status(201).redirect(this.configService.get('FRONT_URL'));
  }

  @UseGuards(JwtRefreshGuard)
  @Post('jwt/decode')
  decodeJwt(@Req() req: Request) {
    return this.authService.jwtDecode(req.cookies['token']);
  }
}
