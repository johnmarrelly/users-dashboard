import { IsNotEmpty, IsString } from 'class-validator';

export class WhitelistTokenCreate {
  @IsString()
  @IsNotEmpty()
  token!: string;

  @IsString()
  @IsNotEmpty()
  userId!: string;
}
