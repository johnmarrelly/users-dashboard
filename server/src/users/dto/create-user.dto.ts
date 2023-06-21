import { IsNotEmpty, IsString } from 'class-validator';
import { IUser } from '../user.interface';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: IUser['email'];

  @IsString()
  @IsNotEmpty()
  password: IUser['password'];
}
