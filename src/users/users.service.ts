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

  async findOne(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ id });
  }

  async findOneOrCreate(email: string): Promise<User> {
    let user = await this.usersRepository.findOne({ email });
    if (!user) {
      user = new User();
      user.email = email;
      return this.usersRepository.save(user);
    }
    return user;
  }
}
