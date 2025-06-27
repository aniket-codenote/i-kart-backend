import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Catalog } from '@prisma/client';

@Injectable()
export class CatalogsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Catalog[]> {
    return this.prisma.catalog.findMany(
      {
        where: { status: 'published' },
        include: {
          catalogImages: true,
        },
      }
    );
  }

  async findOne(id: number): Promise<Catalog | null> {
    return this.prisma.catalog.findUnique(
      {
        where: { id, status: 'published' },
        include: {
          catalogImages: true,
        },
      }
    );
  }
}
