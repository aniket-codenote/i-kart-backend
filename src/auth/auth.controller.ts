import { Controller, Post, Get, Body, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GenerateOtpDto, VerifyOtpDto, SignupDto } from './dto/user_auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService // Add this
  ) { }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req) {
    console.log('req.cookies:', req.cookies); 
    console.log('Decoded User:', req.user);
    return req.user; 
  }

  @Post('otp/generate')
  async generateOtp(@Body() generateOtpDto: GenerateOtpDto) {
    return this.authService.generateOtp(generateOtpDto);
  }

  @Post('otp/verify')
  async verifyOtp(@Body() dto: VerifyOtpDto, @Res() res: Response) {
    const { token } = await this.authService.verifyOtp(dto);

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      domain: 'localhost',
      path: '/',
      maxAge: 86400000
    });

    return res.send({ success: true });
  }

  @Get('check')
  async checkAuth(@Req() req: Request) {
    let token = req.cookies?.auth_token;

    if (typeof token === 'string' && token.startsWith('j:')) {
      try {
        token = JSON.parse(token.substring(2)).token;
      } catch {
        throw new UnauthorizedException('Invalid token format');
      }
    }

    if (!token) throw new UnauthorizedException('No token provided');

    return this.jwtService.verify(token);
  }

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('signout')
  signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth_token');
    return { message: 'Logged out' };
  }
}