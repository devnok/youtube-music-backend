import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from '../../base/dto/base.dto';
import { Playlist } from '../playlist.entity';
import { PlaylistSong } from '../playlist-song.entity';

export class PlaylistDto extends BaseDto {
  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  play_time: number;

  @ApiPropertyOptional()
  fk_user_id: string;

  @ApiPropertyOptional()
  playlist_songs?: PlaylistSong[];

  constructor(playlist: Playlist) {
    super(playlist);
    this.title = playlist.title;
    this.play_time = playlist.play_time;
    this.fk_user_id = playlist.fk_user_id;
    this.playlist_songs = playlist.playlist_songs;
  }
}
