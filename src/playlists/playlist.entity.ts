import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../base/base.entity';
import { PlaylistDto } from './dto/playlist.dto';
import { PlaylistSong } from './playlist-song.entity';
import { User } from '../users/user.entity';

@Entity()
export class Playlist extends BaseEntity<PlaylistDto> {
  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.playlists, { cascade: true })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @Column('uuid')
  fk_user_id: string;

  playlist_songs?: PlaylistSong[];

  // playlist 재생 시간(분단위)
  play_time: number;

  dtoClass = PlaylistDto;
}
