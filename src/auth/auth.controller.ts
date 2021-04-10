import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../lib/decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('login/google')
  googleAuth(@Req() req) {
    // something
  }

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('callback/google')
  googleAuthCallback(@Req() req) {
    return this.authService.googleLogin(req.user);
  }
}
