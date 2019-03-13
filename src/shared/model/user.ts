import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsInt, Length, IsNotEmpty, IsEmail } from 'class-validator';

export class UserRegister {
    @ApiModelProperty()
    customerId: string;
    @ApiModelProperty()
    lastName: string;
    @ApiModelProperty()
    firstName: string;
    @ApiModelProperty()
    email: string;
    @ApiModelProperty()
    password: string;
    @ApiModelProperty()
    rePassword: string;
    @ApiModelProperty()
    phoneNo: string;
    @ApiModelProperty()
    gender: string;
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
    @ApiModelProperty()
    // @IsEmail()
    email: string;
    @ApiModelProperty()
    // @IsNotEmpty()
    password: string;
}

export class UserClaim {
    @ApiModelProperty() email: string;
    @ApiModelProperty() firstName: string;
    @ApiModelProperty() phoneNo: string;
}