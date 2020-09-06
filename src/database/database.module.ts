import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { MongooseModule } from '@nestjs/mongoose';
const mongoConfig =
  'mongodb+srv://sangdangq:nashtechfe@cluster0.dasdv.mongodb.net/nest?retryWrites=true&w=majority';
@Module({
  imports: [MongooseModule.forRoot(mongoConfig)],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
