import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public, AuthUser } from '../lib/decorator';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/login.payload.dto';
import { GoogleAuthGuard } from './google-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('login/google')
  googleAuth() {}

  @ApiCreatedResponse({})
  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('callback/google')
  async googleAuthCallback(@Req() req): Promise<LoginPayloadDto> {
    const user = await this.authService.validateUser(req.user);

    const token = await this.authService.createToken(user);
    return new LoginPayloadDto(user.toDto(), token);
  }

  @Get('me')
  @ApiOkResponse({ type: UserDto, description: 'current user info' })
  getCurrentUser(@AuthUser() user: User) {
    return user.toDto();
  }
}
