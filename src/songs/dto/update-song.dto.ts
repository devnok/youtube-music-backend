import { CreateSongDto } from './create-song.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateSongDto extends PartialType(CreateSongDto) {}
