import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Artist } from '../artists/artists.entity';
import { BaseEntity } from '../base/base.entity';

@Entity()
export class Song extends BaseEntity {
  @Column()
  title: string;

  @Column()
  sound_file: string;

  @Column({ default: 0 })
  likes: number;

  @ManyToOne(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinColumn({ name: 'fk_artist_id' })
  artist: Artist;

  @Column('uuid')
  fk_artist_id: string;
}
