import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // @ManyToOne(() => User, (user) => user.playlists)
  // user: User;

  @ManyToMany(() => Song)
  songs: Song[];
}
