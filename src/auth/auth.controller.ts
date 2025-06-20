import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-code')
  async sendCode(@Body('email') email: string) {
    return this.authService.sendLoginCode(email);
  }

  @Post('verify-code')
  async verifyCode(@Body() body: { email: string; code: string }) {
    const { email, code } = body;
    return this.authService.verifyLoginCode(email, code);
  }
}
