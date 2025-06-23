import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.store.findMany();
  }

  async findOne(id: number) {
    const store = await this.prisma.store.findUnique({
      where: { id },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    return store;
  }

 create(data: CreateStoreDto) {
  return this.prisma.store.create({
    data: {
      name: data.name,
      slug: data.slug,
      user: {
        connect: {
          id: data.userId
        }
      }
    }
  });
}


  async update(id: number, data: UpdateStoreDto) {
    await this.findOne(id); // ensure store exists
    return this.prisma.store.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // ensure store exists
    await this.prisma.store.delete({ where: { id } });
    return { success: true };
  }
}
