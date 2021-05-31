import { Module } from '@nestjs/common';
import { Playlist } from './playlist.entity';
import { PlaylistSong } from './playlist-song.entity';
import { PlaylistSongsService } from './playlist-songs.service';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, PlaylistSong])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService, PlaylistSongsService],
})
export class PlaylistsModule {}
