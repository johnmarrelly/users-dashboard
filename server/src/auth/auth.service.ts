import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ErrorCodes, User } from 'src/users/users.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { NoContentException } from 'src/shared/exceptions/no-content.exception';
import { GetBlackListedTokenDto } from './dto/get-blackListed-token.dto';
import { Request } from 'express';
import { UserLoginsService } from 'src/user-logins/user-logins.service';
import { AuthCredentialsLoginDto } from './dto/auth-cradential-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private userLoginsService: UserLoginsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    if (!(await bcrypt.compare(password, hashedPassword))) {
      throw new UnauthorizedException('Invlid username or password');
    }
    return true;
  }

  async generateToken(payload: {
    email: string;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    return {
      accessToken: await this.jwtService.sign(payload),
      refreshToken: await this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
      }),
    };
  }

  async signUp(signupPayload: {
    email: string;
    password: string;
  }): Promise<User> {
    try {
      return await this.userService.createUser(signupPayload);
    } catch (err) {
      if (err.code === ErrorCodes.DUPLICATE_KEY) {
        throw new ConflictException('Username already exist');
      }
    }
  }

  async logIn(
    authCredentials: AuthCredentialsLoginDto,
    req: Request,
  ): Promise<{ userId: string; accessToken: string; refreshToken: string }> {
    const { email, password } = authCredentials;
    const user: User = await this.userService.getUserByUserName(email);

    await this.validateUser(password, user.password);

    const payload = {
      email,
      userId: user.id,
    };

    const { accessToken, refreshToken } = await this.generateToken(payload);

    const { id, loginCounts } = user;

    await this.userService.updateUserById(id, {
      isLoggedIn: true,
      loginCounts: loginCounts + 1,
      lastLogInAt: new Date(),
    });

    const userServicePayload = {
      userId: id,
      email,
      ...payload,
    };

    await this.userLoginsService.createUserLogin(
      userServicePayload,
      req as any,
    );

    return { userId: id, accessToken, refreshToken };
  }

  async logOut(req: any): Promise<void> {
    const [type, token] = req.headers.authorization.split(' ');
    console.log(token);

    if (!token && type !== 'Bearer') {
      throw new UnauthorizedException();
    }

    let decodedJwt;

    try {
      decodedJwt = this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException();
    }

    const user: User = await this.userService.getUserById(decodedJwt.userId);

    if (!user) {
      throw new NoContentException();
    }

    await this.userService.updateUserById(user.id, { isLoggedIn: false });
  }
}
