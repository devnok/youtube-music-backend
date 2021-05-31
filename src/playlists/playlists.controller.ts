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
import { Public, AuthUser } from '../lib/decorator';
import { PlaylistSongsService } from './playlist-songs.service';

import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AppendSongDto } from './dto/append-song.dto';
import { RemoveSongDto } from './dto/remove-song.dto';
import { FindPlaylistListDto } from './dto/find-playlist-list.dto';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PlaylistDto } from './dto/playlist.dto';
import { ForbiddenException } from '../exception/forbidden.exception';
import { NotFoundException } from '../exception/not-found.exception';
import { ConflictException } from '../exception/conflict.exception';
import { PlaylistSongDto } from './dto/playlist-song.dto';

@ApiBearerAuth()
@ApiTags('Playlists')
@Controller('playlists')
export class PlaylistsController {
  constructor(
    private readonly playlistsService: PlaylistsService,
    private readonly playlistSongsService: PlaylistSongsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: PlaylistDto,
  })
  async create(
    @AuthUser() user,
    @Body() createPlaylistDto: CreatePlaylistDto,
  ): Promise<PlaylistDto> {
    const playlist = await this.playlistsService.create(
      user,
      createPlaylistDto,
    );
    return playlist.toDto();
  }
  @Post('append')
  @ApiNotFoundResponse({
    type: NotFoundException,
  })
  @ApiConflictResponse({
    type: ConflictException,
  })
  @ApiOkResponse({
    type: PlaylistSongDto,
  })
  appendSong(@Body() appendSongDto: AppendSongDto): Promise<PlaylistSongDto> {
    const { song_id, playlist_id } = appendSongDto;
    return this.playlistSongsService.appendToPlaylist(playlist_id, song_id);
  }

  @Delete('subtract')
  @ApiNotFoundResponse({
    type: NotFoundException,
  })
  @ApiOkResponse({
    type: Boolean,
  })
  subtractSong(@Body() removeSongDto: RemoveSongDto): Promise<boolean> {
    const { song_id, playlist_id } = removeSongDto;
    return this.playlistSongsService.removeFromPlaylist(playlist_id, song_id);
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({
    type: PlaylistDto,
  })
  async findOne(@Param('id') id: string): Promise<PlaylistDto> {
    const playlist = await this.playlistsService.findOne(id);
    return playlist.toDto();
  }

  @Get()
  @ApiOkResponse({
    type: [PlaylistDto],
  })
  async findAll(@Body() options: FindPlaylistListDto): Promise<PlaylistDto[]> {
    const playlists = await this.playlistsService.findAll(options);
    return playlists.toDtos();
  }

  @Patch(':id')
  @ApiForbiddenResponse({
    type: ForbiddenException,
  })
  @ApiNotFoundResponse({
    type: NotFoundException,
  })
  @ApiOkResponse({
    type: PlaylistDto,
  })
  async update(
    @AuthUser() user,
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<PlaylistDto> {
    const playlist = await this.playlistsService.update(
      id,
      user,
      updatePlaylistDto,
    );
    return playlist.toDto();
  }

  @Delete(':id')
  @ApiForbiddenResponse({
    type: ForbiddenException,
  })
  @ApiNotFoundResponse({
    type: NotFoundException,
  })
  @ApiOkResponse({
    type: Boolean,
  })
  remove(@AuthUser() user, @Param('id') id: string): Promise<boolean> {
    return this.playlistsService.remove(id, user);
  }
}
