import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadDto } from './dto/token.payload.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

const expiresIn = 1000 * 60 * 60 * 24;
interface SocialUser {
  email: string;
  name: string;
  accessToken: string;
}
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async createToken(user: User): Promise<TokenPayloadDto> {
    const { id, email } = user;

    const payload = {
      email,
      id,
    };

    const accessToken = await this.jwtService.sign(payload, {
      expiresIn,
    });

    return new TokenPayloadDto({
      expiresIn,
      accessToken,
    });
  }

  async validateUser(userLoginDto: SocialUser) {
    const { email, name } = userLoginDto;
    let user = await this.usersService.findByEmail(email);

    if (!user) {
      user = await this.usersService.create({ email, name });
    }
    return user;
  }
}
