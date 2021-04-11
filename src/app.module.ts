import { ConfigModule, ConfigService } from '@nestjs/config';

import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseConfig } from './config/database';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { PlaylistsModule } from './playlists/playlists.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SongService } from './song/song.service';
import { SongsService } from './songs/songs.service';
import { SongsModule } from './songs/songs.module';
import { AlbumsService } from './albums/albums.service';
import { AlbumsModule } from './albums/albums.module';
import { SongsModule } from './songs/songs.module';
import config from './config';

const entitiesPath = __dirname + '/**/*.entity.{js,ts}';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [...config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get<DatabaseConfig>('database'),
        synchronize: true,
        entities: [entitiesPath],
      }),
    }),
    UsersModule,
    AuthModule,
    PlaylistsModule,
    SongsModule,
    AlbumsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    SongService,
    SongsService,
    AlbumsService,
  ],
})
export class AppModule {}
