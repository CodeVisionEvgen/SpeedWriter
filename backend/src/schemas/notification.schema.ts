import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NotifyDocument = HydratedDocument<Notify>;

@Schema({
  timestamps: true,
  strict: 'throw',
})
export class Notify {
  @Prop({
    type: String,
    required: true,
  })
  ref: string;
  @Prop({
    type: String,
    required: true,
  })
  message: string;
  @Prop({
    type: Boolean,
    default: false,
  })
  read: boolean;
  @Prop({
    type: Boolean,
    default: true,
  })
  new: boolean;
}
export const NotifySchema = SchemaFactory.createForClass(Notify);
