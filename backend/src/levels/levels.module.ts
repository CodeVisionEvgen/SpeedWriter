import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Level, LevelSchema } from 'src/schemas/level.schema';
import { JwtTokenStrategy } from 'src/auth/strategies/jwt.strategy';
import { JwtAdminStrategy } from 'src/auth/strategies/jwt-admin.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [LevelsController],
  providers: [LevelsService, JwtTokenStrategy, JwtAdminStrategy],
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Level.name, schema: LevelSchema }]),
  ],
})
export class LevelsModule {}
