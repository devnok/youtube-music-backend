import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../base/base.entity';
import { Playlist } from './playlists.entity';
import { Song } from '../songs/song.entity';

@Entity()
@Index(['fk_playlist_id', 'fk_song_id'])
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

  @Column('smallint')
  index: number;
}
