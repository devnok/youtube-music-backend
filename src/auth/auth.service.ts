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

  async validateUser(email: string): Promise<User> {
    return this.usersService.findOneOrCreate(email);
  }

  async googleLogin(socialUser: SocialUser) {
    const { email, accessToken } = socialUser;

    const user = await this.usersService.findOneOrCreate(email);

    console.log(user);

    const payload = {
      email,
      sub: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
