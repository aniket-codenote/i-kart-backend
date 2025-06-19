import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product, Prisma } from '@prisma/client';

type ProductQueryParams = Partial<Prisma.ProductFindManyArgs>;

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async product(where: Prisma.ProductWhereUniqueInput): Promise<Product | null> {
    return this.prisma.product.findUnique({ where });
  }

  async products(params: ProductQueryParams = {}): Promise<Product[]> {
    return this.prisma.product.findMany(params);
  }
}
