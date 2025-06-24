import { IsNumber, IsString, IsEmail } from 'class-validator';

export class GenerateOtpDto {
  @IsEmail()
  email: string;
}

export class VerifyOtpDto {
  @IsNumber()
  userId: number;

  @IsString()
  code: string;
}

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  username: string;

  @IsNumber()
  roleId: number;
}
