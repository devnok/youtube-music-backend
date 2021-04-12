import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { User } from '../lib/decorator';
import { PlaylistSongsService } from './playlist-songs.service';

import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AppendSongDto } from './dto/append-song.dto';
import { RemoveSongDto } from './dto/remove-song.dto';
import { FindPlaylistListDto } from './dto/find-playlist-list.dto';

@Controller('playlists')
export class PlaylistsController {
  constructor(
    private readonly playlistsService: PlaylistsService,
    private readonly playlistSongsService: PlaylistSongsService,
  ) {}

  @Post()
  create(@User() user, @Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistsService.create(user, createPlaylistDto);
  }
  @Post('append')
  appendSong(@Body() appendSongDto: AppendSongDto) {
    const { song_id, playlist_id } = appendSongDto;
    return this.playlistSongsService.appendToPlaylist(playlist_id, song_id);
  }
  @Delete('subtract')
  subtractSong(@Body() removeSongDto: RemoveSongDto) {
    const { song_id, playlist_id } = removeSongDto;
    return this.playlistSongsService.removeFromPlaylist(playlist_id, song_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistsService.findOne(id);
  }

  @Get('')
  findAll(@Body() options: FindPlaylistListDto) {
    return this.playlistsService.findAll(options);
  }

  @Patch(':id')
  update(
    @User() user,
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistsService.update(id, user, updatePlaylistDto);
  }

  @Delete(':id')
  remove(@User() user, @Param('id') id: string) {
    return this.playlistsService.remove(id, user);
  }
}
