import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../base/base.entity';
import { Song } from '../songs/song.entity';
import { User } from '../users/user.entity';

@Entity()
export class Album extends BaseEntity {
  @Column()
  title: string;

  @ManyToMany(() => Song)
  songs: Song[];
}
