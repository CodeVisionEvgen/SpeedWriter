import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Level, LevelSchema } from 'src/schemas/level.schema';

@Module({
  controllers: [LevelsController],
  providers: [LevelsService],
  imports: [
    MongooseModule.forFeature([{ name: Level.name, schema: LevelSchema }]),
  ],
})
export class LevelsModule {}
