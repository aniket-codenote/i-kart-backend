import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';

@Injectable()
export class StoreProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateStoreProductDto) {
    return this.prisma.storeProduct.create({ data });
  }

  async update(id: number, data: UpdateStoreProductDto) {
    const existing = await this.prisma.storeProduct.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('StoreProduct not found');

    return this.prisma.storeProduct.update({
      where: { id },
      data,
    });
  }

  findAll() {
    return this.prisma.storeProduct.findMany({
      include: {
        store: true,
        product: true,
      },
    });
  }
}
