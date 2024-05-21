import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { config } from 'dotenv';
import { Observable } from 'rxjs';
config();
@Injectable()
export class OAuthQueryGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const query = request.query;
    if (query.error) {
      response.redirect(process.env.FRONT_URL);
    }
    return true;
  }
}
