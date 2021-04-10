import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

import { BaseEntity } from '../base/base.entity';
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

  @ManyToMany(() => Song)
  songs: Song[];
}
