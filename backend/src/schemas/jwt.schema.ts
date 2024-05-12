import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JWTDocument = HydratedDocument<JWT>;

@Schema({
  timestamps: true,
  strict: 'throw',
})
export class JWT {
  @Prop({
    type: String,
    required: true,
  })
  accessToken: string;
  @Prop({
    type: String,
    required: true,
  })
  refreshToken: string;
}

export const JWTSchema = SchemaFactory.createForClass(JWT);
