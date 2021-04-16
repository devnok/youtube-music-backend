import { Module } from '@nestjs/common';
import { Song } from './song.entity';
import { SongLike } from './song-like.entity';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Song, SongLike])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
