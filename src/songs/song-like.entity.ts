import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { BaseEntity } from '../base/base.entity';
import { Song } from './song.entity';
import { User } from '../users/user.entity';

@Entity()
@Index(['fk_user_id', 'fk_song_id'], { unique: true })
export class SongLike extends BaseEntity {
  @Index()
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @Column('uuid')
  fk_user_id: string;

  @ManyToOne(() => Song, { cascade: true })
  @JoinColumn({ name: 'fk_song_id' })
  song: Song;

  @Column('uuid')
  fk_song_id: string;
}
