import { Injectable, Request, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './playlists.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistsRepository: Repository<Playlist>,
  ) {}

  async create(user: User, createPlaylistDto: CreatePlaylistDto) {
    console.log(createPlaylistDto);
    const playlist = this.playlistsRepository.create({
      ...createPlaylistDto,
      fk_user_id: user.id,
    });
    await this.playlistsRepository.save(playlist);

    return playlist;
  }

  findAll() {
    return `This action returns all playlists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playlist`;
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
