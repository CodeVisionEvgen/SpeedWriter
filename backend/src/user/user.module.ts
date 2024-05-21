import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/schemas/user.schema';
import { StatsModule } from 'src/stats/stats.module';
import { UserController } from './user.controller';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { AchievementsModule } from 'src/achievements/achievements.module';

@Module({
  providers: [UserService],
  imports: [
    StatsModule,
    AchievementsModule,
    NotificationsModule,
    MongooseModule.forFeature([{ schema: UserSchema, name: User.name }]),
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
