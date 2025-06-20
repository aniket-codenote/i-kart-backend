import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CatalogsService } from './catalogs.service';
import { Catalog } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('catalogs')
@Controller('catalogs')
export class CatalogsController {
  constructor(private readonly catalogsService: CatalogsService) {}

  @Get()
  async findAll(): Promise<Catalog[]> {
    return this.catalogsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Catalog | null> {
    return this.catalogsService.findOne(id);
  }
}
