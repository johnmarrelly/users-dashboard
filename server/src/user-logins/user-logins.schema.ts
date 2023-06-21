import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserLoginsDocument = HydratedDocument<UserLogins>;

@Schema()
export class UserLogins {
  @Prop({ required: true, default: new Date() })
  createdAt?: Date;

  @Prop({ required: true })
  userId: string;

  @Prop()
  userIp!: string;

  @Prop()
  userAgent!: string;

  @Prop()
  loggedInAt?: Date;
}

export const UserLoginsSchema = SchemaFactory.createForClass(UserLogins);
