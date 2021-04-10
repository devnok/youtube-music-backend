import { Module } from '@nestjs/common';
import { Playlist } from './playlists.entity';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
