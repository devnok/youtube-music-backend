import {
  HttpException,
  HttpStatus,
  Injectable,
  Request,
  UseGuards,
} from '@nestjs/common';
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

  findOne(id: string) {
    return `This action returns a #${id} playlist`;
  }

  async update(id: string, user: User, updatePlaylistDto: UpdatePlaylistDto) {
    const playlist = await this.playlistsRepository.findOne(id);

    const { title } = updatePlaylistDto;

    if (!playlist) {
      throw new HttpException('Playlist not found', HttpStatus.NOT_FOUND);
    }

    if (playlist.fk_user_id !== user.id) {
      throw new HttpException(
        'This playlist is not yours',
        HttpStatus.FORBIDDEN,
      );
    }

    playlist.title = title;

    await this.playlistsRepository.save(playlist);

    return playlist;
  }

  async remove(id: string, user: User) {
    const playlist = await this.playlistsRepository.findOne(id);

    if (!playlist) {
      throw new HttpException('Playlist not found', HttpStatus.NOT_FOUND);
    }
    console.log(user.id, playlist.fk_user_id);
    if (playlist.fk_user_id !== user.id) {
      throw new HttpException(
        'This playlist is not yours',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.playlistsRepository.remove(playlist);

    return true;
  }
}
