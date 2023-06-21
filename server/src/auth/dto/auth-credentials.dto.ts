import { IsNotEmpty, IsString } from 'class-validator';
import { IUser } from 'src/users/user.interface';

export class AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  email: IUser['email'];

  @IsString()
  @IsNotEmpty()
  password: IUser['password'];
}
