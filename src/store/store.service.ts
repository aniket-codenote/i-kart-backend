import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ImageService } from '../image/image.service';
import { Store } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class StoreService {
  constructor(
    private prisma: PrismaService,
    private imageService: ImageService,
  ) {}

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

  async create(userId: number, dto: CreateStoreDto): Promise<Store> {
    const { logo, banner, ...data } = dto;
    let logoUrl: string | undefined;
    let bannerUrl: string | undefined;

    if (logo) {
      logoUrl = await this.imageService.uploadBase64Image(logo);
    }

    if (banner) {
      bannerUrl = await this.imageService.uploadBase64Image(banner);
    }

    try {
      return await this.prisma.store.create({
        data: {
          ...data,
          userId,
          logo: logoUrl,
          banner: bannerUrl,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(
          `Store with this ${error.meta?.target?.[0]} already exists`,
        );
      }
      throw error;
    }
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
