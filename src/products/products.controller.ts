import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @Get('')
  async getProducts(): Promise<Product[]> {
    return this.productsService.products();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.product({ id: Number(id) });
  }
}
