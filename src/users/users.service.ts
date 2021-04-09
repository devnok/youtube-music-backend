import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ email });
  }

  async findOneOrCreate(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      return this.usersRepository.create({
        email,
      });
    }
    return user;
  }
}
