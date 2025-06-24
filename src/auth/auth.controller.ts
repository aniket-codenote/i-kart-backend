import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GenerateOtpDto, VerifyOtpDto, SignupDto } from './data_transfer_object/otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('otp/generate')
  async generateOtp(@Body() generateOtpDto: GenerateOtpDto) {
    return this.authService.generateOtp(generateOtpDto);
  }

  @Post('otp/verify')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @Post('signup/complete')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
