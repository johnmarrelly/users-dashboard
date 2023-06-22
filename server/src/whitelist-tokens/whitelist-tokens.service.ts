import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WhitelistTokens } from './whitelist-tokens-schema';
import { Model } from 'mongoose';
import { WhitelistTokenCreate } from './dto/whitelist-token-create.dto';

@Injectable()
export class WhitelistTokensService {
  constructor(
    @InjectModel(WhitelistTokens.name)
    private whitelistModelModel: Model<WhitelistTokens>,
  ) {}

  async getWhitelistTokenByUserId(userId: string): Promise<WhitelistTokens> {
    return this.whitelistModelModel.findOne({ userId });
  }

  async createWhiteListToken(
    whitelistTokenCreateDto: WhitelistTokenCreate,
  ): Promise<void> {
    await this.whitelistModelModel.create(whitelistTokenCreateDto);
  }

  async deleteWhiteListToken(token: string): Promise<void> {
    await this.whitelistModelModel.deleteOne({ token });
  }

  async getWhiteListTokenByToken(token: string): Promise<WhitelistTokens> {
    return await this.whitelistModelModel.findOne({ token });
  }
}
