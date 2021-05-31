import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from '../../base/dto/base.dto';
import { PlaylistSong } from '../playlist-song.entity';

export class PlaylistSongDto extends BaseDto {
  @ApiPropertyOptional()
  fk_playlist_id: string;

  @ApiPropertyOptional()
  fk_song_id: string;

  @ApiPropertyOptional()
  index: number;

  constructor(playlistSong: PlaylistSong) {
    super(playlistSong);
    this.fk_playlist_id = playlistSong.fk_playlist_id;
    this.fk_song_id = playlistSong.fk_song_id;
    this.index = playlistSong.index;
  }
}
