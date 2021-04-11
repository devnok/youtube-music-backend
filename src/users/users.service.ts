import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '../artists/artists.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  async findOne(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, name } = createUserDto;

    const exists = await this.usersRepository.findOne({ email });
    if (exists) {
      throw new HttpException('Already Exists', HttpStatus.CONFLICT);
    }

    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);

    const artist = this.artistsRepository.create({
      fk_user_id: user.id,
      name,
    });
    await this.artistsRepository.save(artist);

    return {
      ...user,
      artist,
    };
  }
}
