import { ConfigService } from '@nestjs/config';

export default (configService: ConfigService): any => {
  return {
    clientID: configService.get('OAUTH_CLIENT_ID'),
    clientSecret: configService.get('OAUTH_CLIENT_SECRET'),
    callbackURL: configService.get('OAUTH_CALLBACK_URL'),
  };
};
