import { HttpException, HttpStatus } from '@nestjs/common';
import { MockRepository, mockRepository } from '../lib/mocks';

import { Artist } from '../artists/artists.entity';
import Faker from 'faker';
import { Song } from './song.entity';
import { SongLike } from './song-like.entity';
import { SongsService } from './songs.service';
import { Test } from '@nestjs/testing';
import { User } from '../users/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SongsService', () => {
  let songsService: SongsService;
  let songsRepository: MockRepository<Song>;
  let songLikesRepository: MockRepository<SongLike>;
  let user: User;
  beforeEach(async () => {
    user = new User();
    user.id = Faker.datatype.uuid();
    const artist = new Artist();
    artist.id = Faker.datatype.uuid();
    user.artist = artist;

    const module = await Test.createTestingModule({
      providers: [
        SongsService,
        {
          provide: getRepositoryToken(Song),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(SongLike),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    songsService = module.get<SongsService>(SongsService);
    songsRepository = module.get<MockRepository<Song>>(
      getRepositoryToken(Song),
    );
    songLikesRepository = module.get<MockRepository<SongLike>>(
      getRepositoryToken(SongLike),
    );
  });

  describe('when create a song', () => {
    it('should throw an error when no title provided', async () => {
      const title = '';
      const sound_file = Faker.internet.url();

      try {
        await songsService.create(user, { title, sound_file });
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect((e as HttpException).getStatus).toBe(HttpStatus.NOT_FOUND);
      }
    });
    it('should return a song', async () => {
      const title = Faker.lorem.sentence();
      const sound_file = Faker.internet.url();

      const createSongDto = {
        sound_file,
        title,
      };
      jest.spyOn(songsRepository, 'create').mockReturnValue(createSongDto);

      const result = await songsService.create(user, createSongDto);

      expect(result).toEqual(createSongDto);
    });
  });
  describe('when update a song', () => {
    describe('with correct parameters', () => {
      // it('should return an error when the user does not own the song', async () => {
      //   oldSong.fk_artist_id = user.id + '1';

      //   jest.spyOn(songsRepository, 'findOne').mockResolvedValue(oldSong);
      //   try {
      //     await songsService.update(user, updateSongDto);
      //   } catch (e) {
      //     expect(e).toBeInstanceOf(HttpException);
      //     expect((e as HttpException).getStatus).toBe(HttpStatus.FORBIDDEN);
      //   }
      // });
      it('should return a song', async () => {
        const id = Faker.datatype.uuid();
        const title = Faker.lorem.sentence();
        const sound_file = Faker.internet.url();

        const oldSong = {
          id,
          title: Faker.lorem.word(),
          fk_artist_id: '',
          sound_file: Faker.internet.url(),
        };
        const newSong = {
          id,
          title,
          fk_artist_id: user.artist.id,
          sound_file,
        };
        const updateSongDto = {
          id,
          title,
          sound_file,
        };
        oldSong.fk_artist_id = user.artist.id;

        jest.spyOn(songsRepository, 'findOne').mockResolvedValue(oldSong);
        const result = await songsService.update(user, updateSongDto);
        expect(result).toEqual(newSong);
      });
    });
  });
});
