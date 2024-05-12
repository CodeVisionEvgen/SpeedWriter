import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  strict: 'throw',
})
export class User {
  @Prop({
    type: String,
    required: true,
  })
  UserName: string;
  @Prop({
    type: String,
    required: true,
  })
  UserEmail: string;
  @Prop({
    type: String,
    required: true,
  })
  @Prop({
    type: String,
    required: true,
  })
  UserPicture: string;
  @Prop({
    type: String,
  })
  UserPassword: string;
  @Prop({
    type: String,
    required: true,
  })
  UserProvider: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
