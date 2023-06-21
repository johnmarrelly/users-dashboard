import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetBlackListedTokenDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Prop({ required: true })
  token?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Prop({ required: true })
  userId?: string;
}
