import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('request-otp')
  async requestOtp(@Body('email') email: string) {
    await this.authService.generateOtp(email);
    return { message: 'OTP sent' };
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    const token = await this.authService.verifyOtp(body.email, body.otp);
    if (!token) {
      return { message: 'Invalid or expired OTP' };
    }
    return { token };
  }
}
