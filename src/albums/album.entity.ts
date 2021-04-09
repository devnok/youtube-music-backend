import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // @ManyToOne(() => User, (user) => user.albums)
  // user: User;

  @OneToMany(() => Song, (song) => song.album)
  songs: Song[];
}
