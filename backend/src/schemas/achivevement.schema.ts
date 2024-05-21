import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AchievementDocument = HydratedDocument<Achievement>;

@Schema({
  timestamps: true,
  strict: 'throw',
})
export class Achievement {
  @Prop({
    type: String,
    required: true,
  })
  ref: string;
  @Prop({
    type: Array,
    default: [],
  })
  achievements: number[];
}

export const AchievementSchema = SchemaFactory.createForClass(Achievement);
