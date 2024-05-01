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
})
export class Level {
  @Prop({
    type: String,
    isRequired: true,
  })
  LevelName: string;
  @Prop({
    isRequired: true,
    enum: LevelDifficultyEnums,
  })
  LevelDifficulty: LevelDifficultyEnums;
  @Prop({
    type: String,
    isRequired: true,
  })
  LevelText: string;
}

export const LevelSchema = SchemaFactory.createForClass(Level);
