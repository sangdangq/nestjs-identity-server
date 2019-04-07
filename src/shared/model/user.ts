import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, Length, IsNotEmpty, IsEmail, IsNumber, IsDate, IsDateString, IsPhoneNumber, IsMobilePhone } from 'class-validator';

export class UserRegister {
    @IsString()
    @ApiModelProperty()
    firstName: string;

    @IsString()
    @ApiModelProperty()
    lastName: string;

    @IsEmail()
    @ApiModelProperty({example: 'user001@gmail.com'})
    email: string;

    @IsString()
    @ApiModelProperty()
    password: string;

    @IsString()
    @ApiModelProperty()
    rePassword: string;

    @IsPhoneNumber('vi-VN', {message: '+84 prefix must be'})
    @ApiModelProperty({example: '+84333444555'})
    phoneNo: string;

    @IsNumber()
    @ApiModelProperty()
    gender: number;

    @ApiModelProperty({example: '1999-24-01'})
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

export class RefreshTokenVm {
    @IsString()
    @ApiModelProperty()
    refreshToken: string;

    @IsEmail()
    @ApiModelProperty()
    email: string;
}