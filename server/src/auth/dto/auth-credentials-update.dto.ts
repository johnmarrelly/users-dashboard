import { IsNotEmpty, IsString } from 'class-validator';
import { IUser } from 'src/users/user.interface';

export class AuthCredentialsUpdateDto {
  @IsString()
  @IsNotEmpty()
  id: IUser['id'];
}
