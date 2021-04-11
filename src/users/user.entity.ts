import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Artist } from '../artists/artists.entity';
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

  @OneToOne(() => Artist, (artist) => artist.user)
  @JoinColumn({ name: 'fk_artist_id' })
  artist: Artist;

  @Column('uuid')
  fk_artist_id: string;

  // @OneToMany(() => Album, (album) => album.user)
  // albums: Album[];

  // @ManyToMany(() => Song)
  // songs: Song[];
}
