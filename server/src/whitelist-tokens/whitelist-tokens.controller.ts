import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WhitelistTokensService } from './whitelist-tokens.service';
import { WhitelistTokenCreate } from './dto/whitelist-token-create.dto';
import { AuthGuard } from '@nestjs/passport';

UseGuards(AuthGuard());
@Controller('whitelist-tokens')
export class WhitelistTokensController {
  constructor(private whitelistTokensService: WhitelistTokensService) {}

  @Post()
  async createToken(
    @Body() whitelistTokenCreate: WhitelistTokenCreate,
  ): Promise<void> {
    return await this.whitelistTokensService.createWhiteListToken(
      whitelistTokenCreate,
    );
  }

  @Delete()
  async removeWhitelisToken(
    @Param() { token }: { token: string },
  ): Promise<void> {
    return await this.whitelistTokensService.deleteWhiteListToken({
      token,
    });
  }
}
