import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { Artist } from '../artists/artists.entity';
import { BaseEntity } from '../base/base.entity';
import { Playlist } from '../playlists/playlist.entity';
import { UserDto } from './dto/user.dto';

@Entity()
export class User extends BaseEntity<UserDto> {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];

  @OneToOne(() => Artist, (artist) => artist.user)
  artist: Artist;

  dtoClass = UserDto;
}
