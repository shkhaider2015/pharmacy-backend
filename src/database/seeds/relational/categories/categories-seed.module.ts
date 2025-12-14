import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesEntity } from '../../../../categories/infrastructure/persistence/relational/entities/categories.entity';
import { categoriesSeedService } from './categories-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesEntity])],
  providers: [categoriesSeedService],
  exports: [categoriesSeedService],
})
export class categoriesSeedModule {}
