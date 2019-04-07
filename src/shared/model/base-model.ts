import { prop, Typegoose } from 'typegoose';
import { SchemaOptions } from 'mongoose';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export abstract class BaseModel<T> extends Typegoose {
    @prop()
    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    createdAt?: Date;

    @prop()
    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    updatedAt?: Date;

    @ApiModelPropertyOptional()
    id?: string;
}

export const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
    },
};