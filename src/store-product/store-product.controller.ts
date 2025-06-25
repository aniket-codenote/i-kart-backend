import { Controller, Post, Body, Get, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { StoreProductService } from './store-product.service';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';

@Controller('store-products')
export class StoreProductController {
  constructor(private readonly storeProductService: StoreProductService) {}

  @Post()
  create(@Body() dto: CreateStoreProductDto) {
    return this.storeProductService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStoreProductDto
  ) {
    return this.storeProductService.update(id, dto);
  }

  @Get()
  findAll() {
    return this.storeProductService.findAll();
  }
}
