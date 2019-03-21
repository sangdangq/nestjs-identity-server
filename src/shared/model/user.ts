import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, Length, IsNotEmpty, IsEmail, IsNumber, IsDate } from 'class-validator';

export class UserRegister {
    @ApiModelPropertyOptional()
    customerId?: string;

    @IsString()
    @ApiModelProperty()
    lastName: string;

    @IsString()
    @ApiModelProperty()
    firstName: string;

    @IsString()
    @ApiModelProperty()
    email: string;

    @IsString()
    @ApiModelProperty()
    password: string;

    @IsString()
    @ApiModelProperty()
    rePassword: string;

    @IsString()
    @ApiModelProperty()
    phoneNo: string;

    @IsNumber()
    @ApiModelProperty()
    gender: number;

    @IsDate()
    @ApiModelProperty()
    dateOfBirth: Date;
}

export class PasswordChange {
    @ApiModelProperty()
    email: string;
    @ApiModelProperty()
    oldPassword: string;
    @ApiModelProperty()
    newPassword: string;
    @ApiModelProperty()
    retypePassword: string;
}

export class Login {
    @IsEmail()
    @ApiModelProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    password: string;
}

export class UserClaim {
    @ApiModelProperty()
    email: string;

    @ApiModelProperty()
    firstName: string;

    @ApiModelProperty()
    phoneNo: string;
}

export class ResetPassword {
    @IsEmail()
    @ApiModelProperty()
    email: string;
}