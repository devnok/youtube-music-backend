import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../base/base.entity';
import { Playlist } from '../playlists/playlists.entity';

// import { Album } from 'src/albums/album.entity';
// import { Playlist } from 'src/playlists/playlists.entity';
// import { Song } from 'src/songs/song.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];

  // @OneToMany(() => Album, (album) => album.user)
  // albums: Album[];

  // @ManyToMany(() => Song)
  // songs: Song[];
}
