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
  async createToken(user: User) {
    const { id, email } = user;

    const payload = {
      email,
      sub: id,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '24h' });

    return {
      accessToken,
    };
  }

  async googleLogin(socialUser: SocialUser) {
    const { email } = socialUser;

    let user = await this.usersService.findOne(email);
    if (!user) {
      user = await this.usersService.create({ email });
    }

    return this.createToken(user);
  }
}
