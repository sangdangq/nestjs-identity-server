import { HttpStatus, UseGuards, Put, Delete } from '@nestjs/common';
import { Get, Controller, Post, Body, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Login, UserRegister, PasswordChange } from './../shared/model/user';
import { UserService } from './user.service';
import { ResetPassword } from './user.entity';
import { RefreshToken } from '../token/refresh-token.model';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('register')
  async register(@Body() body: UserRegister, @Res() res) {
    this._userService.signUp(body).then(data => {
      if (data.isSuccessfully) {
        res.status(HttpStatus.OK).end(data.message);
      }
      res.status(HttpStatus.BAD_REQUEST).end(data.message);
    });
  }

  @UseGuards(AuthGuard())
  @Put('changePassword')
  async changePassword(@Body() body: PasswordChange, @Res() res) {
    const result = await this._userService.changePassword(body);
    if (result) {
      res.status(HttpStatus.OK).end('Successfully');
    } else {
      res.status(HttpStatus.BAD_REQUEST).end('Failed');
    }
  }

  @UseGuards(AuthGuard())
  @Delete('delete')
  async delete(@Body() body: Login,  @Res() res) {
    const isDelete = await this._userService.delete(body);
    if (isDelete) {
      res.status(HttpStatus.OK).end('Successfully');
    } else {
      res.status(HttpStatus.BAD_REQUEST).end('Failed');
    }
  }

  @Post('login')
  async login(@Body() body: Login, @Res() res) {
    await this._userService.login(body).then(data => {
      if (data) {
        res.status(HttpStatus.OK).send(data);
      } else {
        res.status(HttpStatus.BAD_REQUEST).end('Login failed');
      }
    });
  }

  @UseGuards(AuthGuard())
  @Post('getInfo')
  async info(@Body() body: Login, @Res() res) {
    const info = await this._userService.getUserInfo(body.email);
    if (info) {
      res.status(HttpStatus.OK).send(info);
    } else {
      res.status(HttpStatus.BAD_REQUEST).end('Failed');
    }
  }

  @Post('resetPassword')
  async resetPassword(@Body() body: ResetPassword, @Res() res) {
    await this._userService.resetPassword(body.email).then(isSuccess => {
      if (isSuccess) {
        res.status(HttpStatus.OK).end('Reset password is sent to your email');
      }
      res.status(HttpStatus.BAD_REQUEST).end('Failed');
    });
  }

  @Post('refreshToken')
  async refreshToken(@Body() info: RefreshToken, @Res() res) {
    await this._userService.refreshToken(info).then(isSuccess => {
      if (isSuccess) {
        res.status(HttpStatus.OK).end('Reset password is sent to your email');
      }
      res.status(HttpStatus.BAD_REQUEST).end('Failed');
    });
  }
}
