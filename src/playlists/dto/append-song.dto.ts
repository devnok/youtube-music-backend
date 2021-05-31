import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AppendSongDto {
  @ApiProperty()
  @IsUUID()
  song_id: string;

  @ApiProperty()
  @IsUUID()
  playlist_id: string;
}
