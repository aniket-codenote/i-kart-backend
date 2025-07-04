import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ImageService } from '../image/image.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ImageService],
})
export class ProductsModule {}
