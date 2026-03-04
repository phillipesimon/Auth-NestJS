import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateProductUseCase } from './useCases/create-product.usecase';
import type { CreateProductDTO } from './product.dto';
import { Role, Roles } from 'src/decorator/roles.decorators';
import { ListProductUseCase } from './useCases/list-product.usecase';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private listProductUseCase: ListProductUseCase,
  ) {}

  @Roles(Role.ADMIN)
  @Post('')
  async create(@Body() data: CreateProductDTO) {
    const result = await this.createProductUseCase.execute(data);
    return result;
  }

  @Roles(Role.USER, Role.ADMIN)
  @Get('')
  async get() {
    const result = await this.listProductUseCase.execute();
    return result;
  }
}
