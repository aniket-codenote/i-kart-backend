import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async generateOtp(email: string): Promise<void> {
    const existing = await this.prisma.otp.findFirst({
      where: {
        email,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (existing) {
      await this.emailService.sendOtpEmail(email, existing.code);
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const newOtp = await this.prisma.otp.create({
      data: { email, code, expiresAt },
    });

    await this.emailService.sendOtpEmail(email, newOtp.code);
  }

  async verifyOtp(email: string, code: string): Promise<string | null> {
    const record = await this.prisma.otp.findFirst({
      where: { email, code },
      orderBy: { createdAt: 'desc' },
    });

    if (!record || record.expiresAt < new Date()) return null;

    await this.prisma.otp.delete({ where: { id: record.id } });

    return this.jwtService.sign({ email });
  }
}
