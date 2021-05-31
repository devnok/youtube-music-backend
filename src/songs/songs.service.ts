import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { FindSongListDto } from './dto/find-song-list.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { SongLike } from './song-like.entity';
import { Song } from './song.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songsRepository: Repository<Song>,
    @InjectRepository(SongLike)
    private readonly songLikesRepository: Repository<SongLike>,
  ) {}

  async create(user: User, createSongDto: CreateSongDto): Promise<Song> {
    const song = this.songsRepository.create({
      ...createSongDto,
      fk_artist_id: user.artist.id,
    });
    await this.songsRepository.save(song);

    return song;
  }

  async findOne(id: string): Promise<Song> {
    const song = await this.songsRepository.findOne(id);

    if (!song) {
      throw new NotFoundException('Song not found');
    }

    return song;
  }
  async findAll(options: FindSongListDto): Promise<Song[]> {
    const { title, cursor, limit } = options;
    if (limit > 100) {
      throw new BadRequestException('Max limit is 100');
    }
    const query = this.songsRepository
      .createQueryBuilder('song')
      .limit(limit)
      .orderBy('song.created_at', 'DESC')
      .leftJoinAndSelect('song.artist', 'artist');

    if (title) {
      query.andWhere('song.title = :title', { title });
    }
    // pagination
    if (cursor) {
      const song = await this.songsRepository.findOne(cursor);
      if (!song) {
        throw new HttpException('Invalid cursor', HttpStatus.BAD_REQUEST);
      }
      query.andWhere('song.created_at < :date', {
        date: song.created_at,
      });
      query.orWhere('song.created_at = :date AND song.id < :id', {
        date: song.created_at,
        id: song.id,
      });
    }
    const songs = await query.getMany();
    return songs;
  }

  async update(id: string, user: User, updateSongDto: UpdateSongDto) {
    const { title, sound_file } = updateSongDto;
    const song = await this.songsRepository.findOne(id);

    if (!song) {
      throw new NotFoundException('Song not found');
    }

    if (song.fk_artist_id !== user.artist.id) {
      throw new ForbiddenException('This song is not yours');
    }

    song.title = title ?? song.title;
    song.sound_file = sound_file ?? song.sound_file;

    await this.songsRepository.save(song);

    return song;
  }

  async remove(id: string, user: User) {
    const song = await this.songsRepository.findOne(id);

    if (!song) {
      throw new NotFoundException('Song not found');
    }

    if (song.fk_artist_id !== user.artist.id) {
      throw new ForbiddenException('This song is not yours');
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
