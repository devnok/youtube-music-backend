import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreatePlaylistDto {
  @Length(1, 150)
  @ApiProperty()
  title: string;
}
