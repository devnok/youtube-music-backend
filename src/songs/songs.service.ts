import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './song.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songsRepository: Repository<Song>,
  ) {}

  async create(user: User, createSongDto: CreateSongDto) {
    const song = this.songsRepository.create({
      ...createSongDto,
      fk_artist_id: user.fk_artist_id,
    });
    await this.songsRepository.save(song);

    return song;
  }

  async findOne(id: string) {
    const song = await this.songsRepository.findOne(id);

    if (!song) {
      throw new HttpException('Song not found', HttpStatus.NOT_FOUND);
    }

    return song;
  }

  async update(id: string, user: User, updateSongDto: UpdateSongDto) {
    const song = await this.songsRepository.findOne(id);

    const { title, sound_file } = updateSongDto;

    if (!song) {
      throw new HttpException('Song not found', HttpStatus.NOT_FOUND);
    }

    if (song.fk_artist_id !== user.fk_artist_id) {
      throw new HttpException('This song is not yours', HttpStatus.FORBIDDEN);
    }

    song.title = title;
    song.sound_file = sound_file;

    await this.songsRepository.save(song);

    return song;
  }

  async remove(id: string, user: User) {
    const song = await this.songsRepository.findOne(id);

    if (!song) {
      throw new HttpException('Song not found', HttpStatus.NOT_FOUND);
    }

    if (song.fk_artist_id !== user.fk_artist_id) {
      throw new HttpException('This song is not yours', HttpStatus.FORBIDDEN);
    }
    await this.songsRepository.remove(song);

    return true;
  }
}
