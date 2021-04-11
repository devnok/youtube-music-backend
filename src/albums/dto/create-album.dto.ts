import { Length } from 'class-validator';

export class CreateAlbumDto {
  @Length(1, 150)
  title: string;
}
