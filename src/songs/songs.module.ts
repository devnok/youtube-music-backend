import { Module } from '@nestjs/common';
import { Song } from './song.entity';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  providers: [SongsService],
})
export class SongsModule {}
