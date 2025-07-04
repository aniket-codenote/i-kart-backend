import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GenerateOtpDto, VerifyOtpDto, SignupDto } from './dto/user_auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('otp/generate')
  generateOtp(@Body() generateOtpDto: GenerateOtpDto) {
    return this.authService.generateOtp(generateOtpDto);
  }

  @Post('otp/verify')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('signout')
  signout(@Req() req: any) {
    return this.authService.signout(req?.user?.email);
  }
}
