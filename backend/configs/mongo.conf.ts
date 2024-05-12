import { ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose';

export const MongoConfig = (
  configService: ConfigService,
): MongooseModuleFactoryOptions => {
  return {
    uri:
      configService.get('MONGODB_URI') +
      configService.get('MONGO_INITDB_DATABASE'),
    auth: {
      username: configService.get('MONGO_ROOT_USERNAME'),
      password: configService.get('MONGO_ROOT_PASSWORD'),
    },
  };
};
