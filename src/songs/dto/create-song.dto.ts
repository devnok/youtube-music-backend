import { IsUrl, Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateSongDto {
  @ApiProperty({
    description: 'The url of its sound file',
  })
  @IsUrl()
  sound_file: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 150,
  })
  @Length(1, 150)
  title: string;
}
