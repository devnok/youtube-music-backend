import { Artist } from '../artists/artists.entity';
import { AuthService } from './auth.service';
import Faker from 'faker';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepository } from '../lib/mocks';
import mockedJwtService from '../lib/mocks/jwt.service';

describe('AuthService', () => {
  let authService: AuthService;
  let sign: jest.Mock;
  beforeEach(async () => {
    sign = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Artist),
          useValue: mockRepository(),
        },
        AuthService,
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('when create a token', () => {
    let user: User;
    beforeEach(() => {
      user = new User();
      user.id = Faker.datatype.uuid();
    });
    it('should return a string', async () => {
      const token = await authService.createToken(user);
      expect(token.accessToken).toEqual(expect.any(String));
    });
  });
});
