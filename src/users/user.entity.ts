import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Album } from 'src/albums/album.entity';
import { Playlist } from 'src/playlists/playlists.entity';
import { Song } from 'src/songs/song.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];

  @OneToMany(() => Album, (album) => album.user)
  albums: Album[];

  @ManyToMany(() => Song)
  songs: Song[];
}
