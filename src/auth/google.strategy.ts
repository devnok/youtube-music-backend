import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('auth.google.clientID'),
      clientSecret: configService.get('auth.google.clientSecret'),
      callbackURL: configService.get('auth.redirectUri') + '/google',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { emails } = profile;
    const user = {
      email: emails[0].value,
      accessToken,
    };
    done(null, user);
  }
}
