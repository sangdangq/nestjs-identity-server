import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto-js';
import { UUID } from 'angular2-uuid';
import { User, ResetPassword } from './user.entity';
import {
  UserRegister,
  PasswordChange,
  Login,
  RefreshTokenVm,
  UserUpdate,
} from './../shared/model/user';
import { JwtPayload } from './../shared/auth/payload.model';
import { RefreshTokenService } from '../token/refresh-token.service';
import { RefreshToken } from '../token/refresh-token.model';
import { GoogleTokenInfo } from './../models/google-token-info.model';
import { GOOGLE_TOKEN_VERIFY } from './../constant/id-token-verify';

@Injectable()
export class UserService {
  constructor(
    readonly _refreshService: RefreshTokenService,
    @Inject('UserRepository') private readonly userRepo: typeof User,
    private readonly _jwtService: JwtService,
  ) {}
  async signUp(data: UserRegister): Promise<any> {
    let user = await this.userRepo.findOne({ where: { email: data.email } });
    if (user) {
      return {
        isSuccessfully: true,
        message: 'User already exists',
      };
    }
    if (data.password !== data.confirmpassword) {
      return {
        isSuccessfully: true,
        message: 'Retype password is not match',
      };
    }
    user = new User();
    user.uid = UUID.UUID();
    user.address1 = data.address1;
    user.address2 = data.address2 ? data.address2 : '';
    user.agreement = data.agreement;
    user.birthday = data.birthday;
    (user.city = data.city),
      (user.company = data.company ? data.company : ''),
      (user.country = data.country),
      (user.email = data.email),
      (user.firstname = data.firstname),
      (user.gender = data.gender),
      (user.lastname = data.lastname),
      (user.password = data.password),
      (user.phone = data.phone),
      (user.postcode = data.postcode),
      (user.regionstate = data.regionstate),
      await user.save().catch(err => {
        return {
          isSuccessfully: false,
          message: 'Register failed',
        };
      });
    return {
      isSuccessfully: true,
      message: 'Successfully',
    };
  }

  async updateProfile(data: UserUpdate): Promise<any> {
    const user = await this.userRepo.findOne({ where: { email: data.email } });
    if (data.newPassword !== data.confirmPassword) {
      return {
        isSuccess: true,
        message: 'Confirm password is not match',
      };
    }
    const hashPassword = crypto.SHA256(data.password).toString();
    if (user) {
      if (hashPassword !== user.password) {
        return {
          isSuccess: false,
        };
      }
    } else {
      return {
        isSuccess: false,
      };
    }

    await this.userRepo.update(
      {
        address1: data.address1,
        address2: data.address2,
        agreement: data.agreement,
        birthday: data.birthday,
        city: data.city,
        company: data.company,
        country: data.country,
        firstname: data.firstname,
        gender: data.gender,
        lastname: data.lastname,
        phone: data.phone,
        postcode: data.postcode,
        regionstate: data.regionstate,
        password: crypto.SHA256(data.newPassword).toString(),
      },
      {
        where: {
          email: data.email,
        },
      },
    );
    return {
      isSuccess: true,
      message: 'User profile is updated successfully',
    };
  }

  async delete(data: Login): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { email: data.email } });
    data.password = crypto.SHA256(data.password).toString();
    if (user && user.password === data.password) {
      await this.userRepo.destroy({
        where: { email: user.email },
      });
      return true;
    }
    return false;
  }

  async login(login: Login): Promise<any> {
    const user = await this.userRepo.findOne({ where: { email: login.email } });
    const hashPwd = crypto.SHA256(login.password).toString();
    if (user && user.password === hashPwd) {
      return this.createUserClaim(user);
    }
  }

  async resetPassword(emailData: string): Promise<boolean> {
    const user = await this.userRepo.findOne({
      where: { email: emailData },
    });
    if (user) {
      const date = new Date().getUTCMilliseconds();
      const hashString = [user.email, date].join();
      const key = crypto.SHA256(hashString);
      const resetEnt = new ResetPassword();
      resetEnt.email = user.email;
      resetEnt.key = key.toString();
      await resetEnt.save();
      return true;
    }
    return false;
  }

  async getUserInfo(emailInfo: string): Promise<any> {
    const user = await this.userRepo.findOne({
      where: { email: emailInfo },
    });
    return {
      address1: user.address1,
      address2: user.address2,
      agreement: user.agreement,
      birthday: user.birthday,
      city: user.city,
      company: user.company,
      country: user.country,
      email: user.email,
      firstname: user.firstname,
      gender: user.gender,
      lastname: user.lastname,
      phone: user.phone,
      postcode: user.postcode,
      regionstate: user.regionstate,
    };
  }

  getUserbyEmail(userEmail: string): any {
    return this.userRepo.findOne({
      where: { email: userEmail },
    });
  }

  generateRefreshToken(email: string): string {
    const date = new Date().toString();
    const valueHash = date + email;
    return crypto.SHA256(valueHash).toString();
  }

  async refreshToken(refreshInfo: RefreshToken) {
    const isValid = await this._refreshService.validateRefreshToken(
      refreshInfo,
    );
    if (isValid) {
      const user = await this.userRepo.findOne({
        where: { email: refreshInfo.email },
      });
      return this.createUserClaim(user);
    }
  }

  async loginByGoogle(
    idToken: string,
  ): Promise<{
    isSuccess: boolean;
    claims?: any;
  }> {
    if (!this.isValidateToken(idToken)) {
      return {
        isSuccess: false,
      };
    }
    const tokenInfo = this._jwtService.decode(idToken) as GoogleTokenInfo;
    const user = await this.userRepo.findOne({
      where: { email: tokenInfo.email },
    });
    if (!user) {
      return {
        isSuccess: false,
      };
    }
    const claims = await this.createUserClaim(user);
    return {
      isSuccess: true,
      claims,
    };
  }

  private isValidateToken(idToken: string): boolean {
    // const isValidToken = this._jwtService.verify(idToken, );
    // if (!isValidToken) {
    //   return false;
    // }
    const tokenInfo = this._jwtService.decode(idToken) as GoogleTokenInfo;

    if (
      tokenInfo.aud !== GOOGLE_TOKEN_VERIFY.aud ||
      tokenInfo.iss !== GOOGLE_TOKEN_VERIFY.iss
    ) {
      return false;
    }
    return true;
  }

  private async createUserClaim(user: User) {
    const refreshTokenCode = this.generateRefreshToken(user.email);
    const payload: JwtPayload = {
      address1: user.address1,
      address2: user.address2,
      agreement: user.agreement,
      birthday: user.birthday,
      city: user.city,
      company: user.company,
      country: user.country,
      email: user.email,
      firstname: user.firstname,
      gender: user.gender,
      lastname: user.lastname,
      phone: user.phone,
      postcode: user.postcode,
      regionstate: user.regionstate,
    };
    const tokenCode = this._jwtService.sign(payload);
    const refreshRecord: RefreshTokenVm = {
      email: user.email,
      refreshToken: refreshTokenCode,
    };
    await this._refreshService.delete(user.email);
    this._refreshService.create(refreshRecord);
    return {
      refreshToken: refreshTokenCode,
      token: tokenCode,
      expiredIn: '1h',
    };
  }
}
