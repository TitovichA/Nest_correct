import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() params: AuthUserDto, @Res() res: Response) {
    const [msg, token] = await this.authService.login(params);

    res
      .cookie('authorization', token)
      .render('register-ok', { layout: 'index', msg: msg });
  }

  @Post('register')
  register(@Body() params: RegisterUserDto) {
    return this.authService.register(params);
  }
}
