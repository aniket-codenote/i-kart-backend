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
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('stores')
@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  findAll(@Req() req: any) {
    return this.storeService.findAll(req?.user?.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.storeService.findOne(req?.user?.id, +id);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateStoreDto) {
    return this.storeService.create(req?.user?.id, dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStoreDto, @Req() req: any) {
    return this.storeService.update(req?.user?.id, +id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.storeService.remove(req?.user?.id, +id);
  }
}

