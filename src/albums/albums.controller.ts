import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthUser } from '../lib/decorator';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@AuthUser() user, @Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(user, createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumsService.findOne(id);
  }

  @Patch(':id')
  update(
    @AuthUser() user,
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumsService.update(id, user, updateAlbumDto);
  }

  @Delete(':id')
  remove(@AuthUser() user, @Param('id') id: string) {
    return this.albumsService.remove(id, user);
  }
}
