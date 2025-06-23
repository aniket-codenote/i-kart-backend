import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  banner?: string;

  @IsInt()
  userId: number; 
}
