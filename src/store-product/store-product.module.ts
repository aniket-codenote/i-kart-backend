import { Module } from '@nestjs/common';
import { StoreProductController } from './store-product.controller';
import { StoreProductService } from './store-product.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [StoreProductController],
  providers: [StoreProductService, PrismaService],
})
export class StoreProductModule {}
