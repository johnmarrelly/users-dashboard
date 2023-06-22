import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WhitelistTokens,
  WhitelistTokensSchema,
} from './whitelist-tokens-schema';
import { WhitelistTokensService } from './whitelist-tokens.service';
import { WhitelistTokensController } from './whitelist-tokens.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WhitelistTokens.name, schema: WhitelistTokensSchema },
    ]),
  ],
  controllers: [WhitelistTokensController],
  providers: [WhitelistTokensService],
  exports: [WhitelistTokensService],
})
export class WhitelistTokensModule {}
