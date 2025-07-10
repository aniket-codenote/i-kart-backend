import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
  };
}
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('products')
@Controller('products')

export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreateProductDto) {
    return this.productsService.create(req?.user?.id, dto);
  }


  @Get()
  async getProducts(@Req() req: AuthenticatedRequest) {
    const user = req.user;
    return this.productsService.getAll(user.id);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string, @Req() req: any) {
    return this.productsService.findOne(req?.user?.id, slug);
  }

  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() updateProductDto: UpdateProductDto, @Req() req: any) {
    return this.productsService.update(req?.user?.id, slug, updateProductDto);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string, @Req() req: any) {
    return this.productsService.remove(req?.user?.id, slug);
  }
}
