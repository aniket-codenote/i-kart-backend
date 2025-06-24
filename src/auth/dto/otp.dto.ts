import { IsNumber, IsString, IsEmail, IsOptional } from 'class-validator';

export class GenerateOtpDto {
  @IsEmail()
  email: string;
}

export class VerifyOtpDto {
  @IsEmail()
  email: string;

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
  @IsOptional()
  roleId?: number;
}
