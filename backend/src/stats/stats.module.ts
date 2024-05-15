import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserStats, userStatSchema } from 'src/schemas/stats.schema';

@Module({
  controllers: [StatsController],
  providers: [StatsService],
  imports: [
    MongooseModule.forFeature([
      { schema: userStatSchema, name: UserStats.name },
    ]),
  ],
  exports: [StatsService],
})
export class StatsModule {}
