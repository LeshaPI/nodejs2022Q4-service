import { Module } from '@nestjs/common';
import { Database } from './DB/db.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [ConfigModule.forRoot(), Database, UsersModule, ArtistsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
