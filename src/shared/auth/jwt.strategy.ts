import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './payload.model';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'K4ad24@$!Dpnh80-14nadhKUoqe&&BJMSSSA',
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload) {
      throw new UnauthorizedException();
    }
    const isValidUser = await this.authService.validateUser(payload);
    if (!isValidUser) {
      throw new UnauthorizedException();
    }
    return true;
  }
}