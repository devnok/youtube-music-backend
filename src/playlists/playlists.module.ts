import { Module } from '@nestjs/common';
import { Playlist } from './playlists.entity';
import { PlaylistSongs } from './playlist-songs.entity';
import { PlaylistSongsService } from './playlist-songs.service';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, PlaylistSongs])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService, PlaylistSongsService],
})
export class PlaylistsModule {}
