import { Module } from '@nestjs/common';
import { Database } from './DB/db.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [ConfigModule.forRoot(), Database, UsersModule, ArtistsModule, TracksModule, AlbumsModule, FavoritesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
