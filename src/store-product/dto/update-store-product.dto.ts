import { IsOptional, IsNumber } from 'class-validator';

export class UpdateStoreProductDto {
  @IsOptional()
  @IsNumber()
  storeId?: number;

  @IsOptional()
  @IsNumber()
  productId?: number;
}
