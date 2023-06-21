import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IUser } from '../user.interface';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  email?: IUser['email'];

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  password?: IUser['email'];

  @IsInt()
  @IsOptional()
  @IsNotEmpty()
  loginCounts?: IUser['loginCounts'];

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  isLoggedIn?: IUser['isLoggedIn'];

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  lastLogInAt?: IUser['lastLoginAt'];
}
