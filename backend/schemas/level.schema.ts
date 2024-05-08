import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LevelDocument = HydratedDocument<Level>;

export enum LevelDifficultyEnums {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
}

@Schema({
  timestamps: true,
  strict: 'throw',
})
export class Level {
  @Prop({
    type: Number,
    required: true,
  })
  LevelPosition: number;
  @Prop({
    type: String,
    required: true,
    index: 'text',
  })
  LevelName: string;
  @Prop({
    required: true,
    index: 'text',
    enum: LevelDifficultyEnums,
  })
  LevelDifficulty: LevelDifficultyEnums;
  @Prop({
    type: String,
    required: true,
  })
  LevelText: string;
}

export const LevelSchema = SchemaFactory.createForClass(Level);
