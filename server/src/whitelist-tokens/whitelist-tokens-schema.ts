import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum ErrorCodes {
  DUPLICATE_KEY = 11000,
}

export type WhitelistTokensDocument = HydratedDocument<WhitelistTokens>;

@Schema()
export class WhitelistTokens {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true, unique: true })
  token!: string;

  @Prop({ required: true, default: new Date() })
  createdAt!: Date;
}

export const WhitelistTokensSchema =
  SchemaFactory.createForClass(WhitelistTokens);
