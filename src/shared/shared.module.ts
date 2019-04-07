import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
    imports: [UserModule],
    providers: [
        AuthService,
        JwtStrategy,
    ],
    exports: [AuthService],
})
export class SharedModule {}