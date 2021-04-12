import { IsUUID } from 'class-validator';

export class AppendSongDto {
  @IsUUID()
  song_id: string;

  @IsUUID()
  playlist_id: string;
}
