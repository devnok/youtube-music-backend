import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './playlist.entity';
import { PlaylistSong } from './playlist-song.entity';

@Injectable()
export class PlaylistSongsService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    @InjectRepository(PlaylistSong)
    private readonly playlistSongsRepository: Repository<PlaylistSong>,
  ) {}

  async appendToPlaylist(playlistId: string, songId: string) {
    const playlist = await this.playlistRepository.findOne(playlistId);
    if (!playlist) {
      throw new HttpException('Playlist not found', HttpStatus.NOT_FOUND);
    }

    const playlistSongsList = await this.playlistSongsRepository.find({
      where: {
        fk_playlist_id: playlistId,
      },
      order: {
        index: 'ASC',
      },
    });
    const exists = playlistSongsList.find((ps) => ps.fk_song_id === songId);
    console.log(exists);
    if (exists) {
      throw new HttpException('Already added to playlist', HttpStatus.CONFLICT);
    }
    const index =
      playlistSongsList.length === 0
        ? 1
        : playlistSongsList[playlistSongsList.length - 1].index + 1;

    const playlistSongs = this.playlistSongsRepository.create({
      fk_playlist_id: playlistId,
      fk_song_id: songId,
      index,
    });
    return this.playlistSongsRepository.save(playlistSongs);
  }
  async removeFromPlaylist(playlistId: string, songId: string) {
    const playlistSongs = await this.playlistSongsRepository.findOne({
      fk_playlist_id: playlistId,
      fk_song_id: songId,
    });
    if (!playlistSongs) {
      throw new HttpException('PlaylistSongs not found', HttpStatus.NOT_FOUND);
    }

    await Promise.all([
      this.subtractIndexAfter(
        playlistSongs.fk_playlist_id,
        playlistSongs.index,
      ),
      this.playlistSongsRepository.remove(playlistSongs),
    ]);

    return true;
  }
  async subtractIndexAfter(playlistId: string, afterIndex: number) {
    return this.playlistSongsRepository
      .createQueryBuilder()
      .update(PlaylistSong)
      .set({ index: () => '`index` - 1' }) // index는 mysql 예약어라 감싸줌
      .where('fk_playlist_id = :playlistId', { playlistId })
      .andWhere('index > :afterIndex', { afterIndex })
      .execute();
  }
}
