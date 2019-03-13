import { HttpStatus, UseGuards, Put, Delete } from '@nestjs/common';
import { Get, Controller, Post, Body, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Login } from './../shared/model/user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('')
  showLoginPage() {
    return 'Login page';
  }

  @Post('register')
  async register(@Body() body, @Res() res) {
    this._userService.signUp(body).then(data => {
      if (data.isSuccessfully) {
        res.status(HttpStatus.OK).end(data.message);
      }
      res.status(HttpStatus.BAD_REQUEST).end(data.message);
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('change-password')
  async changePassword(@Body() body, @Res() res) {
    await this._userService.changePassword(body).then(isSuccess => {
      if (isSuccess) {
        res.status(HttpStatus.OK).end('Successfully');
      }
      res.status(HttpStatus.BAD_REQUEST).end('Failed');
    });
  }

  @UseGuards(AuthGuard('jwt'))
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
        res.status(HttpStatus.OK).end(data);
      }
      res.status(HttpStatus.BAD_REQUEST).end('Login failed');
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('getInfo')
  async info(@Body() body: any, @Res() res) {
    const info = await this._userService.getUserInfo(body.email);
    if (info) {
      res.status(HttpStatus.OK).send(info);
    } else {
      res.status(HttpStatus.BAD_REQUEST).end('Failed');
    }
  }

  @Post('resetPassword')
  async resetPassword(@Body() body: any, @Res() res) {
    await this._userService.resetPassword(body.email).then(isSuccess => {
      if (isSuccess) {
        res.status(HttpStatus.OK).end('Reset password is sent to your email');
      }
      res.status(HttpStatus.BAD_REQUEST).end('Failed');
    });
  }
}
