import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productsEntity } from '../../../../products/infrastructure/persistence/relational/entities/products.entity';
import { productsSeedService } from './products-seed.service';
import { CategoriesEntity } from '../../../../categories/infrastructure/persistence/relational/entities/categories.entity';
import { GenericsEntity } from '../../../../generics/infrastructure/persistence/relational/entities/generics.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      productsEntity,
      CategoriesEntity,
      GenericsEntity,
    ]),
  ],
  providers: [productsSeedService],
  exports: [productsSeedService],
})
export class productsSeedModule {}
