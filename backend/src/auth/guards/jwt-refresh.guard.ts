import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwtRefresh') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
