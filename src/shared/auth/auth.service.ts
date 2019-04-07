import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtPayload } from './payload.model';
import { UserService } from './../../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
        readonly userService: UserService,
  ) {}

  public async validateUser(payload: JwtPayload): Promise<boolean> {
    console.log(payload);
    if (!payload) {
        return false;
    }
    const user = await this.userService.getUserbyEmail(payload.email);
    if (user) {
        return true;
    } else {
        return false;
    }
  }
}