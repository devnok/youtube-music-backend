import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { Album } from '../albums/album.entity';
import { BaseEntity } from '../base/base.entity';
import { Song } from '../songs/song.entity';
import { User } from '../users/user.entity';

@Entity()
export class Artist extends BaseEntity {
  @Column()
  name: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @Column('uuid')
  fk_user_id: string;

  @OneToMany(() => Song, (song) => song.artist)
  songs: Song[];

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];
}
