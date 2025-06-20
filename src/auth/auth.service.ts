import { Injectable } from '@nestjs/common';

interface OTPEntry {
  code: string;
  expiresAt: number;
}

@Injectable()
export class AuthService {
  private otpStore = new Map<string, { code: string; expiresAt: number }>();

  generateShortToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 6 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
  }

  async sendLoginCode(email: string) {
    const code = this.generateShortToken();
    const expiresAt = Date.now() + 10 * 60 * 1000;

    this.otpStore.set(email, { code, expiresAt });

    return {
      message: 'Login code generated',
      code,
    };
  }

  async verifyLoginCode(email: string, code: string) {
    console.log("Verifying code for email:", email);
    console.log("Verifying code for entry:", this);
    const entry = this.otpStore.get(email);
    if (!entry) return { success: false, error: 'No code found' };
    if (entry.code !== code) return { success: false, error: 'Invalid code' };
    if (Date.now() > entry.expiresAt) return { success: false, error: 'Code expired' };

    this.otpStore.delete(email);

    return { success: true, email };
  }
}
