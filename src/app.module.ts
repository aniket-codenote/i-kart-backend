import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService, PrismaService],
})
export class AppModule {}
