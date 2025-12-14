import { Module } from '@nestjs/common';
import { productsRepository } from '../products.repository';
import { productsRelationalRepository } from './repositories/products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productsEntity } from './entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([productsEntity])],
  providers: [
    {
      provide: productsRepository,
      useClass: productsRelationalRepository,
    },
  ],
  exports: [productsRepository],
})
export class RelationalproductsPersistenceModule {}
