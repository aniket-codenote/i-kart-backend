import { IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreProductDto {
  @ApiProperty()
  @IsNumber()
  storeId: number;

  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsNumber({}, { each: true })
  productIds: number[];
}