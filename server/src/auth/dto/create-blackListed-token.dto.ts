import { IsNotEmpty, IsString } from 'class-validator';
import { IUser } from 'src/users/user.interface';

export class CreateBlackListedTokenDto {
  @IsNotEmpty()
  @IsString()
  userId?: IUser['id'];

  @IsNotEmpty()
  @IsString()
  token?: string;

  @IsNotEmpty()
  @IsString()
  expiresIn?: Date;
}
