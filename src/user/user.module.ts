import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.provider';

@Module({
    imports: [
        DatabaseModule,
    ],
    providers: [
        UserService,
    ...userProviders],
    controllers: [UserController],
    exports: [
        UserService,
    ],
})
export class UserModule {}
