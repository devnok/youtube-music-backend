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
import { AuthUser } from '../lib/decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FindSongListDto } from './dto/find-song-list.dto';
import { SongDto } from './dto/song.dto';
import { StatusCode } from '../base/constants/status-code';
import { ForbiddenException } from '../exception/forbidden.exception';
import { NotFoundException } from '../exception/not-found.exception';

@ApiBearerAuth()
@ApiTags('Songs')
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  @ApiCreatedResponse({
    type: SongDto,
  })
  async create(
    @AuthUser() user,
    @Body() createSongDto: CreateSongDto,
  ): Promise<SongDto> {
    const song = await this.songsService.create(user, createSongDto);
    return song.toDto();
  }

  @Get()
  @ApiOkResponse({
    type: [SongDto],
  })
  async findAll(@Body() options: FindSongListDto): Promise<SongDto[]> {
    const songs = await this.songsService.findAll(options);
    return songs.toDtos();
  }

  @Get(':id')
  @ApiOkResponse({
    type: SongDto,
  })
  async findOne(@Param('id') id: string): Promise<SongDto> {
    const song = await this.songsService.findOne(id);
    return song.toDto();
  }

  @Patch(':id')
  @ApiQuery({ name: 'statusCode', enum: StatusCode, isArray: true })
  @ApiForbiddenResponse({
    type: ForbiddenException,
  })
  @ApiNotFoundResponse({
    type: NotFoundException,
  })
  @ApiOkResponse({
    type: SongDto,
  })
  update(
    @AuthUser() user,
    @Param('id') id: string,
    @Body() updateSongDto: UpdateSongDto,
  ) {
    return this.songsService.update(id, user, updateSongDto);
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
  remove(@AuthUser() user, @Param('id') id: string) {
    return this.songsService.remove(id, user);
  }

  @Post('like/:id')
  @ApiNotFoundResponse({
    type: NotFoundException,
  })
  @ApiOkResponse({
    type: Boolean,
  })
  like(@AuthUser() user, @Param('id') id: string) {
    return this.songsService.like(id, user);
  }

  @Post('unlike/:id')
  @ApiNotFoundResponse({
    type: NotFoundException,
  })
  @ApiOkResponse({
    type: Boolean,
  })
  unlike(@AuthUser() user, @Param('id') id: string) {
    return this.songsService.unlike(id, user);
  }
}
