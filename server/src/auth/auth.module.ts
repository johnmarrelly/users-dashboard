import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLoginsService } from 'src/user-logins/user-logins.service';
import {
  UserLogins,
  UserLoginsSchema,
} from 'src/user-logins/user-logins.schema';
import { User, UserSchema } from 'src/users/users.schema';
import { WhitelistTokensService } from 'src/whitelist-tokens/whitelist-tokens.service';
import {
  WhitelistTokens,
  WhitelistTokensSchema,
} from 'src/whitelist-tokens/whitelist-tokens-schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: UserLogins.name, schema: UserLoginsSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: WhitelistTokens.name, schema: WhitelistTokensSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET_TOKEN}`,
      signOptions: {
        expiresIn: `${process.env.JWT_TOKEN_EXPIRATION_TIME}`,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UserLoginsService,
    WhitelistTokensService,
  ],
  exports: [
    JwtStrategy,
    PassportModule,
    UserLoginsService,
    WhitelistTokensService,
  ],
})
export class AuthModule {}
