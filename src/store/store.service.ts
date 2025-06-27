import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: number) {
    return this.prisma.store.findMany({
      where: { userId },
    });
  }

  async findOne(userId: number, id: number) {
    const store = await this.prisma.store.findFirst({
      where: { id, userId },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    return store;
  }

  create(userId: number, data: CreateStoreDto) {
    return this.prisma.store.create({
      data: {
        name: data.name,
        slug: data.slug,
        userId: userId,
      },
    });
  }

  async update(userId: number, id: number, data: UpdateStoreDto) {
    await this.findOne(userId, id);
    return this.prisma.store.update({
      where: { id },
      data,
    });
  }

  async remove(userId: number, id: number) {
    await this.findOne(userId, id);
    await this.prisma.store.delete({ where: { id } });
    return { success: true };
  }
}
