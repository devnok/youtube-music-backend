import { Artist } from '../artists/artists.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Artist])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
