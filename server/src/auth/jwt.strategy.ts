import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, JwtPayload, Request } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { WhitelistTokensService } from 'src/whitelist-tokens/whitelist-tokens.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService,
    private whitelistTokensService: WhitelistTokensService,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET_TOKEN,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    const { userId } = payload;
    if (!userId) {
      throw new UnauthorizedException({ message: 'payload not provided' });
    }

    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException({ message: 'UserId not found' });
    }

    const foundToken =
      await this.whitelistTokensService.getWhitelistTokenByUserId(userId);

    if (!foundToken) {
      throw new UnauthorizedException({
        message: 'Token provided is no longer valid',
      });
    }

    return user;
  }
}
