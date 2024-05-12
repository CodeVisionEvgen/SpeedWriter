import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AvatarApiModule } from 'src/avatar-api/avatar-api.module';
import { AvatarApiService } from 'src/avatar-api/avatar-api.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigFactory } from 'configs/jwt.conf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JWT, JWTSchema } from 'src/schemas/jwt.schema';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AvatarApiService],
  imports: [
    UserModule,
    AvatarApiModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: JwtConfigFactory,
    }),
    MongooseModule.forFeature([
      {
        schema: JWTSchema,
        name: JWT.name,
      },
    ]),
  ],
})
export class AuthModule {}
