import { ApiModelProperty } from '@nestjs/swagger';
import { ModelType, prop, Typegoose } from 'typegoose';
import { IsString, IsNumber, IsEmail } from 'class-validator';
import { SchemaOptions } from 'mongoose';

export class RefreshToken extends Typegoose{
    @prop()
    @IsEmail()
    @ApiModelProperty()
    email: string;

    @prop()
    @IsString()
    @ApiModelProperty()
    refreshToken: string;

    static get model(): ModelType<RefreshToken> {
        return new RefreshToken().getModelForClass(RefreshToken, { schemaOptions });
    }

    static get modelName(): string {
        return this.model.modelName;
    }
}

export class RefreshTokenVm {
    @IsEmail()
    @ApiModelProperty()
    email: string;

    @IsString()
    @ApiModelProperty()
    refreshToken: string;
}

export const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
    },
};
