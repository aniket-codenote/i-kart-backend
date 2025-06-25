import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreProductDto {
  @ApiProperty()
  @IsNumber()
  storeId: number;

  @ApiProperty()
  @IsNumber()
  productId: number;
}