import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { PrismaService } from '../prisma/prisma.service';
import { ImageService } from '../image/image.service';

@Module({
  controllers: [StoreController],
  providers: [StoreService, PrismaService, ImageService],
  exports: [ImageService]
})
export class StoreModule {}
