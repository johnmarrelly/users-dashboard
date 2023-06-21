import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLogins, UserLoginsSchema } from './user-logins.schema';
import { UserLoginsController } from './user-logins.controller';
import { UserLoginsService } from './user-logins.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([
      { name: UserLogins.name, schema: UserLoginsSchema },
    ]),
  ],
  controllers: [UserLoginsController],
  providers: [UserLoginsService],
})
export class UserLoginsModule {}
