import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export enum ErrorCodes {
  DUPLICATE_KEY = 11000,
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ default: uuidv4 })
  id!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true, default: 0 })
  loginCounts?: number;

  @Prop({ required: true, default: false })
  isLoggedIn?: boolean;

  @Prop({ required: true, default: new Date() })
  createdAt?: Date;

  @Prop({ default: null })
  lastLogInAt?: Date;

  @Prop({ required: true, default: new Date() })
  lastUpdatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
