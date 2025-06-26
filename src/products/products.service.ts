import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, dto: CreateProductDto): Promise<Product> {
    const { catalogId, productVariants, productImages, ...data } = dto;

    return this.prisma.product.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
        catalog: { connect: { id: catalogId } },
        productVariants: {
          create: productVariants,
        },
        productImages: {
          create: productImages,
        },
      },
      include: {
        productVariants: true,
        productImages: true,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.product.findMany(
      {
        where: { userId },
        include: {
          productVariants: true,
          productImages: true,
        },
      }
    );
  }

  findOne(userId: number, id: number) {
    return this.prisma.product.findUnique(
      {
        where: { id, userId },
        include: {
          productVariants: true,
          productImages: true,
        },
      }
    );
  }

  async update(userId: number, productId: number, dto: UpdateProductDto): Promise<Product> {
    const existing = await this.prisma.product.findFirst({
      where: { id: productId, userId },
    });
    if (!existing) throw new NotFoundException('Product not found');

    const { catalogId, productVariants, productImages, ...data } = dto;

    return this.prisma.product.update({
      where: { id: productId },
      data: {
        ...data,
        ...(catalogId && {
          catalog: {
            connect: { id: catalogId },
          },
        }),
        ...(productVariants && {
          productVariants: {
            deleteMany: {},
            create: productVariants,
          },
        }),
        ...(productImages && {
          productImages: {
            deleteMany: {},
            create: productImages,
          },
        }),
      },
      include: {
        productVariants: true,
        productImages: true,
      },
    });
  }

  remove(userId: number, id: number) {
    return this.prisma.product.delete({
      where: { id, userId },
    });
  }
}
