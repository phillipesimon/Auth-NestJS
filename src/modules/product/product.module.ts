import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { CreateProductUseCase } from './useCases/create-product.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './useCases/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [CreateProductUseCase],
})
export class ProductModule {}
