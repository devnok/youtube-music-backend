import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Album } from 'src/albums/album.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => User)
  @JoinTable()
  artists: User[];

  @ManyToOne(() => Album, (album) => album.songs)
  album: Album;
}
