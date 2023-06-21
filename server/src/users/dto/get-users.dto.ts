import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IUser } from '../user.interface';
import { IUserLogins } from 'src/user-logins/user-logins.interface';

export class GetUsersDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id?: IUser['id'];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username?: IUser['email'];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  userIp?: IUserLogins['userIp'];

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  loginCounts?: IUser['loginCounts'];

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  createdAt?: IUser['createdAt'];

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  lastLoginAt?: IUser['lastLoginAt'];

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  lastUpdateAt?: IUser['lastUpdatedAt'];
}
