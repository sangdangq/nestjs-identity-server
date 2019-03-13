import { UserService } from './../../user/user.service';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtPayload } from './payload.model';
import { JwtService } from '@nestjs/jwt';
import { sign, SignOptions } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly jwtOptions: SignOptions;
  private readonly jwtKey: string;
  constructor(
    @Inject(forwardRef(() => UserService))
        readonly _userService: UserService,
  ) {
    this.jwtOptions = { expiresIn: '12h' };
    this.jwtKey = 'K4ad24@$!Dpnh80-14nadhKUoqe&&BJMSSSA';
  }

  public async validateUser(payload: JwtPayload): Promise<boolean> {
    if (!payload) {
        return false;
    }
    const user = await this._userService.getUserbyEmail(payload.email);
    if (user) {
        return true;
    } else {
        return false;
    }
  }

  public async createToken(payload: JwtPayload) {
    return sign(payload, this.jwtKey, this.jwtOptions);
  }
}