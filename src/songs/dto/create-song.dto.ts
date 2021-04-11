import { IsUrl, Length } from 'class-validator';

export class CreateSongDto {
  @IsUrl()
  sound_file: string;

  @Length(1, 150)
  title: string;
}
