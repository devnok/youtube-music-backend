import { IsUUID } from 'class-validator';

export class RemoveSongDto {
  @IsUUID()
  song_id: string;

  @IsUUID()
  playlist_id: string;
}
