import { Module } from '@nestjs/common';
import { AvatarApiService } from './avatar-api.service';
import { ImageKitModule } from '@platohq/nestjs-imagekit';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImageKitConfigFactory } from 'configs/image-kit.conf';
@Module({
  providers: [AvatarApiService],
  exports: [AvatarApiModule],
  imports: [
    ImageKitModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ImageKitConfigFactory,
    }),
  ],
})
export class AvatarApiModule {}
