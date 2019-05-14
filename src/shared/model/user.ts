import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, Length, IsNotEmpty, IsEmail, IsNumber, IsDate,
    IsDateString, IsPhoneNumber, IsMobilePhone, MaxLength, IsEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UserRegister {
    @ApiModelProperty()
    @IsString()
    @IsOptional()
    uid?: string;

    @ApiModelProperty()
    @IsString()
    address1: string;

    @ApiModelPropertyOptional()
    @IsString()
    @IsOptional()
    address2?: string;

    @ApiModelProperty()
    @IsBoolean()
    agreement: boolean;

    @ApiModelProperty({example: '1999-24-01'})
    birthday: Date;

    @ApiModelProperty()
    @IsString()
    city: string;

    @ApiModelPropertyOptional()
    @IsString()
    @IsOptional()
    company?: string;

    @ApiModelProperty()
    @IsString()
    country: string;

    @ApiModelProperty({example: 'user001@gmail.com'})
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @IsString()
    firstname: string;

    @ApiModelProperty()
    @IsString()
    gender: string;

    @ApiModelProperty()
    @IsString()
    lastname: string;

    @ApiModelProperty()
    @IsString()
    password: string;

    @ApiModelProperty()
    @IsString()
    confirmpassword: string;

    @ApiModelProperty({example: '123456789'})
    @MaxLength(11)
    @IsString()
    phone: string;

    @ApiModelProperty()
    @IsString()
    postcode: string;

    @ApiModelProperty()
    @IsString()
    regionstate: string;
}

export class UserUpdate {
    @ApiModelProperty()
    @IsString()
    address1: string;

    @ApiModelPropertyOptional()
    @IsString()
    @IsOptional()
    address2?: string;

    @ApiModelProperty()
    @IsBoolean()
    agreement: boolean;

    @ApiModelProperty({example: '1999-24-01'})
    birthday: Date;

    @ApiModelProperty()
    @IsString()
    city: string;

    @ApiModelPropertyOptional()
    @IsString()
    @IsOptional()
    company?: string;

    @ApiModelProperty()
    @IsString()
    country: string;

    @ApiModelProperty({example: 'user001@gmail.com'})
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @IsString()
    firstname: string;

    @ApiModelProperty()
    @IsString()
    gender: string;

    @ApiModelProperty()
    @IsString()
    lastname: string;

    @ApiModelProperty()
    @IsString()
    password: string;

    @ApiModelProperty()
    @IsString()
    newPassword: string;

    @ApiModelProperty()
    @IsString()
    confirmPassword: string;

    @ApiModelProperty({example: '123456789'})
    @MaxLength(11)
    @IsString()
    phone: string;

    @ApiModelProperty()
    @IsString()
    postcode: string;

    @ApiModelProperty()
    @IsString()
    regionstate: string;
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

export class UserProfileRq {
    @ApiModelProperty()
    @IsEmail()
    email: string;
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