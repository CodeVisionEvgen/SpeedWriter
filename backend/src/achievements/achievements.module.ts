import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AchievementsController } from './achievements.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Achievement,
  AchievementSchema,
} from 'src/schemas/achivevement.schema';

@Module({
  controllers: [AchievementsController],
  providers: [AchievementsService],
  exports: [AchievementsService],
  imports: [
    MongooseModule.forFeature([
      {
        schema: AchievementSchema,
        name: Achievement.name,
      },
    ]),
  ],
})
export class AchievementsModule {}
