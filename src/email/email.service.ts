import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private ready = false;

  constructor() {
    this.init();
  }

  private async init() {
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      const testAccount = await nodemailer.createTestAccount();

      this.transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    this.ready = true;
  }

  async sendOtpEmail(to: string, otp: string): Promise<{ previewUrl?: string | false }> {
    if (!this.ready) {
      await new Promise((r) => setTimeout(r, 500));
    }

    const info = await this.transporter.sendMail({
      from: '"i-kart" <no-reply@example.com>',
      to,
      subject: 'Your OTP code to login to i-kart',
      text: `Your login OTP is: ${otp}`,
      html: `<p>Your login OTP is: <strong>${otp}</strong></p>`,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      Logger.log(`📬 Preview email: ${previewUrl}`);
    }

    return { previewUrl };
  }
}
