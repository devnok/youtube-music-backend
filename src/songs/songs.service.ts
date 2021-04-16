import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { SongLike } from './song-like.entity';
import { Song } from './song.entity';

@Injectable()
export class SongsService {
  constructor(
    private connection: Connection,
    @InjectRepository(Song)
    private readonly songsRepository: Repository<Song>,
    @InjectRepository(SongLike)
    private readonly songLikesRepository: Repository<SongLike>,
  ) {}

  async create(user: User, createSongDto: CreateSongDto) {
    const song = this.songsRepository.create({
      ...createSongDto,
      fk_artist_id: user.artist.id,
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

    if (song.fk_artist_id !== user.artist.id) {
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

    if (song.fk_artist_id !== user.artist.id) {
      throw new HttpException('This song is not yours', HttpStatus.FORBIDDEN);
    }
    await this.songsRepository.remove(song);

    return true;
  }
  // 실패 시 false, 성공 시 true
  // count가 cost가 많이 필요한 query일시 transaction 방식 이용 예정
  async like(id: string, user: User) {
    const song = await this.findOne(id);

    const alreadyLiked = await this.songLikesRepository.findOne({
      fk_song_id: id,
      fk_user_id: user.id,
    });

    if (alreadyLiked) {
      return false;
    }

    const songLike = this.songLikesRepository.create({
      fk_song_id: id,
      fk_user_id: user.id,
    });
    await this.songLikesRepository.save(songLike);

    await this.reloadLikeCount(song);

    return true;
  }
  async unlike(id: string, user: User) {
    const song = await this.findOne(id);

    const songLike = await this.songLikesRepository.findOne({
      fk_song_id: id,
      fk_user_id: user.id,
    });

    if (!songLike) {
      return false;
    }

    await this.songLikesRepository.remove(songLike);

    await this.reloadLikeCount(song);

    return true;
  }
  private async reloadLikeCount(song: Song) {
    const count = await this.songLikesRepository.count({
      fk_song_id: song.id,
    });

    song.likes = count;
    await this.songsRepository.save(song);
  }
}
