import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRoles } from 'types/user.type';

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

  @Prop({
    enum: UserRoles,
    type: Array,
    default: [UserRoles.basic],
  })
  UserRoles: UserRoles[];
}

export const UserSchema = SchemaFactory.createForClass(User);
