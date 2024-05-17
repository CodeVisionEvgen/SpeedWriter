import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { UserStatsType } from 'types/user.type';

export type UserStatDocument = HydratedDocument<UserStats>;

export const defaultStatsValues: UserStatsType = {
  hard: 0,
  medium: 0,
  easy: 0,
  SpeedWriting: 0,
  Mistakes: 0,
};

@Schema({
  timestamps: true,
  strict: 'throw',
})
export class UserStats {
  @Prop({
    type: String,
    required: true,
  })
  ref: string;
  @Prop({
    type: MongooseSchema.Types.Mixed,
    required: true,
    default: defaultStatsValues,
  })
  stats: UserStatsType;
  @Prop({
    type: Array,
    default: [],
  })
  completedLevels: string[];
}

export const userStatSchema = SchemaFactory.createForClass(UserStats);
