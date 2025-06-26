import { IsNumber, IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateOtpDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class VerifyOtpDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsString()
  code: string;
}

export class SignupDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
  @IsString()
  phone: string;
  
  @ApiProperty()
  @IsString()
  username: string;
  
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  roleId?: number;
}

export class SignOutDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}