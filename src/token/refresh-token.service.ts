import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { RefreshToken, RefreshTokenVm } from './refresh-token.model';

@Injectable()
export class RefreshTokenService {
    constructor(
        @InjectModel(RefreshToken.modelName) private readonly refreshTokenModel: ModelType<RefreshToken>,
    ) {}

    async create(refreshToken: RefreshTokenVm) {
        const token = new this.refreshTokenModel(refreshToken);
        return token.save();
    }

    async validateRefreshToken(refreshTokenInfo: RefreshTokenVm) {
        const info = await this.refreshTokenModel.findOne({email: refreshTokenInfo.email});
        if (info && info.refreshToken === refreshTokenInfo.refreshToken) {
            return true;
        }
        return false;
    }

    async delete(emailInfo: string) {
        return this.refreshTokenModel.deleteOne({email: emailInfo});
    }
}
