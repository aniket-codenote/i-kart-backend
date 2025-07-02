import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';

@Injectable()
export class StoreProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findStoreProduct(storeId: number) {
    const storeProducts = await this.prisma.storeProduct.findMany({
      where: { storeId },
      include: { product: true },
    });

    return storeProducts.map(sp => sp.product);
  }

  async create(data: CreateStoreProductDto) {
    const { productIds, storeId, ...rest } = data as any;
    if (!Array.isArray(productIds) || !storeId) {
      throw new Error('productIds (array) and storeId are required');
    }
    const created = await this.prisma.$transaction(
      productIds.map((productId: number) =>
      this.prisma.storeProduct.create({
        data: {
        storeId,
        productId,
        ...rest,
        },
      }),
      ),
    );
    return created;
  }

  async update(id: number, data: UpdateStoreProductDto) {
    const existing = await this.prisma.storeProduct.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('StoreProduct not found');

    return this.prisma.storeProduct.update({
      where: { id },
      data,
    });
  }

  async remove(storeId: number, productId: number) {
    return this.prisma.storeProduct.deleteMany({
      where: {
        storeId,
        productId,
      },
    });
  }
}
