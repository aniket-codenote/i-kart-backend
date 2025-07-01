import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StoreProductService } from './store-product.service';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('store-products')
@Controller('store-products')
@Controller('store-products')

export class StoreProductController {
  constructor(private readonly storeProductService: StoreProductService) {}

  @Post()
  create(@Body() dto: CreateStoreProductDto) {
    return this.storeProductService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStoreProductDto, @Req() req: any) {
    return this.storeProductService.update(+id, dto);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeProductService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.storeProductService.remove(+id);
  }
}
