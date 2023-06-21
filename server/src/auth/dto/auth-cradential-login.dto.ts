import { IsNotEmpty, IsString } from 'class-validator';
import { IUserLogins } from 'src/user-logins/user-logins.interface';
import { IUser } from 'src/users/user.interface';

export class AuthCredentialsLoginDto {
  @IsString()
  @IsNotEmpty()
  email: IUser['email'];

  @IsString()
  @IsNotEmpty()
  password: IUser['password'];

  // @IsString()
  // @IsNotEmpty()
  // userIp: IUserLogins['userIp'];

  // @IsString()
  // @IsNotEmpty()
  // userAgent: IUserLogins['userAgent'];
}
