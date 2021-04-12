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
import { BaseEntity } from '../base/base.entity';

@Entity()
export class Song extends BaseEntity {
  @Column()
  title: string;

  @Column()
  sound_file: string;

  @ManyToOne(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinColumn({ name: 'fk_artist_id' })
  artist: Artist;

  @Column('uuid')
  fk_artist_id: string;
}
