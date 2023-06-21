import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, JwtPayload } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET_TOKEN,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    const { userId } = payload;
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
