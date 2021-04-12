import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Album } from './album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
  ) {}

  async create(user: User, createAlbumDto: CreateAlbumDto) {
    const album = this.albumsRepository.create({
      ...createAlbumDto,
      fk_artist_id: user.artist.id,
    });
    await this.albumsRepository.save(album);

    return album;
  }

  findAll() {
    return `This action returns all albums`;
  }

  async findOne(id: string) {
    const album = await this.albumsRepository.findOne(id);

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  async update(id: string, user: User, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumsRepository.findOne(id);

    const { title } = updateAlbumDto;

    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    if (album.fk_artist_id !== user.artist.id) {
      throw new HttpException('This album is not yours', HttpStatus.FORBIDDEN);
    }

    album.title = title;

    await this.albumsRepository.save(album);

    return album;
  }

  async remove(id: string, user: User) {
    const album = await this.albumsRepository.findOne(id);

    if (!album) {
      throw new HttpException('Albums not found', HttpStatus.NOT_FOUND);
    }

    if (album.fk_artist_id !== user.artist.id) {
      throw new HttpException('This album is not yours', HttpStatus.FORBIDDEN);
    }
    await this.albumsRepository.remove(album);

    return true;
  }
}
