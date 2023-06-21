import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsLoginDto } from './dto/auth-cradential-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() authCredentials: AuthCredentialsDto): Promise<void> {
    await this.authService.signUp(authCredentials);
  }

  @Post('/signin')
  async signIn(
    @Body() authCredentials: AuthCredentialsLoginDto,
    @Req() req,
  ): Promise<{ userId: string; accessToken: string; refreshToken: string }> {
    return await this.authService.logIn(authCredentials, req);
  }

  @UseGuards(AuthGuard())
  @Post('/signout')
  async signOut(@Req() req: any): Promise<void> {
    return await this.authService.logOut(req);
  }
}
