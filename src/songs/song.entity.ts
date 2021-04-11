import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Album } from '../albums/album.entity';
import { Artist } from '../artists/artists.entity';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  sound_file: string;

  @ManyToOne(() => Album, (album) => album.songs)
  album: Album;

  @ManyToOne(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinColumn({ name: 'fk_artist_id' })
  artist: Artist;

  @Column('uuid')
  fk_artist_id: string;
}
