import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.provider';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RefreshTokenModule } from 'token/refresh-token.module';

@Module({
    controllers: [UserController],
    providers: [
        UserService,
    ...userProviders],
    imports: [
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: 'K4ad24@$!Dpnh80-14nadhKUoqe&&BJMSSSA',
            signOptions: { expiresIn: '1h' },
        }),
        RefreshTokenModule,
    ],
    exports: [
        UserService,
    ],
})
export class UserModule {}
