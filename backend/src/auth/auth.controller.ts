import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from 'guards/google-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(GoogleOauthGuard)
  @Get('google/callback')
  googleCallback(@Req() req: Request & { user: any }) {
    return req.user;
  }

  @UseGuards(GoogleOauthGuard)
  @Get('google')
  async googleAuth() {}
}
