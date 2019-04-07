import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { MongooseModule } from '@nestjs/mongoose';
const mongoConfig = 'mongodb://heroku_nz29xcb8:agud4d14kekc2955rgqroci69h@ds213896.mlab.com:13896/heroku_nz29xcb8';
@Module({
  imports: [MongooseModule.forRoot(mongoConfig)],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})

export class DatabaseModule {}