import { CreatePlaylistDto } from './create-playlist.dto';
import { IsArray } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @IsArray()
  playlist_order: string[];
}
