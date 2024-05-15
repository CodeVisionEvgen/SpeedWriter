import { Module } from '@nestjs/common';
import { LevelsModule } from './levels/levels.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongoConfig } from 'configs/mongo.conf';
import { GoogleStrategy } from 'src/auth/strategies/google.strategy';
import { UserModule } from './user/user.module';
import { AvatarApiModule } from './avatar-api/avatar-api.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './dev.env',
    }),
    LevelsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: MongoConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    AvatarApiModule,
    StatsModule,
  ],
  providers: [GoogleStrategy],
})
export class AppModule {}
