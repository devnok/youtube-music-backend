import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaylistSong } from './playlist-song.entity';
import { User } from '../users/user.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './playlist.entity';
import { FindPlaylistListDto } from './dto/find-playlist-list.dto';
import { normalize } from '../lib/utils';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistsRepository: Repository<Playlist>,
    @InjectRepository(PlaylistSong)
    private readonly playlistSongsRepository: Repository<PlaylistSong>,
  ) {}
  async getPlaylistIfValid(id: string, user: User): Promise<Playlist> {
    const playlist = await this.playlistsRepository.findOne(id);

    if (!playlist) {
      throw new HttpException('Playlist not found', HttpStatus.NOT_FOUND);
    }

    if (playlist.fk_user_id !== user.id) {
      throw new HttpException(
        'This playlist is not yours',
        HttpStatus.FORBIDDEN,
      );
    }

    return playlist;
  }

  async create(user: User, createPlaylistDto: CreatePlaylistDto) {
    console.log(createPlaylistDto);
    const playlist = this.playlistsRepository.create({
      ...createPlaylistDto,
      fk_user_id: user.id,
    });
    await this.playlistsRepository.save(playlist);

    return playlist;
  }

  async findAll(options: FindPlaylistListDto) {
    const { title, cursor, limit = 20 } = options;
    if (limit > 100) {
      throw new HttpException('Max limit is 100', HttpStatus.BAD_REQUEST);
    }
    const query = this.playlistsRepository
      .createQueryBuilder('playlist')
      .limit(limit)
      .orderBy('playlist.created_at', 'DESC')
      .leftJoinAndSelect('playlist.user', 'user');

    if (title) {
      query.andWhere('playlist.title = :title', { title });
    }
    // pagination
    if (cursor) {
      const playlist = await this.playlistsRepository.findOne(cursor);
      if (!playlist) {
        throw new HttpException('Invalid cursor', HttpStatus.BAD_REQUEST);
      }
      query.andWhere('playlist.created_at < :date', {
        date: playlist.created_at,
      });
      query.orWhere('playlist.created_at = :date AND playlist.id < :id', {
        date: playlist.created_at,
        id: playlist.id,
      });
    }
    const playlists = await query.getMany();
    return playlists;
  }

  async findOne(id: string) {
    const playlist = await this.playlistsRepository.findOne(id);

    if (!playlist) {
      throw new HttpException('Playlist not found', HttpStatus.NOT_FOUND);
    }

    playlist.playlist_songs = await this.playlistSongsRepository
      .createQueryBuilder('playlist_songs')
      .leftJoinAndSelect('playlist_songs.song', 'song')
      .where('fk_playlist_id = :id', { id })
      .orderBy('`index`', 'ASC') // index는 mysql 예약어라 감싸줌
      .getMany();
    return playlist;
  }

  async update(id: string, user: User, updatePlaylistDto: UpdatePlaylistDto) {
    const playlist = await this.getPlaylistIfValid(id, user);

    const { title, playlist_order } = updatePlaylistDto;

    if (title !== playlist.title) {
      playlist.title = title;
      await this.playlistsRepository.save(playlist);
    }
    const playlistSongs = await this.playlistSongsRepository.find({
      fk_playlist_id: id,
    });

    const valid =
      playlistSongs.every((ps) => playlist_order.includes(ps.fk_song_id)) &&
      playlistSongs.length === playlist_order.length;
    if (!valid) {
      throw new HttpException(
        'Playlist order is invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const playlistSongsById = normalize(playlistSongs, (ps) => ps.fk_song_id);
    console.log(playlistSongsById);
    await Promise.all(
      playlist_order.map((id, index) => {
        const ps = playlistSongsById[id];
        if (ps.index !== index + 1) {
          ps.index = index + 1;
          return this.playlistSongsRepository.save(ps);
        }
      }),
    );

    return playlist;
  }

  async remove(id: string, user: User) {
    const playlist = await this.getPlaylistIfValid(id, user);

    await this.playlistsRepository.remove(playlist);

    return true;
  }
}
