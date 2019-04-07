import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '../database/database.module';
import { RefreshToken } from './refresh-token.model';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: RefreshToken.modelName, schema: RefreshToken.model.schema }]),
  ],
  providers: [
    RefreshTokenService,
  ],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
