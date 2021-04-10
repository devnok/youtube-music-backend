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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
