import { IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductVariantDto {
  @ApiProperty()
  @IsString()
  optionName: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  optionValues: string[];
}
