import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateProductUseCase } from './useCases/create-product.usecase';
import type { CreateProductDTO } from './product.dto';
import { Role, Roles } from 'src/decorator/roles.decorators';
import { ListProductUseCase } from './useCases/list-product.usecase';
import { Auth } from 'src/decorator/auth.decorators';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private listProductUseCase: ListProductUseCase,
  ) {}

  @Auth(Role.ADMIN)
  @Post('')
  async create(@Body() data: CreateProductDTO) {
    const result = await this.createProductUseCase.execute(data);
    return result;
  }

  @Auth(Role.USER, Role.ADMIN)
  @Get('')
  async get() {
    const result = await this.listProductUseCase.execute();
    return result;
  }
}
