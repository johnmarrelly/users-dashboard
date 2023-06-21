import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserLoginsModule } from './user-logins/user-logins.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { UserLoginsService } from './user-logins/user-logins.service';
import { UsersService } from './users/users.service';
import { UserLogins, UserLoginsSchema } from './user-logins/user-logins.schema';
import { User, UserSchema } from './users/users.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    ),
    MongooseModule.forFeature([
      { name: UserLogins.name, schema: UserLoginsSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
    UserLoginsModule,
    AuthModule,
  ],
  providers: [AuthService, JwtService, UserLoginsService, UsersService],
  exports: [UserLoginsService, UsersService],
})
export class AppModule {}
