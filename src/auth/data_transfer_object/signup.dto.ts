import { IsEmail, IsNotEmpty, IsString, IsInt } from 'class-validator';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsInt()
  @IsNotEmpty()
  roleId: number;
}
