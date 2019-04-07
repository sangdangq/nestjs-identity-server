import { Injectable, Inject, forwardRef} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto-js';
import { UUID } from 'angular2-uuid';
import { User, ResetPassword } from './user.entity';
import { UserRegister, PasswordChange, Login, RefreshTokenVm } from './../shared/model/user';
import { JwtPayload } from './../shared/auth/payload.model';
import { RefreshTokenService } from '../token/refresh-token.service';
import { RefreshToken } from '../token/refresh-token.model';

@Injectable()
export class UserService {
    constructor(
        readonly _refreshService: RefreshTokenService,
        @Inject('UserRepository') private readonly userRepo: typeof User,
        private readonly _jwtService: JwtService,
    ) {
    }
    async signUp(data: UserRegister): Promise<any> {
        let user = await this.userRepo.findOne({ where : {Email: data.email} });
        if (user) {
            return {
                isSuccessfully: false,
                message: 'User already exists',
            };
        }
        if (data.password !== data.rePassword) {
            return {
                isSuccessfully: false,
                message: 'Retype password is not match',
            };
        }
        user = new User();
        user.CustomerId = UUID.UUID();
        user.FirstName = data.firstName;
        user.LastName = data.lastName;
        user.Email = data.email;
        user.Password = data.password;
        user.PhoneNo = data.phoneNo;
        user.Gender = data.gender;
        user.DateOfBirth = data.dateOfBirth;
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

    async changePassword(data: PasswordChange): Promise<boolean> {
        const user = await this.userRepo.findOne({ where : {Email: data.email} });
        if (data.newPassword !== data.retypePassword) {
            return false;
        }
        const oldPassword = crypto.SHA256(data.oldPassword).toString();
        if (user.Password === oldPassword) {
            await this.userRepo.update({
                Password: crypto.SHA256(data.newPassword).toString(),
            },
            {
                where: {
                    Email: data.email,
                },
            });
            return true;
        }
    }

    async delete(data: Login): Promise<boolean> {
        const user = await this.userRepo.findOne({ where : {Email: data.email} });
        data.password = crypto.SHA256(data.password).toString();
        if (user && user.Password === data.password) {
            await this.userRepo.destroy({
                where: {Email: user.Email},
            });
            return true;
        }
        return false;
    }

    async login(login: Login ): Promise<any> {
        const user = await this.userRepo.findOne({ where : {Email: login.email} });
        const hashPwd = crypto.SHA256(login.password).toString();
        if (user && user.Password === hashPwd) {
            const refreshTokenCode = this.generateRefreshToken(user.Email);
            const payload: JwtPayload = {
                email: user.Email,
                firstName: user.FirstName,
                lastName: user.LastName,
                role: 'member',
            };
            const tokenCode = this._jwtService.sign(payload);
            const refreshRecord: RefreshTokenVm = {
                email: user.Email,
                refreshToken: refreshTokenCode,
            };
            await this._refreshService.delete(user.Email);
            this._refreshService.create(refreshRecord);
            return {
                refreshToken: refreshTokenCode,
                token: tokenCode,
                expiredIn: 3600,
            };
        }
    }

    async resetPassword(emailData: string): Promise<boolean> {
        const user = await this.userRepo.findOne({
            where: { Email: emailData },
        });
        if (user) {
            const date = new Date().getUTCMilliseconds();
            const hashString = [user.Email, date].join();
            const key = crypto.SHA256(hashString);
            const resetEnt = new ResetPassword();
            resetEnt.email = user.Email;
            resetEnt.key = key.toString();
            await resetEnt.save();
            return true;
        }
        return false;
    }

    async getUserInfo(email: string): Promise<any> {
        const user = await this.userRepo.findOne({
            where: { Email: email},
        });
        return {
            email: user.Email,
            firstName: user.FirstName,
            phoneNo: user.PhoneNo,
        };
    }

    getUserbyEmail(userEmail: string): any {
        return this.userRepo.findOne({
            where: { Email: userEmail },
        });
    }

    generateRefreshToken(email: string): string {
        const date = new Date().toString();
        const valueHash = date + email;
        return crypto.SHA256(valueHash).toString();
    }

    async refreshToken(refreshInfo: RefreshToken) {
        const isValid = await this._refreshService.validateRefreshToken(refreshInfo);
        if (isValid) {
            const user = await this.userRepo.findOne({ where : {Email: refreshInfo.email} });
            const refreshTokenCode = this.generateRefreshToken(user.Email);
            const payload: JwtPayload = {
                email: user.Email,
                firstName: user.FirstName,
                lastName: user.LastName,
                role: 'member',
            };
            const tokenCode = this._jwtService.sign(payload);
            const refreshRecord: RefreshTokenVm = {
                email: user.Email,
                refreshToken: refreshTokenCode,
            };
            await this._refreshService.delete(user.Email);
            this._refreshService.create(refreshRecord);
            return {
                refreshToken: refreshTokenCode,
                token: tokenCode,
                expiredIn: 3600,
            };
        }
    }
}