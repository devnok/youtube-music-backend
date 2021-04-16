import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { User } from '../lib/decorator';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@User() user, @Body() createSongDto: CreateSongDto) {
    return this.songsService.create(user, createSongDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(id);
  }

  @Patch(':id')
  update(
    @User() user,
    @Param('id') id: string,
    @Body() updateSongDto: UpdateSongDto,
  ) {
    return this.songsService.update(id, user, updateSongDto);
  }

  @Delete(':id')
  remove(@User() user, @Param('id') id: string) {
    return this.songsService.remove(id, user);
  }

  @Post('like/:id')
  like(@User() user, @Param('id') id: string) {
    return this.songsService.like(id, user);
  }

  @Post('unlike/:id')
  unlike(@User() user, @Param('id') id: string) {
    return this.songsService.unlike(id, user);
  }
}
