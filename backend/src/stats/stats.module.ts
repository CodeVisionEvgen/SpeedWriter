import { Module, forwardRef } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserStats, userStatSchema } from 'src/schemas/stats.schema';
import { LevelsService } from 'src/levels/levels.service';
import { LevelsModule } from 'src/levels/levels.module';
import { Level, LevelSchema } from 'src/schemas/level.schema';

@Module({
  controllers: [StatsController],
  providers: [StatsService, LevelsService],
  imports: [
    forwardRef(() => LevelsModule),
    MongooseModule.forFeature([
      { schema: userStatSchema, name: UserStats.name },
      { name: Level.name, schema: LevelSchema },
    ]),
  ],
  exports: [StatsService],
})
export class StatsModule {}
