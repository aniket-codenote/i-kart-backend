import { Injectable } from '@nestjs/common';
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

  findAll() {
    return this.prisma.product.findMany(
      {
        include: {
          productVariants: true,
          productImages: true,
        },
      }
    );
  }

  findOne(id: number) {
    return this.prisma.product.findUnique(
      {
        where: { id },
        include: {
          productVariants: true,
          productImages: true,
        },
      }
    );
  }

  async update(productId: number, dto: UpdateProductDto): Promise<Product> {
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

  remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
