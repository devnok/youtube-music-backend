import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../base/base.entity';
import { PlaylistSongs } from './playlist-songs.entity';
import { Song } from '../songs/song.entity';
import { User } from '../users/user.entity';

@Entity()
export class Playlist extends BaseEntity {
  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.playlists, { cascade: true })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @Column('uuid')
  fk_user_id: string;

  playlist_songs?: PlaylistSongs[];

  // playlist 재생 시간(분단위)
  play_time: number;
}
