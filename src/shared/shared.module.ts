import { UserModule } from 'user/user.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
    providers: [
        AuthService,
        JwtStrategy,
    ],
    exports: [AuthService],
    imports: [
        UserModule,
    ],
})
export class SharedModule {}