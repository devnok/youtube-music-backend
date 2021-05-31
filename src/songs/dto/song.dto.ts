import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from '../../base/dto/base.dto';
import { Song } from '../song.entity';

export class SongDto extends BaseDto {
  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  sound_file: string;

  @ApiPropertyOptional()
  likes: number;

  @ApiPropertyOptional()
  fk_artist_id: string;

  constructor(song: Song) {
    super(song);
    this.title = song.title;
    this.sound_file = song.sound_file;
    this.likes = song.likes;
    this.fk_artist_id = song.fk_artist_id;
  }
}
