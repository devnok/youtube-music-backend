import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

interface SocialUser {
  email: string;
  accessToken: string;
}
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async googleLogin(socialUser: SocialUser) {
    const { email } = socialUser;

    const user = await this.usersService.findOneOrCreate(email);

    console.log(user);

    const payload = {
      email,
      sub: user.id,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    // const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

    return {
      accessToken,
    };
  }
}
