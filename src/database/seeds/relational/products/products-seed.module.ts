import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productsEntity } from '../../../../products/infrastructure/persistence/relational/entities/products.entity';
import { productsSeedService } from './products-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([productsEntity])],
  providers: [productsSeedService],
  exports: [productsSeedService],
})
export class productsSeedModule {}
