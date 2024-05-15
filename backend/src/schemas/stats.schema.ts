import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { UserStatsType } from 'types/user.type';

export type UserStatDocument = HydratedDocument<UserStats>;

export const defaultStatsValues: UserStatsType = {
  HardLevels: 0,
  MediumLevels: 0,
  EasyLevels: 0,
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
}

export const userStatSchema = SchemaFactory.createForClass(UserStats);
