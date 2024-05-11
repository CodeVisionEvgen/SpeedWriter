import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AvatarApiModule } from 'src/avatar-api/avatar-api.module';
import { AvatarApiService } from 'src/avatar-api/avatar-api.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AvatarApiService],
  imports: [UserModule, AvatarApiModule],
})
export class AuthModule {}
