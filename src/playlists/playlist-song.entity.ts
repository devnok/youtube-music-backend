import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../base/base.entity';
import { Playlist } from './playlist.entity';
import { PlaylistSongDto } from './dto/playlist-song.dto';
import { Song } from '../songs/song.entity';

@Entity()
export class PlaylistSong extends BaseEntity<PlaylistSongDto> {
  @ManyToOne(() => Playlist, { cascade: true, eager: true })
  @JoinColumn({ name: 'fk_playlist_id' })
  playlist: Playlist;

  @Column('uuid')
  fk_playlist_id: string;

  @ManyToOne(() => Song, { cascade: true, eager: true })
  @JoinColumn({ name: 'fk_song_id' })
  song: Song;

  @Column('uuid')
  fk_song_id: string;

  @Column('smallint')
  index: number;

  dtoClass = PlaylistSongDto;
}
