import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { IUserLogins } from '../user-logins.interface';

export class CreateUserLoginDto {
  @IsString()
  @IsNotEmpty()
  userIp: IUserLogins['userIp'];

  @IsString()
  @IsNotEmpty()
  userAgent: IUserLogins['userAgent'];

  @IsDateString()
  @IsNotEmpty()
  loggedInAt: IUserLogins['loggedInAt'];
}
