import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { GenerateOtpDto, VerifyOtpDto, SignupDto } from './data_transfer_object/otp.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async generateOtp(data: GenerateOtpDto): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.otp.deleteMany({
      where: { userId: user.id },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await this.prisma.otp.create({
      data: {
        user: {
          connect: { id: user.id },
        },
        code,
        expiresAt,
      },
    });

    await this.emailService.sendOtpEmail(user.email, code);

    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(data: VerifyOtpDto): Promise<{ token: string }> {
    const otpRecord = await this.prisma.otp.findFirst({
      where: {
        userId: data.userId,
        code: data.code,
      } as Prisma.OtpWhereInput,
    });

    if (!otpRecord) {
      throw new BadRequestException('Invalid OTP');
    }

    if (otpRecord.expiresAt < new Date()) {
      throw new BadRequestException('OTP has expired');
    }

    await this.prisma.otp.delete({
      where: { id: otpRecord.id },
    });

    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = this.jwtService.sign({
      userId: user.id,
      email: user.email,
      roleId: user.roleId,
    });

    return { token };
  }

  async signup(data: SignupDto): Promise<{ status: string }> {
    console.log('Signup input:', data);

    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    try {
      const defaultRole = await this.prisma.role.findUnique({
        where: { name: 'customer' },
      });

      if (!defaultRole) {
        throw new BadRequestException('Default customer role not found');
      }

      await this.prisma.user.create({
        data: {
          email: data.email,
          phone: data.phone,
          username: data.username,
          role: {
            connect: { id: data.roleId || defaultRole.id },
          },
        },
      });

      return { status: 'ok' };
    } catch (error) {
      console.error('Prisma create error:', error);
      throw new BadRequestException('Failed to create user: ' + error.message);
    }
  }
}
