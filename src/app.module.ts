import { Module } from '@nestjs/common';
import { Database } from './DB/db.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [ConfigModule.forRoot(), Database, UsersModule, ArtistsModule, TracksModule, AlbumsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
