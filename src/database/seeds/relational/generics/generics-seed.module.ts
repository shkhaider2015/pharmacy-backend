import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenericsEntity } from '../../../../generics/infrastructure/persistence/relational/entities/generics.entity';
import { genericsSeedService } from './generics-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([GenericsEntity])],
  providers: [genericsSeedService],
  exports: [genericsSeedService],
})
export class genericsSeedModule {}
