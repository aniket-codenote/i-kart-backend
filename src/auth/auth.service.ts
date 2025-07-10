import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { GenerateOtpDto, VerifyOtpDto, SignupDto } from './dto/user_auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async generateOtp(data: GenerateOtpDto): Promise<{ statusCode: number; previewUrl?: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new NotFoundException('No user found with this email');
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

    const { previewUrl } = await this.emailService.sendOtpEmail(user.email, code);
    const finalPreviewUrl = previewUrl === false ? undefined : previewUrl;
    return { statusCode: 200, previewUrl: finalPreviewUrl };
  }

  async verifyOtp(data: VerifyOtpDto): Promise<{ token: string }> {
    const otpRecord = await this.prisma.otp.findFirst({
      where: {
        user: { email: data.email },
        code: data.code,
      },
      include: { user: true },
    });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    await this.prisma.otp.delete({ where: { id: otpRecord.id } });

    const user = otpRecord.user;

    const token = this.jwtService.sign({
      userId: user.id,
      email: user.email,
      roleId: user.roleId,
      username: user.username,
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { token },
    });

    return { token };
  }

  async signup(data: SignupDto): Promise<{ status: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    try {
      const roleName = data.roleName || 'customer';
      const role = await this.prisma.role.findUnique({
        where: { name: roleName },
      });

      if (!role) {
        throw new BadRequestException('No role found!');
      }

      await this.prisma.user.create({
        data: {
          email: data.email,
          phone: data.phone,
          username: data.username,
          role: {
            connect: { id: role.id },
          },
        },
      });

      return { status: 'ok' };
    } catch (error) {
      throw new BadRequestException('Failed to create user: ' + error.message);
    }
  }

  async signout(email: string): Promise<{ status: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { token: null },
    });

    return { status: 'signed out' };
  }
}
