import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Playlist } from '../playlists/playlists.entity';
import { Song } from './song.entity';

@Entity()
export class PlaylistSongs extends BaseEntity {
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

  @Column('int4')
  index: number;
}
