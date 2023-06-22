import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserLoginsService } from './user-logins.service';
import { UserLogins } from './user-logins.schema';
import { CreateUserLoginDto } from './dto/create-user-logins.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('user-logins')
export class UserLoginsController {
  constructor(private userLoginsService: UserLoginsService) {}

  @Get()
  async fetchUsersLogins(): Promise<UserLogins[]> {
    return this.userLoginsService.getAllUsersLogins();
  }

  @Get(':id')
  async fetchLastUserLoginById(@Param('id') id: string): Promise<UserLogins> {
    return await this.userLoginsService.getLastUserLoginById(id);
  }

  @Post()
  async createUserLogin(
    @Body() createUserLoginsDto: CreateUserLoginDto,
    @Req() req: Request,
  ): Promise<UserLogins> {
    return await this.userLoginsService.createUserLogin(
      createUserLoginsDto,
      req,
    );
  }
}
