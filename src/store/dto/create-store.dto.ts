import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  banner?: string;

  @ApiProperty()
  @IsInt()
  userId: number; 
}
