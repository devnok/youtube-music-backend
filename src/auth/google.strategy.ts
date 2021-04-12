import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

type GoogleProfile = {
  id: string;
  displayName?: string;
  name?: {
    familyName: string;
    givenName: string;
  };
  emails: {
    value: string;
    verified: boolean;
  }[];
  photos?: {
    value: string;
  }[];
};

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
    profile: GoogleProfile,
    done: VerifyCallback,
  ): Promise<any> {
    console.log(profile);
    const { emails, displayName } = profile;
    const user = {
      email: emails[0].value,
      name: displayName,
      accessToken,
    };
    done(null, user);
  }
}
