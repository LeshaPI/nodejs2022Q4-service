import { Module } from '@nestjs/common';
import { Database } from './DB/db.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), Database, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
