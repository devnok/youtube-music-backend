import { Length } from 'class-validator';

export class CreatePlaylistDto {
  @Length(1, 150)
  title: string;
}
